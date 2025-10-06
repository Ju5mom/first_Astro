---
layout: ../../layouts/MarkdownPostLayout.astro
title: Astroのサーバー側って何？
author: Astro学習者
description: "この記事単独で表示されます！"
image:
  url: "https://docs.astro.build/default-og-image.png"
  alt: "惑星と星のイラストの中にastroという単語があります。"
pubDate: 2022-08-08
tags: ["astro", "成功"]
---

Astro では、.astro ファイルのフロントマター（---で囲まれた部分）や .js ファイル内で実行されるコードはブラウザ（クライアント）ではなく、ビルド時 or サーバー側（Node.js）で実行されます。
.astro ファイルのフロントマターで実行された console.log() の結果が このターミナルの出力 に表示されます。

## どうしてブラウザではなくターミナルに出るのか

Astro は 「サーバーで HTML を事前に生成」する（SSG）仕組み だからです。
そのため：

・ astro の上部（---内）で動く JS → Node.js 環境（サーバー側）

・ <script> タグの中で書く JS → ブラウザ環境（クライアント側）
