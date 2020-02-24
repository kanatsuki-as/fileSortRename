# front

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn electron:serve
```

### Compiles and minifies for production
```
yarn electron:build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###注意
※開発時はコマンドプロンプトを管理者で開いてはダメ(権限の問題かドラッグでファイルアップ不可になる)

※ローカルの画像を開く処理はwindow作成時webSecurityプロパティを下記の形で設定する。
webPreferences: {
  nodeIntegration: true,
  webSecurity: process.env.NODE_ENV !== 'development'
}
