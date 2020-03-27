'use strict'

import fs from 'fs'
import path from 'path'
import { resultInterface, fileInfo } from './interface'


// 作業用パス
const workingDirectoryPath = fs.realpathSync('./') + '/work'
const outputDirectoryPath = fs.realpathSync('./') + '/output'

class BackMainProcess {
  
  // 初期化
  init () {
    // 作業用ディレクトリがなければ作成
    createDirectory(workingDirectoryPath)
    createDirectory(outputDirectoryPath)
    // tmpディレクトリにあるファイルを削除する
    removeFiles(workingDirectoryPath)
    removeFiles(outputDirectoryPath)
  }

  fileLoad (dataList: fileInfo[]) {
    // 現在のディレクトリにファイルをコピーしてから画面に表示する
    for (const file of dataList) {
      // TODO:ファイルを上書きしちゃうので、ファイル名を変更するかエラーにしないとダメ
      fs.copyFileSync(file.path, workingDirectoryPath + '/' + file.name, fs.constants.COPYFILE_EXCL)
      file.path = workingDirectoryPath + '/' + file.name
    }

    return dataList
  }

  // リネーム処理
  renameOutput (selectRenamePettern:string) {
    // 出力先をフォルダの内容を削除しておく
    removeFiles(outputDirectoryPath)

    let retrunObj:resultInterface = {message:'ok', code:200};
    switch (selectRenamePettern) {
      case 'digitFirst':
      case 'digitPaddingFirst':
        digitFirst(selectRenamePettern === 'digitPaddingFirst')
        break
      case 'digitLast':
      case 'digitPaddingLast':
        digitLast(selectRenamePettern === 'digitPaddingLast')
        break
      case 'custom':
        petternChange()
        break
      default:
        retrunObj = {
          message:'処理に問題が発生しました',
          code:400
        }
        alert()
        return
    }
    
    return retrunObj
  }
}

function digitFirst (padding: boolean) {
  let index = 1
  // TODO:桁の制御
  for (const file of this.fileInfoList) {
    const textIndex = padding ? ('000' + index).slice(-3) : index
    const newFileName = textIndex + this.renameValue + path.extname(file.path)
    fs.copyFileSync(file.path, this.outputDirectoryPath + '/' + newFileName)
    index++
  }
}
function  digitLast (padding: boolean) {
  let index = 1
  // TODO:桁の制御
  for (const file of this.fileInfoList) {
    const textIndex = padding ? ('000' + index).slice(-3) : index
    const newFileName = this.renameValue + textIndex + path.extname(file.path)
    fs.copyFileSync(file.path, this.outputDirectoryPath + '/' + newFileName)
    index++
  }
}

function petternChange () {
  // if (fs.readFileSync) {
  //   try {
  //     fs.statSync('saveFile')
  //     const jsonValue = JSON.parse(fs.readFileSync('saveFile'))
  //     const petternList = jsonValue
  //     petternList.forEach(item => {
  //       let index = 1
  //       for (const file of this.fileInfoList) {
  //         // TODO: ここでID必要かも…
  //         if (item.name === file.petternName) {
  //           // TODO: indexを桁つきでかつ色々設定できるように…
  //           const fileName = item.name + index.toString()
  //           const newFileName = fileName + path.extname(file.path)
  //           fs.copyFileSync(file.path, this.outputDirectoryPath + '/' + newFileName)
  //           index++
  //         }
  //       }
  //     })
  //   } catch (error) {
  //     if (error.code === 'ENOENT') {
  //       console.log('ファイル・ディレクトリは存在しません。')
  //     } else {
  //       alert(error)
  //     }
  //   }
  // }
}


// ディレクトリ作成
function createDirectory (path: string) {
  if (!fs.existsSync(path)) fs.mkdirSync(path)
}

// ディレクトリ内ファイル削除
function removeFiles (path: string) {
  const targetRemoveFiles = fs.readdirSync(path)
  for (const fileName of targetRemoveFiles) {
    fs.unlinkSync(path + '/' + fileName)
  }
}


export default new BackMainProcess()