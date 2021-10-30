import axios, { AxiosRequestConfig } from 'axios'
import { Toast } from 'vant'
import { webViewReady } from './tools'

const axiosRequest = axios.create({
  timeout: 12000
})
axiosRequest.interceptors.response.use((response:any) => {
  // 拦截响应，做统一处理
  if (response.status === 200) {
    return Promise.resolve(response.data)
  } else {
    return Promise.reject(response)
  }
},
// 接口错误状态处理，也就是说无响应时的处理
error => {
  Toast.fail('接口异常！')
  return Promise.reject(error) // 返回接口返回的错误信息
})
export default (opt: AxiosRequestConfig): Promise<any> => {
  const { userAgent } = navigator
  const isWebview = userAgent.indexOf('EEUI_WEB') !== -1
  const eeAjax = (opt: AxiosRequestConfig): Promise<any> => {
    return new Promise((resolve, reject) => {
      webViewReady().then(eeTools => {
        const options = {
          url: `${opt.baseURL}${opt.url}`,
          method: opt.method,
          timeout: 12000,
          headers: opt.headers,
          data: {
            ...opt.params,
            ...opt.data
          }
        }
        eeTools.ajax(options, (res: any) => {
          if (res.status === 'success') {
            resolve(res.result)
          } else {
            reject(res)
          }
        })
      })
    })
  }
  if (isWebview) {
    return eeAjax(opt)
  } else {
    delete opt.headers
    return axiosRequest(opt)
  }
}
