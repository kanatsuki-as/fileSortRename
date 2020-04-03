
export interface resultInterface{
  message: string
  code: number
}


export interface renameData{
  path: string
  name: string
  id: string
  color: string
  petternName: string
  isSelect: boolean
}


export interface fileInfo{
  path: string
  name: string
}


export interface outputRenameData{
  renameType: string
  renameList: renameData[]
  renameValue: string
  digit: number
}
