## 概要


ひとりご飯の検索サイト，Foo のフロントレポジトリです．Next.js + TypeScript で書いています．  

## 開発ロードマップ

[Foo 開発ロードマップ - Notion / Yo Iwamoto](https://www.notion.so/Foo-d5ddbe46840c44e895dc849f5fde7a13)

## 構成


| 技術                    | 採用理由 / 目的                                                                   |
| :---------------------- | :-------------------------------------------------------------------------------- |
| Next.js                 | ルーティング，SSG，開発環境での rapid-reload のため                               |
| React.js                | TypeScript との相性の良さ，可読性の高さ                                           |
| TypeScript              | JavaScript の型付け，開発の効率化                                                 |
| Redux                   | 状態管理ライブラリとして情報量が十分だったため                                    |
| Tailwind CSS            | コンポーネント志向のフロント開発との相性の良さ，拡張性の高さ，簡潔さ              |
| ESLint                  | コード解析のため                                                                  |
| Prettier                | コードフォーマットのため                                                          |
| Firebase Authentication | 個人情報分離，OAuth の簡易実装・メール認証ユーザーとの一元管理                    |
| Express                 | ローカル環境からプロキシを設定して外部 API にアクセスするためのカスタムサーバー用 |
| GoogleMap API           | 地図利用 API としての機能の豊富さ                                                 |

### その他

react-spinners, react-loading-skeleton：アニメーション実装の工数削減

## 開発にあたって


### 導入

```
$ git clone https://github.com/you-5805/foo
$ cd foo && yarn install
$ yarn dev
```

個人管理かつ開発段階のため，ブランチは```develop``` => ```main```のみ利用しています．

### lint 等

```
$ yarn format // prettier
$ yarn lint or lint:fix // tslint
$ yarn check-types // tscの型検査
```

### 環境変数

以下を環境変数にセットする必要がある．

- リクルート WEB サービス API キー
- Firebase プロジェクト諸変数
- GoogleMap API キー

### バックエンドデータモデル
元データはこのリポジトリの```root/foo.pu```にUMLで作成しています．
Resourceはテーブルではなく，Polymorphic実装の関連を擬似的に表現したものです．

<img src="https://user-images.githubusercontent.com/56625097/119692407-57087800-be86-11eb-94fc-d4010899b602.png" width="300" />

