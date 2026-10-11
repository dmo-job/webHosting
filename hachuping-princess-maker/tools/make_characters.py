"""
하츄핑 프린세스 메이커 - 참고 그림에서 배경만 지운 캐릭터 그림 만들기

assets/references 에 있는 그림의 배경을 지우고 assets/characters 에 저장해요.
게임에서 캐릭터 그림체를 '업로드 그림'으로 고르면 이 그림을 그대로 써요. (이 PC에서만 쓰는 그림이에요)
게임 설정의 📁 그림 넣기로 넣은 그림이 있으면 그쪽이 먼저 나와요.

사용법:
  python tools/make_characters.py            # 모두 다시 만들기
  python tools/make_characters.py --check    # 어두운 배경 위 미리보기도 함께 저장 (_check_*.png)

새 그림을 더 넣고 싶다면 아래 SOURCES 에 한 줄 추가하세요.
  '이름': ('파일이름', (왼쪽, 위, 오른쪽, 아래) 또는 None)
  이름 규칙: 친구는 친구 id(baro, aja, chacha, lala, hap, areum, sappun, ponny),
            하츄핑 기본 모습은 hachu, 변신 폼은 hachu_flora / hachu_star / hachu_berry / hachu_dia / hachu_princess
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, 'assets', 'references')
OUT = os.path.join(ROOT, 'assets', 'characters')

SOURCES = {
    'hachu':          ('hachu_forms.webp', (4, 4, 242, 242)),     # 1기 하츄핑
    'hachu_dia':      ('hachu_forms.webp', (248, 4, 487, 242)),   # 2기 다이아
    'hachu_flora':    ('hachu_forms.webp', (493, 4, 732, 242)),   # 3기 플로라
    'hachu_berry':    ('hachu_forms.webp', (738, 4, 977, 242)),   # 4기 베리
    'hachu_star':     ('hachu_forms.webp', (4, 306, 242, 553)),   # 5기 스타
    'hachu_princess': ('hachu_princess.webp', None),              # 프린세스 (티아라)
    'ponny':          ('ponny.jpg', None),
    'sappun':         ('sappun.jpg', None),
    'areum':          ('areum.jpg', None),
}
MAX_H = 480   # 게임에서 충분히 선명한 크기


def grow(mask):
    g = mask.copy()
    g[1:, :] |= mask[:-1, :]; g[:-1, :] |= mask[1:, :]; g[:, 1:] |= mask[:, :-1]; g[:, :-1] |= mask[:, 1:]
    return g


def cutout(rgba):
    a = np.array(rgba).astype(int)
    if (a[[0, -1], :, 3] < 20).mean() > .9 and (a[:, [0, -1], 3] < 20).mean() > .9:
        return rgba  # 이미 투명 배경
    rgb = a[:, :, :3]
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    bg = np.median(border, axis=0)
    # 배경과 거의 같은 색만 배경 후보 (흰 옷이 지워지지 않게 아주 엄격하게)
    diff = np.abs(rgb - bg).max(2)
    cand = diff <= 9
    # 색이 분명한 부분을 조금 부풀려 '벽'을 만들어요. 배경이 흰 옷 안으로 새어 들어가지 않게.
    r = max(3, round(min(rgb.shape[:2]) / 40))
    barrier = diff > 20
    for _ in range(r):
        barrier = grow(barrier)
    walk = cand & ~barrier
    region = np.zeros_like(cand)
    region[0, :] = walk[0, :]; region[-1, :] = walk[-1, :]; region[:, 0] = walk[:, 0]; region[:, -1] = walk[:, -1]
    while True:
        g = grow(region) & walk
        if (g == region).all():
            break
        region = g
    for _ in range(r + 1):   # 벽과 진짜 테두리 사이의 배경만 마저 지우기
        region = grow(region) & cand
    # 캐릭터 가장자리의 연한 테두리(jpg 번짐)만 한 겹 더 지우기
    soft = (diff <= 22) & grow(region) & ~region
    region |= soft
    alpha = np.where(region, 0, 255).astype(np.uint8)
    # 작은 구멍·점 정리 후 가장자리를 살짝 부드럽게
    m = Image.fromarray(alpha).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    m = m.filter(ImageFilter.GaussianBlur(.6))
    a[:, :, 3] = np.minimum(np.array(m), a[:, :, 3])
    return Image.fromarray(a.astype(np.uint8), 'RGBA')


def main():
    check = '--check' in sys.argv
    os.makedirs(OUT, exist_ok=True)
    made = {}
    for key, (fname, box) in SOURCES.items():
        p = os.path.join(REF, fname)
        if not os.path.exists(p):
            print(f'  {key}: 그림 없음 ({fname})')
            continue
        im = Image.open(p).convert('RGBA')
        if box:
            im = im.crop(box)
        im = cutout(im)
        bbox = im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox()
        im = im.crop(bbox)
        if im.height > MAX_H:
            im = im.resize((round(im.width * MAX_H / im.height), MAX_H), Image.LANCZOS)
        im.save(os.path.join(OUT, key + '.png'))
        made[key] = key + '.png'
        if check:
            bg = Image.new('RGBA', im.size, (60, 40, 90, 255)); bg.alpha_composite(im)
            bg.save(os.path.join(OUT, '_check_' + key + '.png'))
        print(f'  {key}: 완료 ({im.width}x{im.height})')
    with open(os.path.join(OUT, 'manifest.js'), 'w', encoding='utf-8') as f:
        f.write('/* tools/make_characters.py 가 만들어요. 참고 그림에서 배경만 지운 캐릭터 그림이에요 (이 PC에서만 써요). */\n')
        f.write('window.HPM_CHARS = ' + json.dumps(made, indent=1) + ';\n')
    print(f'캐릭터 그림 {len(made)}개를 만들었어요.')


if __name__ == '__main__':
    try:
        sys.stdout.reconfigure(errors='replace')
    except Exception:
        pass
    main()
