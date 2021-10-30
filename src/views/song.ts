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
  name: string,
  isVip: boolean,
  singer: singerItem[]
}
