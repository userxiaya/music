import { AxiosRequestConfig } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface newAxiosRequestConfig<T = any> extends AxiosRequestConfig {
  eeAjax?: boolean
}
// 歌手-item
export type singerItem = {
  id: number,
  name: string,
}
// 歌单标签
export type tagItem = {
  name: string,
}
// 歌曲列表-item
export type songItem = {
  id: number,
  songmid?: string,
  albumImg?: string,
  name: string,
  isVip: boolean,
  singer: singerItem[]
}
