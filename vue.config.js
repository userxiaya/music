module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // 输出文件目录
  outputDir: 'dist',
  devServer: {
    port: '8080',
    proxy: {
      '/c.y.qq.com': {
        target: 'https://c.y.qq.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/c.y.qq.com': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com'
        }
      },
      '/u.y.qq.com': {
        target: 'https://u.y.qq.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/u.y.qq.com': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com'
        }
      },
      '/i.y.qq.com': {
        target: 'https://i.y.qq.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/i.y.qq.com': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'https://y.qq.com/',
          origin: 'https://y.qq.com'
        }
      },
      '/qpic.y.qq.com': {
        target: 'http://qpic.y.qq.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/qpic.y.qq.com': ''
        }
      },
      '/p1.music.126.net': {
        target: 'http://p1.music.126.net',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/p1.music.126.net': ''
        }
      },
      '/music.163.com': {
        target: 'https://music.163.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/music.163.com': ''
        },
        headers: {
          referer: 'https://music.163.com/',
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent': 'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }
      },
      '/m.kugou.com': {
        target: 'http://m.kugou.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/m.kugou.com': ''
        },
        headers: {
          referer: 'http://m.kugou.com',
          'content-type': 'application/x-www-form-urlencoded',
          'user-agent':
            'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36'
        }
      },
      '/imge.kugou.com': {
        target: 'http://imge.kugou.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/imge.kugou.com': ''
        }
      },
      '/c1.kgimg.com': {
        target: 'http://c1.kgimg.com',
        // 此处target的意义在于：造成跨域是因为访
        secure: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/c1.kgimg.com': ''
        }
      }
    }
  }
}
