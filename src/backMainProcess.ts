'use strict'

import fs from 'fs'
import path from 'path'
import { resultInterface, fileInfo, outputRenameData, settinPettern } from './interface'


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

  imageLoad (dataList: fileInfo[]) {
    // 現在のディレクトリにファイルをコピーしてから画面に表示する
    for (const file of dataList) {
      // TODO:ファイルを上書きしちゃうので、ファイル名を変更するかエラーにしないとダメ
      fs.copyFileSync(file.path, workingDirectoryPath + '/' + file.name, fs.constants.COPYFILE_EXCL)
      file.path = workingDirectoryPath + '/' + file.name
    }

    return dataList
  }

  // リネーム処理
  renameOutputDigit (renameOutputData: outputRenameData) {
    // 出力先をフォルダの内容を削除しておく
    removeFiles(outputDirectoryPath)

    let retrunObj:resultInterface = {message:'出力しました', code:200};
    switch (renameOutputData.renameType) {
      case 'digitFirst':
      case 'digitPaddingFirst':
        digitFirst(renameOutputData, renameOutputData.renameType === 'digitPaddingFirst')
        break
      case 'digitLast':
      case 'digitPaddingLast':
        digitLast(renameOutputData, renameOutputData.renameType === 'digitPaddingLast')
        break
      case 'custom':
        customChange(renameOutputData)
        break;
      default:
        retrunObj = {
          message:'処理に問題が発生しました',
          code:400
        }
        return
    }
    
    return retrunObj
  }

  settingFileload () {
    return fileLoad('saveFile')
  }

  settingFileSave (dataList: settinPettern[]) {
    try {
      fs.writeFileSync('saveFile', JSON.stringify(dataList))
    } catch (error) {
      if (error.code === 'ENOENT') {
        return ''
      }
    }
  }
}

function fileLoad (fileName: string): settinPettern[] {
  if (fs.readFileSync) {
    try {
      // ファイル存在判定。なければエラーになるので、try/catchでくるむ
      fs.statSync(fileName)
      return JSON.parse(fs.readFileSync(fileName).toString())
    } catch (error) {
      if (error.code === 'ENOENT') {
        return []
      } else {
        alert(error)
      }
    }
  }
}

function digitFirst (renameOutputData: outputRenameData, padding: boolean) {
  let index = 1
  for (const file of renameOutputData.renameList) {
    const textIndex = padding ? (('00000000') + index).slice(-1 * renameOutputData.digit) : index
    const newFileName = textIndex + renameOutputData.renameValue + path.extname(file.path)
    fs.copyFileSync(file.path, outputDirectoryPath + '/' + newFileName)
    index++
  }
}
function  digitLast (renameOutputData: outputRenameData, padding: boolean) {
  let index = 1
  for (const file of renameOutputData.renameList) {
    const textIndex = padding ?  (('00000000') + index).slice(-1 * renameOutputData.digit) : index
    const newFileName = renameOutputData.renameValue + textIndex + path.extname(file.path)
    fs.copyFileSync(file.path, outputDirectoryPath + '/' + newFileName)
    index++
  }
}

function customChange (renameOutputData: outputRenameData) {
  const settingDatas = fileLoad('saveFile')
  settingDatas.forEach(settingData => {
    let index = 1
    const fileList = renameOutputData.renameList.filter(n => n.petternName === settingData.name)
    for (const file of fileList) {
      // TODO: indexを桁つきでかつ色々設定できるように…
      const fileName = file.name + index.toString()
      const newFileName = fileName + path.extname(file.path)
      fs.copyFileSync(file.path, outputDirectoryPath + '/' + newFileName)
      index++
    }
  })
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