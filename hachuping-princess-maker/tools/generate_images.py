"""
하츄핑 프린세스 메이커 - 배경 이미지 만들기 도구

게임은 이미지가 없어도 돌아가요. 이 도구로 배경 그림을 만들어 assets/images 에 넣으면
게임이 자동으로 그 그림을 써요. (캐릭터는 게임이 직접 그리니까 배경만 만들어요.)

사용법 (PowerShell 또는 명령 프롬프트, 이 폴더의 상위 폴더에서):
  python tools/generate_images.py                      # 무료 Pollinations로 없는 그림만 만들기
  python tools/generate_images.py --only title_bg,sc_dance
  python tools/generate_images.py --force              # 이미 있는 그림도 다시 만들기
  python tools/generate_images.py --provider gemini    # GEMINI_API_KEY 필요 (유료 결제 계정)
  python tools/generate_images.py --provider openai    # OPENAI_API_KEY 필요 (유료)
  python tools/generate_images.py --scan               # 직접 넣은 그림 파일을 게임에 등록만 하기
  python tools/generate_images.py --list               # 만들 그림 목록과 프롬프트 보기

직접 그림을 넣고 싶다면:
  assets/images/<이름>.png (또는 .jpg .webp) 로 저장한 뒤  --scan 을 한 번 실행하세요.
"""
import argparse, base64, json, os, sys, time, urllib.parse, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, 'assets', 'images')
PROMPTS = os.path.join(ROOT, 'tools', 'image_prompts.json')
MANIFEST = os.path.join(IMG_DIR, 'manifest.js')
EXTS = ('.webp', '.png', '.jpg', '.jpeg')


def load_prompts():
    with open(PROMPTS, encoding='utf-8') as f:
        return json.load(f)


def existing(key):
    for e in EXTS:
        p = os.path.join(IMG_DIR, key + e)
        if os.path.exists(p):
            return key + e
    return None


def write_manifest(keys):
    found = {k: existing(k) for k in keys if existing(k)}
    with open(MANIFEST, 'w', encoding='utf-8') as f:
        f.write('/* 이 파일은 tools/generate_images.py 가 자동으로 만들어요. 직접 고치지 않아도 돼요. */\n')
        f.write('window.HPM_IMAGES = ' + json.dumps(found, ensure_ascii=False, indent=1) + ';\n')
    print(f'manifest.js 갱신: 그림 {len(found)}/{len(keys)}개 등록')


def http(req, timeout=180):
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read(), r.headers.get('Content-Type', '')


def gen_pollinations(prompt, seed):
    q = urllib.parse.quote(prompt, safe='')
    params = {'width': 1280, 'height': 720, 'nologo': 'true', 'seed': seed, 'model': 'flux'}
    tok = os.environ.get('POLLINATIONS_TOKEN')
    url = f'https://image.pollinations.ai/prompt/{q}?' + urllib.parse.urlencode(params)
    headers = {'User-Agent': 'hachuping-princess-maker/3.0'}
    if tok:
        headers['Authorization'] = 'Bearer ' + tok
    data, ctype = http(urllib.request.Request(url, headers=headers))
    if not ctype.startswith('image/'):
        raise RuntimeError('이미지가 아닌 응답: ' + data[:200].decode('utf-8', 'ignore'))
    return data, '.jpg' if 'jpeg' in ctype else '.png'


def gen_gemini(prompt, model):
    key = os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY')
    if not key:
        raise RuntimeError('GEMINI_API_KEY 환경 변수가 없어요.')
    url = f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent'
    body = {'contents': [{'parts': [{'text': prompt}]}],
            'generationConfig': {'responseModalities': ['IMAGE'], 'imageConfig': {'aspectRatio': '16:9'}}}
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method='POST',
                                 headers={'Content-Type': 'application/json', 'x-goog-api-key': key})
    raw, _ = http(req)
    res = json.loads(raw)
    for part in res.get('candidates', [{}])[0].get('content', {}).get('parts', []):
        inline = part.get('inlineData') or part.get('inline_data')
        if inline:
            mime = inline.get('mimeType') or inline.get('mime_type') or 'image/png'
            return base64.b64decode(inline['data']), '.jpg' if 'jpeg' in mime else '.png'
    raise RuntimeError('응답에 이미지가 없어요: ' + raw[:300].decode('utf-8', 'ignore'))


