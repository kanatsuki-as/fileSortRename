
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

export interface settinPettern {
  id: string
  name: string
  color: colorPettern
}

interface colorPettern {
  r: number
  g: number
  b: number
  a: number
}

export interface options {
  id: string
  name: string
  class: string
}

export interface renameType {
  value: string
  label: string
}