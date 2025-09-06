---
title: "私の最初のブログ記事"
pubData: 2025-09-04
description: "これは私の最初の記事です。"
author: "Astro学習者"
image:
  url: "https://docs.astro.build/assets/full-logo-light.png"
  alt: "Astroのロゴ。"
tags: ["astro", "ブログ", "公開学習"]
---

# 私の最初のブログ記事

投稿日: 2025-09-07
Astro の学習についての _備忘録_ である。

## Astroコンポーネントテンプレートにおける map の挙動

Astro コンポーネントテンプレートは複数の要素を直接レンダリングできます。  
そのため、**全体を単一の `<div>` や `<>`（フラグメント）で囲む必要はありません。**

`<ul>{skills.map((skill) => <li class="skill">{skill}</li>)}</ul>`

この場合、JSX でも Astroコンポーネントテンプレートでも`{}`配下の配列は、 **そのまま順に並べて表示** してくれる。

JSXの場合、（map に限らず）

- for-of
- 条件分岐（三項演算子など）
- 他の関数の return

などでも「複数兄弟要素を返す式」になった場合は フラグメントや div でひとまとめ にする必要がある。

