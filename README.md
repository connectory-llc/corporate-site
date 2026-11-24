# corporate-site

CONNECTORY（コネクトリー）のコーポレートサイト。Astro + TypeScript で作った静的サイトを GitHub Pages で公開する。

## 開発

```bash
npm ci
npm run dev        # 開発サーバー
npm run check      # 型チェック
npm run build      # dist/ に書き出す
```

## 内容を更新する

| 変えたいもの | ファイル |
| --- | --- |
| 会社概要（設立・所在地・代表社員など） | `src/data/company.ts` |
| プロダクト | `src/data/products.ts` |
| 問い合わせ先（メールアドレス・フォーム URL） | `src/data/contact.ts` |
| サイト名・説明文・ナビゲーション | `src/data/site.ts` |

値を空にした項目はページに表示されない。プロダクトのロゴやスクリーンショットは `src/assets/products/` に置いて `products.ts` から読み込む。

## 公開

main に push すると GitHub Actions が型チェックとビルドを実行し、成果物を `gh-pages` ブランチに push する。リポジトリの Settings → Pages で、公開元を `gh-pages` ブランチのルートにしておく。

公開先は `https://connectory.co.jp`。独自ドメインは `public/CNAME` で指定していて、DNS は Cloudflare で管理している。
