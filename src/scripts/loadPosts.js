"use strict";

export const loadPosts = async () => {
  try {
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

    // Object.entries オブジェクトのキーの値の組の配列を返す [ key, value ]
    const entries = Object.entries(modules);
    /* 返される配列
    [
      ["../pages/posts/astro-intro.md", () => import("../pages/posts/astro-intro.md")],
      ["../pages/posts/vite-tips.md", () => import("../pages/posts/vite-tips.md")],
      ["../pages/posts/markdown-guide.md", () => import("../pages/posts/markdown-guide.md")]
    ]
    */

    console.log(entries);

    const posts = await Promise.all(
      entries.map(async ([path, resolver]) => {
        try {
          const post = await resolver();
          /* resolver (import(path)) をひとつずつ実行した結果
            {
              frontmatter: {
                title: "Astro入門",
                date: "2025-10-01"
              },
              Content: [Markdownの本文],
              file: "../pages/posts/astro-intro.md"
            }
    
            ※ memo: AstroではMarkdownを読み込むと、自動的に frontmatter（記事のメタ情報） と本文（Content） に分けてくれます。
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

        } catch (err) {
          console.error(`❌ ${path} の読み込み中にエラー:`, err);
          return null;
        }
      })
    );

    // null を除外して返す
    return posts.filter(Boolean).sort(
      // 日付の降順に並び替え
      (a, b) => new Date(b.date) - new Date(a.date)
    );

  } catch (error) {
    console.error("投稿の取得中に予期せぬエラーが発生しました:", error);
    return [];
  }

}

/*
map()	非同期処理（Promise）を複数立ち上げるが、完了は待たない
await resolver()	その1つのPromise（Markdown読み込み）が解決するまで待つ
Promise.all()	すべてのPromiseが解決するのをまとめて待つ
await Promise.all()	全部の処理が終わってから、結果配列を返す
*/