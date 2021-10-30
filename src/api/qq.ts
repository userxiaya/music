import request from '@/utils/request'
import { isWebView } from '@/utils/tools'
import { playDetail } from '@/views/playListDetail/type'
import { newAxiosRequestConfig } from '@/views/song'
import { SongGroupData } from '@/views/songGroupList/type'

const isWebview = isWebView()
const requestQQ = (option: newAxiosRequestConfig<any>) => {
  return request({
    ...option,
    eeAjax: isWebview,
    headers: {
      Referer: 'https://y.qq.com/',
      'User-Agent':
        'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
    }
  })
}

const baseUrl1: string = isWebview ? 'https://c.y.qq.com' : '/c.y.qq.com'
// const baseUrl2:string = isWebview ? 'https://u.y.qq.com' : '/u.y.qq.com'
const baseUrl3: string = isWebview ? 'https://i.y.qq.com' : '/i.y.qq.com'
/**
 *
 * @param current 当前页
 * @param pageSize 每页n条
 * @returns
 */
export const getSongGroupList = (params?: { current?: number, pageSize?: number }): Promise<SongGroupData> => {
  const { current = 1, pageSize = 10 } = params || {}
  const sin = (current - 1) * pageSize
  const ein = current * pageSize - 1
  return new Promise((resolve, reject) => {
    requestQQ({
      url: '/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
      method: 'GET',
      baseURL: baseUrl1,
      params: {
        picmid: 1,
        rnd: Math.random(),
        g_tk: 732560869,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        categoryId: 10000000, // 歌单类型Id
        sortId: 5,
        sin,
        ein
      }
    }).then(({ data }: { data: { sum: number, list: any[] } }) => {
      const result: SongGroupData = {
        total: data.sum,
        list: data.list.map((e: any) => ({
          updateTime: e?.commit_time,
          createtime: e?.createtime,
          creator: {
            avatarUrl: e?.creator?.avatarUrl,
            name: e?.creator?.name
          },
          id: e?.dissid,
          name: e?.dissname,
          imageUrl: e?.imgurl,
          songChannel: 'QQ',
          listenCount: e?.listennum // 播放数量
        }))
      }
      resolve(result)
    }).catch((err) => {
      reject(err)
    })
  })
}
export const getPlayDetail = (id: string): Promise<playDetail> => {
  return new Promise((resolve, reject) => {
    requestQQ({
      url: '/qzone-music/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
      method: 'GET',
      baseURL: baseUrl3,
      params: {
        disstid: id,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        nosign: 1,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'json',
        inCharset: 'GB2312',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      }
    }).then((res) => {
      const data = res?.cdlist?.[0] || {}
      const result: playDetail = {
        id: data.disstid,
        userName: data.nickname,
        desc: data.desc,
        userIcon: data.headurl,
        imageUrl: data.logo,
        name: data.dissname,
        tagList: data.tags.map((t: any) => {
          return {
            name: t.name
          }
        }),
        list: data.songlist.map((e: any) => {
          return {
            id: e.songid,
            name: e.songname,
            isVip: e?.pay?.payplay === 1,
            singer: e.singer.map((s: { id: number; name: string }) => {
              return {
                id: s.id,
                name: s.name
              }
            })
          }
        })
      }
      resolve(result)
    }).catch((err) => {
      reject(err)
    })
  })
}
