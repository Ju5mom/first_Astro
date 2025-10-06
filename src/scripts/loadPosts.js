"use strict";

export const loadPosts = async () => {
  // postsフォルダ内のMarkdownを全部取得
  // import.meta.glob() は vite の標準搭載機能（ Javascript + Vite ）
  const modules = import.meta.glob('../pages/posts/*.md');

  /* modulesの中身 = object
  {
    "../pages/posts/astro-intro.md": () => import("../pages/posts/astro-intro.md"),
    "../pages/posts/markdown-guide.md": () => import("../pages/posts/markdown-guide.md"),
    "../pages/posts/vite-tips.md": () => import("../pages/posts/vite-tips.md")
  }

  この import(path)は js の標準機能である。
  以下のように書くと、「実行中に読み込む」 ことができる
  const module = await import('./MyComponent.js');
  */
  console.log(modules);

  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, resolver]) => {
      // Object.entries オブジェクトのキーの値の組の配列を返す [ key, value ]

      /* 返される配列
      [
        ["../pages/posts/astro-intro.md", () => import("../pages/posts/astro-intro.md")],
        ["../pages/posts/vite-tips.md", () => import("../pages/posts/vite-tips.md")],
        ["../pages/posts/markdown-guide.md", () => import("../pages/posts/markdown-guide.md")]
      ]

      */
      const post = await resolver();
      /* resolver を実行した結果
        {
          frontmatter: {
            title: "Astro入門",
            date: "2025-10-01"
          },
          Content: [Markdownの本文],
          file: "../pages/posts/astro-intro.md"
        }
      */

      /*
      frontmatter の中身（title, dateなど）を展開して取り出す
      ファイルパスから .md を削除して、url として使う
      */
      return {
        ...post.frontmatter,
        url: path
          .replace('../pages', '')
          .replace('.md', '')
      };
    })
  );

  // 日付の降順に並び替え
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}