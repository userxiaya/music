import { songItem, tagItem } from '@/views/song'

// 歌单详情
export type playDetail = {
  id: number,
  name: string,
  userIcon: string,
  userName: string,
  desc: string,
  tagList: tagItem[],
  imageUrl: string,
  list: songItem[]
}
