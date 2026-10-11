# 직접 만들 때 쓰는 그림 프롬프트

Gemini 앱, Google AI Studio, ChatGPT, Bing Image Creator 같은 곳에 아래 프롬프트를 **하나씩 그대로 붙여 넣고**, 나온 그림을 `assets/images/` 폴더에 **파일 이름 그대로** 저장하세요.

- 가로로 긴 그림(16:9)이 좋아요. 도구에 비율 선택이 있으면 16:9를 고르세요.
- png, jpg, webp 모두 괜찮아요. 예: `sc_dance.png`
- 다 넣은 뒤에 `python tools/generate_images.py --scan` 을 한 번 실행하면 게임이 그림을 알아봐요.
- 필요한 것만 넣어도 돼요. 없는 그림은 게임이 원래 그림으로 그려요.

## 타이틀 배경 → `title_bg.png`

```
a fairytale pink castle floating on fluffy clouds under a pastel sunrise sky, sparkles and tiny stars, rainbow in the distance. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 마을 지도 → `town_bg.png`

```
a top-down-ish view of a wide pastel green meadow with winding cream-colored dirt paths, flower patches and round trees at the edges, soft blue sky strip at the top, empty spaces for houses. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 댄스 교실 → `sc_dance.png`

```
a cute ballet and dance studio with a big mirror, wooden floor, pastel curtains, disco ball, music notes floating. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 도서관 → `sc_study.png`

```
a cozy fairytale library with tall wooden bookshelves full of colorful books, warm candle light, a round reading rug. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 마법 학교 → `sc_magic.png`

```
a magical classroom at night with purple walls, floating stars, a crystal ball on a desk, spell books and glowing potions. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 체육 교실 → `sc_gym.png`

```
a bright outdoor school playground and sports field with soft grass, colorful balls, a small running track, blue sky. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 예절 교실 → `sc_manners.png`

```
an elegant pastel tea room in a palace with a round table, lace tablecloth, teapot, cakes on a stand and roses. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 미술 교실 → `sc_art.png`

```
a sunny art classroom with easels, paint palettes, colorful paint splashes and children's drawings pinned on the wall. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 빵집 → `sc_bakery.png`

```
a cute warm bakery interior with shelves of bread, croissants and cupcakes, a brick oven glowing, pastel awning. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 꽃집 → `sc_flower.png`

```
a pastel flower shop interior full of tulips, sunflowers, roses in buckets and hanging plants, watering cans. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 아기 돌보기 → `sc_baby.png`

```
a soft nursery room with cribs, teddy bears, baby bottles, star mobiles and pastel blankets. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 성 청소 → `sc_clean.png`

```
a grand palace hallway with tall arched windows, shiny marble floor, soap bubbles floating, buckets and mops. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 레스토랑 → `sc_cook.png`

```
a cheerful restaurant kitchen with copper pots, a big cake on the counter, strawberries and pastel tiles. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 푹 쉬기 → `sc_rest.png`

```
a cozy pastel bedroom at night with a big window showing the moon and stars, soft pillows and a night lamp. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 소풍 → `sc_picnic.png`

```
a sunny meadow picnic spot with a checkered blanket, a picnic basket, butterflies and wildflowers under a big tree. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 모험 - 숲 → `adv_forest.png`

```
an enchanted sparkling forest path with giant mushrooms, glowing flowers, tall soft trees and light rays. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 모험 - 바다 → `adv_sea.png`

```
a rainbow-colored seaside with turquoise water, seashells on the sand, coral reefs visible underwater and a pastel rainbow. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 모험 - 구름 성 → `adv_cloud.png`

```
a castle in the sky above fluffy clouds with cloud bridges, floating stars and a lavender twilight sky. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 대회 무대 → `contest_stage.png`

```
a cute theater stage with red velvet curtains pulled open, warm spotlights, a wooden stage floor and stars on the backdrop. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 무도회장 → `ballroom.png`

```
a dazzling royal ballroom with crystal chandeliers, pink and gold decorations, a shiny dance floor and big arched windows. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 벚꽃 축제 → `ev_cherry.png`

```
a cherry blossom park in full bloom with pink petals falling along a path, soft spring sky. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 여름 바다 → `ev_beach.png`

```
a summer beach with sand castles, a beach umbrella, gentle waves and a bright sun, pastel colors. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 추석 → `ev_chuseok.png`

```
a Korean traditional village at night under a giant full moon, hanok roofs, paper lanterns, autumn persimmon tree. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 할로윈 → `ev_halloween.png`

```
a cute not-scary Halloween party scene with smiling jack-o-lanterns, candy bowls, purple night sky and bats made of paper. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 크리스마스 → `ev_christmas.png`

```
a cozy Christmas living room with a decorated tree, wrapped presents, snow outside the window and warm fairy lights. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 설날 → `ev_seollal.png`

```
a Korean Lunar New Year scene in a hanok courtyard with colorful kites, lucky pouches, rice cake soup bowls and plum blossoms. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 생일 파티 → `ev_birthday.png`

```
a birthday party room with a big strawberry cake, balloons, garlands, presents and confetti. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```

## 엔딩 배경 → `ending_bg.png`

```
a royal rose garden at golden hour with sparkling fountains, flower arches and a distant pink palace. Soft pastel children's picture-book illustration, kawaii and cozy, gentle watercolor and gouache texture, rounded shapes, dreamy soft lighting, pink lavender mint and butter-yellow palette. Background scene only: no people, no characters, no animals in the foreground, no text, no letters, no logos, no watermark. Wide 16:9 composition with a clear open area in the lower center where a small character can stand.
```
