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


###����
���J�����̓R�}���h�v�����v�g���Ǘ��҂ŊJ���Ă̓_��(�����̖�肩�h���b�O�Ńt�@�C���A�b�v�s�ɂȂ�)

�����[�J���̉摜���J��������window�쐬��webSecurity�v���p�e�B�����L�̌`�Őݒ肷��B
webPreferences: {
  nodeIntegration: true,
  webSecurity: process.env.NODE_ENV !== 'development'
}
