---
layout: ../../layouts/MarkdownPostLayout.astro
title: Astro.glob() は非推奨！
author: Astro学習者
description: "この記事単独で表示されます！"
image:
  url: "https://docs.astro.build/default-og-image.png"
  alt: "惑星と星のイラストの中にastroという単語があります。"
pubDate: 2025-10-07
tags: ["astro", "成功"]
---
## 静的サイト設定に多数のローカル ファイルを読み込む方法 Astro.glob() はなぜ非推奨になったのか？

① Astro 独自仕様だから

Astro.glob() は Astro が一時的に用意した便利関数でした。
でも中身は結局 Vite の import.meta.glob() をラップしただけ。
Astro の開発チームは今後、
「Vite の標準機能に統一したい」と方針を出しています。

② Vite（import.meta.glob）のほうが汎用的

import.meta.glob() は Vite に標準搭載されている機能なので、
Astro 以外のプロジェクト（Vue・Svelte・React）でも共通で使えます。

つまり：

Astro だけに依存しないコードになる

将来のバージョンでも安心して動く

## どうすればいいか
「ラッパー関数」を1つ作っておけば、Astro.glob() とほぼ同じ感覚で使えます 👇<br>
src/scripts/loadPosts.js

呼び出しはフロントマターの中に
import { loadPosts } from '../scripts/loadPosts.js'
と書くだけ。

### markdownファイルを読み込むと‥

AstroではMarkdownを読み込むと、自動的に frontmatter（記事のメタ情報） と本文（Content） に分けてくれます。
<br>
```javascript
{
  frontmatter: {
    title: "Astro入門",
    date: "2025-10-01"
  },
  Content: [Markdownの本文],
  file: "../pages/posts/astro-intro.md"
}
```


