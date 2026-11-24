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
| メンバー（名前・SNS・アイコン） | `src/data/members.ts` |
| 問い合わせ先（メールアドレス・フォーム URL） | `src/data/contact.ts` |
| サイト名・説明文・ナビゲーション | `src/data/site.ts` |

値を空にした項目はページに表示されない。プロダクトのロゴやスクリーンショットは `src/assets/products/`、メンバーのアイコンは `src/assets/members/` に置いて読み込む。メンバーを足すと、トップページのメンバー欄と `/members/<slug>/` のプロフィールのページが増える。

## 名刺

`npm run dev` で開発サーバーを立ち上げ、`/business-card` を開くと名刺の表面と裏面が出る。このページは開発サーバーでだけ開け、公開するサイトには含めない。

1. `src/business-card/holder.example.json` を複製して `src/business-card/holders/<slug>.json` を作り、肩書き・住所・メールアドレス・電話番号を入れる。空の項目は名刺に出ない
2. 顔写真を同じ名前で `src/business-card/holders/<slug>.jpg` に置く。png・webp でもよい。17 × 21 mm の比率で中央を切り抜くので、顔と肩が収まるよう切り出しておく
3. Chrome の印刷で「PDF に保存」を選び、余白を「なし」、「背景のグラフィック」をオンにして保存する

`<slug>` を `src/data/members.ts` のメンバーとそろえると、名前・SNS のアカウントと QR コード・アイコンはそこから載る。

PDF は仕上がり 91 × 55 mm に塗り足し 3 mm を加えた 97 × 61 mm で、1 人につき表面と裏面の 2 ページが並ぶ。1 人分だけ書き出すときは印刷のページ指定で絞る。会社名・ロゴは `src/data/`、裏面のサービスは `products.ts` で URL のあるものを載せる。表面のサイトの QR コードは、移る予定の独自ドメイン `https://connectory.co.jp/` を指す。

`holders/` はリポジトリが公開されているため `.gitignore` に入れてある。コミットしない。

## 公開

main に push すると GitHub Actions が型チェックとビルドを実行し、成果物を `gh-pages` ブランチに push する。リポジトリの Settings → Pages で、公開元を `gh-pages` ブランチのルートにしておく。

公開先は `https://connectory.co.jp`。独自ドメインは `public/CNAME` で指定していて、DNS は Cloudflare で管理している。
