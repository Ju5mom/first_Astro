---
layout: ../../layouts/MarkdownPostLayout.astro
title: 私の2番目のブログ記事
author: Astro学習者
description: "レイアウトの入れ子を試す"
image:
  url: "https://docs.astro.build/assets/arc.webp"
  alt: "Astroのアークのサムネイル。"
pubData: 2025-10-01
tags: ["astro", "ブログ", "公開学習", "成功"]
---

サイト全体で共通のBaseLayout.astroは、ナビゲーションやフッター、SEOメタタグ、グローバルスタイル、フォントなどのページテンプレートを処理する。


MarkdownPostLayout.astro では、ブログ記事から受け取ったpropsをBaseLayoutに渡す。pageTitle属性に、frontmatter.title を渡し、propsをBaseLayoutへ渡している。

「レイアウトの入れ子」
https://docs.astro.build/ja/basics/layouts/#%E3%83%AC%E3%82%A4%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AE%E5%85%A5%E3%82%8C%E5%AD%90
