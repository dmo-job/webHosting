"""
하츄핑 프린세스 메이커 - 참고 그림으로 도트 캐릭터 만들기

assets/references 에 있는 그림을 88×100칸 도트 그림으로 바꿔서 assets/characters 에 저장해요.
게임은 이 도트 그림이 있으면 그 캐릭터를 원작 도트로 보여 줘요. (이 PC에서만 쓰는 그림이에요)

사용법:
  python tools/make_sprites.py            # 모두 다시 만들기
  python tools/make_sprites.py --preview  # 크게 키운 미리보기도 함께 저장

새 그림을 더 넣고 싶다면 아래 SOURCES 에 한 줄 추가하세요.
  '이름': ('파일이름', (왼쪽, 위, 오른쪽, 아래) 또는 None)
  이름 규칙: 친구는 친구 id(baro, aja, chacha, lala, hap, areum, sappun, ponny),
            하츄핑 기본 모습은 hachu, 변신 폼은 hachu_flora / hachu_star / hachu_berry / hachu_dia / hachu_princess
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageEnhance

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
OUTLINE = {'hachu': (142, 42, 98), 'areum': (163, 52, 110), 'sappun': (62, 106, 174), 'ponny': (176, 104, 122)}
W, H, K = 88, 100, 4


def remove_bg(rgba):
    """가장자리와 이어진 배경색을 투명하게 (흰색/연분홍 배경)"""
    a = np.array(rgba).astype(int)
    if (a[[0, -1], :, 3] < 20).mean() > .9 and (a[:, [0, -1], 3] < 20).mean() > .9:
        return rgba  # 이미 투명 배경
    border = np.concatenate([a[0, :, :3], a[-1, :, :3], a[:, 0, :3], a[:, -1, :3]])
    bg = np.median(border, axis=0)
    cand = np.abs(a[:, :, :3] - bg).sum(2) < 54
    region = np.zeros_like(cand)
    region[0, :] = cand[0, :]; region[-1, :] = cand[-1, :]; region[:, 0] = cand[:, 0]; region[:, -1] = cand[:, -1]
    while True:
        grow = region.copy()
        grow[1:, :] |= region[:-1, :]; grow[:-1, :] |= region[1:, :]
        grow[:, 1:] |= region[:, :-1]; grow[:, :-1] |= region[:, 1:]
        grow &= cand
        if (grow == region).all():
            break
        region = grow
    a[region, 3] = 0
    return Image.fromarray(a.astype(np.uint8), 'RGBA')


def to_pixel(rgba, outline):
    bbox = rgba.getchannel('A').point(lambda v: 255 if v > 16 else 0).getbbox()
    rgba = rgba.crop(bbox)
    rgb = ImageEnhance.Contrast(ImageEnhance.Color(rgba.convert('RGB')).enhance(1.15)).enhance(1.06)
    rgba = Image.merge('RGBA', (*rgb.split(), rgba.getchannel('A')))
    bw, bh = W * K, H * K
    s = min(bw * .98 / rgba.width, bh * .97 / rgba.height)
    nw, nh = max(1, round(rgba.width * s)), max(1, round(rgba.height * s))
    big = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    big.paste(rgba.resize((nw, nh), Image.LANCZOS), ((bw - nw) // 2, bh - nh - K))
    src = np.array(big).astype(int)
    out = np.zeros((H, W, 4), dtype=np.uint8)
    q = lambda v: np.minimum(255, np.round(v / 16) * 16).astype(int)
    deep = tuple(int(c * .55) for c in outline)
    for y in range(H):
        for x in range(W):
            blk = src[y * K:(y + 1) * K, x * K:(x + 1) * K].reshape(-1, 4)
            op = blk[blk[:, 3] > 128]
            if len(op) < 7:
                continue
            keys = (q(op[:, 0]) << 16) | (q(op[:, 1]) << 8) | q(op[:, 2])
            vals, cnt = np.unique(keys, return_counts=True)
            c = int(vals[cnt.argmax()])
            r, g, b = c >> 16 & 255, c >> 8 & 255, c & 255
            lum = .3 * r + .59 * g + .11 * b
            if lum < 58:
                r, g, b = deep
            elif lum > 236 and max(r, g, b) - min(r, g, b) < 26:
                r = g = b = 255
            out[y, x] = (r, g, b, 255)
    # 배경에서 남은 흰 테두리 지우기 (가장자리의 거의 흰 칸)
    for _ in range(2):
        solid = out[:, :, 3] == 255
        rgb = out[:, :, :3].astype(int)
        whitish = solid & (rgb.min(2) > 226) & (rgb.max(2) - rgb.min(2) < 30)
        near = np.zeros_like(solid)
        near[1:, :] |= ~solid[:-1, :]; near[:-1, :] |= ~solid[1:, :]; near[:, 1:] |= ~solid[:, :-1]; near[:, :-1] |= ~solid[:, 1:]
        near[0, :] = near[-1, :] = True; near[:, 0] = near[:, -1] = True
        out[whitish & near] = 0
    solid = out[:, :, 3] == 255
    edge = np.zeros_like(solid)
    edge[1:, :] |= solid[:-1, :]; edge[:-1, :] |= solid[1:, :]; edge[:, 1:] |= solid[:, :-1]; edge[:, :-1] |= solid[:, 1:]
    edge &= ~solid
    out[edge] = (*outline, 255)
    return Image.fromarray(out, 'RGBA')


def main():
    preview = '--preview' in sys.argv
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
        im = remove_bg(im)
        spr = to_pixel(im, OUTLINE.get(key.split('_')[0], (110, 60, 100)))
        spr.save(os.path.join(OUT, key + '.png'))
        made[key] = key + '.png'
        if preview:
            spr.resize((W * 4, H * 4), Image.NEAREST).save(os.path.join(OUT, '_preview_' + key + '.png'))
        print(f'  {key}: 완료')
    with open(os.path.join(OUT, 'manifest.js'), 'w', encoding='utf-8') as f:
        f.write('/* tools/make_sprites.py 가 만들어요. 원작 참고 그림으로 만든 도트예요 (이 PC에서만 써요). */\n')
        f.write('window.HPM_CHARS = ' + json.dumps(made, indent=1) + ';\n')
    print(f'도트 캐릭터 {len(made)}개를 만들었어요.')


if __name__ == '__main__':
    try:
        sys.stdout.reconfigure(errors='replace')
    except Exception:
        pass
    main()
