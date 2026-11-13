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

## 名刺

`npm run dev` で開発サーバーを立ち上げ、`/corporate-site/business-card` を開くと名刺の表面と裏面が出る。このページは開発サーバーでだけ開け、公開するサイトには含めない。

1. `src/business-card/holder.example.json` を複製して `src/business-card/holder.local.json` を作り、肩書き・氏名・住所・メールアドレス・電話番号を入れる。空の項目は名刺に出ない
2. 顔写真を `src/business-card/photo.jpg` に置く。png・webp でもよい。置かなければ写真の枠は出ない
3. Chrome の印刷で「PDF に保存」を選び、余白を「なし」、「背景のグラフィック」をオンにして保存する

PDF は仕上がり 91 × 55 mm に塗り足し 3 mm を加えた 97 × 61 mm で、表面と裏面が 1 ページずつになる。会社名・ロゴは `src/data/`、裏面のサービスは `products.ts` で URL のあるものを載せる。表面の QR コードはサイトの URL を指すため、独自ドメインに移ったら刷り直す。

`holder.local.json` と `photo.*` はリポジトリが公開されているため `.gitignore` に入れてある。コミットしない。

## 公開

main に push すると GitHub Actions が型チェックとビルドを実行し、成果物を `gh-pages` ブランチに push する。リポジトリの Settings → Pages で、公開元を `gh-pages` ブランチのルートにしておく。

独自ドメインに移るときは、`astro.config.ts` の `site` をドメインに差し替えて `base` を消し、`public/CNAME` にドメインを書く。
