export type SongGroupListData = {
  updateTime: string
  createtime: string
  creator: {
    avatarUrl: string
    name: string
  },
  id: string
  name: string
  imageUrl: string
  listenCount: number // 播放数量
  songChannel: songChannel
}
export type SongGroupData = {
  total: number, // 总数
  list: SongGroupListData[]
}
