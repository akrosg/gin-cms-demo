# Gin CMS Demo

Next.js 16 と Gin を使ったモノリポのミニ CMS です。PPR（Partial Prerendering）と ISR（Incremental Static Regeneration）を活用した実装になっています。

## 構成

- **Frontend**: Next.js 16（App Router、PPR、ISR）
- **Backend**: Gin（Go 言語の Web フレームワーク）
- **Database**: SQLite（簡易実装）

## 機能

- 記事の作成・編集・削除
- 記事一覧表示（ISR: 60 秒ごとに再生成）
- 記事詳細表示（PPR + ISR: 30 秒ごとに再生成）
- 管理画面（クライアントサイド）

## PPR と ISR の実装

### ISR（Incremental Static Regeneration）

- **記事一覧ページ** (`/`): 60 秒ごとに再生成
- **記事詳細ページ** (`/posts/[slug]`): 30 秒ごとに再生成
- `revalidate`オプションと`fetch`の`next: { revalidate }`を使用

### PPR（Partial Prerendering）

- `Suspense`を使用して動的部分を分離
- 静的コンテンツ（ヘッダー、ナビゲーション）は事前レンダリング
- 動的コンテンツ（記事データ）はストリーミングで配信

## セットアップ

### 必要な環境

- Bun 1.0 以上（パッケージマネージャー）
- Go 1.21 以上

### インストール

```bash
# Bunのインストール（未インストールの場合）
curl -fsSL https://bun.sh/install | bash

# ルートの依存関係をインストール
bun install

# フロントエンドの依存関係をインストール
cd frontend && bun install && cd ..

# バックエンドの依存関係をダウンロード
cd backend && go mod download && cd ..
```

**注意**:

- このプロジェクトは Bun をパッケージマネージャーとして使用しています
- Tailwind CSS 4 を使用しているため、フロントエンドのビルド時に PostCSS と Tailwind が自動的に処理されます

### 開発サーバーの起動

```bash
# フロントエンドとバックエンドを同時に起動（推奨）
bun run dev

# または個別に起動
bun run dev:frontend  # http://localhost:3000
bun run dev:backend   # http://localhost:8080
```

### コードフォーマットとリント

```bash
# コードをチェック（フォーマットとリント）
bun run lint

# 自動修正（フォーマットとリント）
bun run lint:fix

# フォーマットのみ
bun run format
```

### 初回起動時

バックエンドを初めて起動すると、SQLite データベース（`backend/cms.db`）が自動作成され、サンプル記事が 3 件投入されます。

## API エンドポイント

- `GET /api/posts` - 記事一覧を取得
- `GET /api/posts/:id` - 記事詳細を取得（ID または slug で検索可能）
- `POST /api/posts` - 記事を作成
- `PUT /api/posts/:id` - 記事を更新
- `DELETE /api/posts/:id` - 記事を削除
- `GET /health` - ヘルスチェック

## プロジェクト構造

```
gin-cms-demo/
├── frontend/           # Next.js 16アプリケーション
│   ├── app/           # App Router
│   │   ├── page.tsx   # ホーム（記事一覧、ISR）
│   │   ├── posts/     # 記事詳細（PPR + ISR）
│   │   └── admin/     # 管理画面（クライアントサイド）
│   ├── components/    # Reactコンポーネント
│   └── lib/           # APIクライアント
├── backend/           # Ginアプリケーション
│   ├── handlers/      # APIハンドラー
│   ├── models/        # データモデル
│   └── database/      # データベース接続
└── package.json       # モノリポ管理
```

## 技術スタック

- **Frontend**: Next.js 16, React, TypeScript, App Router, Tailwind CSS 4
- **Backend**: Gin, GORM, SQLite
- **開発ツール**:
  - **パッケージマネージャー**: Bun
  - **フォーマッター/リンター**: Biome
- **Features**:
  - PPR（Partial Prerendering）
  - ISR（Incremental Static Regeneration）
  - Server Components
  - Suspense
  - Tailwind CSS 4 によるモダンな UI

## 開発のポイント

### Go 言語の学習

- Gin フレームワークの基本的な使い方
- GORM を使ったデータベース操作
- RESTful API の実装
- CORS 設定

### Next.js 16 の新機能

- PPR による部分的な事前レンダリング
- ISR による段階的な静的再生成
- Server Components と Suspense の活用

### 開発ツール

- **Bun**: 高速なパッケージマネージャーとランタイム
- **Biome**: 統合されたフォーマッターとリンター（ESLint + Prettier の代替）
