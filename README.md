# Geoid Map

日本周辺のジオイド高を可視化するWebアプリケーション。MapLibre GL JSとReactを使用し、PMTiles形式の地理データで高速な地図表示を実現。

## 🌐 デモ

[GitHub Pagesで公開中](https://hirofumikanda.github.io/geoid-map)

## ✨ 機能

- **ジオイド高可視化**: -60mから+60mの範囲でカラーマップ表示
- **海底地形**: GEBCO 2025データによる詳細な海底地形表示
- **レイヤー切替**: ジオイドレイヤーの表示/非表示切り替え
- **凡例**: ジオイドレイヤーの凡例表示

## 🏗️ 技術スタック

- **Frontend**: React 19 + TypeScript
- **地図ライブラリ**: MapLibre GL JS 5.6
- **データ形式**: PMTiles (高速ベクタータイル)
- **ビルドツール**: Vite
- **デプロイ**: GitHub Pages

## 📊 データソース

- **ジオイド**: [EGM2008](https://geographiclib.sourceforge.io/1.18/geoid.html)
- **地形**: [GEBCO 2025 Grid](https://www.gebco.net/data-products/gridded-bathymetry-data)
- **背景地図**: [Natural Earth](https://www.naturalearthdata.com/downloads/)

## 🚀 開発環境セットアップ

### 前提条件
- Node.js 18+ 
- npm

### インストール
```bash
# リポジトリをクローン
git clone https://github.com/hirofumikanda/geoid-map.git
cd geoid-map

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173 を開いてアプリケーションを確認。

## 📁 プロジェクト構造

```
geoid-map/
├── public/
│   ├── data/           # PMTilesデータファイル
│   ├── font/           # カスタムフォント
│   └── styles/         # MapLibreスタイル定義
├── src/
│   ├── components/     # Reactコンポーネント
│   ├── utils/          # ユーティリティ関数
│   └── main.tsx        # エントリーポイント
└── .github/
    └── copilot-instructions.md  # AI開発ガイド
```


## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