def gen_openai(prompt, model):
    key = os.environ.get('OPENAI_API_KEY')
    if not key:
        raise RuntimeError('OPENAI_API_KEY 환경 변수가 없어요.')
    body = {'model': model, 'prompt': prompt, 'size': '1536x1024', 'n': 1}
    req = urllib.request.Request('https://api.openai.com/v1/images/generations', data=json.dumps(body).encode(), method='POST',
                                 headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key})
    raw, _ = http(req, timeout=300)
    item = json.loads(raw)['data'][0]
    if item.get('b64_json'):
        return base64.b64decode(item['b64_json']), '.png'
    data, ctype = http(urllib.request.Request(item['url']))
    return data, '.png'


def main():
    try:
        sys.stdout.reconfigure(errors='replace')
    except Exception:
        pass
    ap = argparse.ArgumentParser(description='하츄핑 프린세스 메이커 배경 그림 만들기')
    ap.add_argument('--provider', choices=['pollinations', 'gemini', 'openai'], default='pollinations')
    ap.add_argument('--model', help='gemini 기본 gemini-2.5-flash-image / openai 기본 gpt-image-1')
    ap.add_argument('--only', help='쉼표로 구분한 그림 이름만 만들기')
    ap.add_argument('--force', action='store_true', help='이미 있는 그림도 다시 만들기')
    ap.add_argument('--seed', type=int, default=7)
    ap.add_argument('--scan', action='store_true', help='그림 폴더만 확인해서 게임에 등록')
    ap.add_argument('--list', action='store_true', help='그림 목록과 프롬프트 출력')
    a = ap.parse_args()

    cfg = load_prompts()
    keys = list(cfg['images'].keys())
    os.makedirs(IMG_DIR, exist_ok=True)

    if a.list:
        for k in keys:
            print(f'[{k}] ' + ('있음 ' + existing(k) if existing(k) else '없음'))
            print('   ' + cfg['images'][k] + '. ' + cfg['style'] + '\n')
        return
    if a.scan:
        write_manifest(keys)
        return

    targets = [k.strip() for k in a.only.split(',')] if a.only else keys
    bad = [k for k in targets if k not in cfg['images']]
    if bad:
        sys.exit('모르는 그림 이름: ' + ', '.join(bad))
    todo = [k for k in targets if a.force or not existing(k)]
    print(f'{a.provider}로 그림 {len(todo)}개를 만들어요.')
    anon_wait = a.provider == 'pollinations' and not os.environ.get('POLLINATIONS_TOKEN')

    for n, k in enumerate(todo, 1):
        prompt = cfg['images'][k] + '. ' + cfg['style']
        print(f'  ({n}/{len(todo)}) {k} ...', end=' ', flush=True)
        for attempt in range(3):
            try:
                if a.provider == 'pollinations':
                    data, ext = gen_pollinations(prompt, a.seed + n)
                elif a.provider == 'gemini':
                    data, ext = gen_gemini(prompt, a.model or 'gemini-2.5-flash-image')
                else:
                    data, ext = gen_openai(prompt, a.model or 'gpt-image-1')
                for e in EXTS:
                    old = os.path.join(IMG_DIR, k + e)
                    if os.path.exists(old):
                        os.remove(old)
                with open(os.path.join(IMG_DIR, k + ext), 'wb') as f:
                    f.write(data)
                print(f'완료 ({len(data)//1024}KB)')
                break
            except (urllib.error.HTTPError, urllib.error.URLError, RuntimeError, TimeoutError) as e:
                msg = e.read().decode('utf-8', 'ignore')[:200] if isinstance(e, urllib.error.HTTPError) else str(e)
                print(f'\n    실패 {attempt+1}/3: {msg}')
                time.sleep(20)
        else:
            print('    건너뜀')
        write_manifest(keys)
        if anon_wait and n < len(todo):
            time.sleep(16)  # 무료(키 없음)는 15초에 한 번만 요청할 수 있어요
    write_manifest(keys)
    print('끝! 게임을 새로고침하면 그림이 보여요.')


if __name__ == '__main__':
    main()
