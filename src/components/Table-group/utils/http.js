import Vue from 'vue'
import axios from 'axios'

class Http {
  static _http() {
    return Vue.prototype.$http
  }

  static get(url, data = {}) {
    if (!url) throw new Error('url 不能为空')
    const $http = Http._http()
    return new Promise((resolve, reject) => {
      $http({
        url: $http.adornUrl(url),
        method: 'get',
        params: data
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data && res.data.code === 0) {
              resolve(res.data)
              return
            }
          }
          reject(res.data)
        })
        .catch(reject)
    })
  }
  static post(url, data = {}, contentType = 'form') {
    if (!url) throw new Error('url 不能为空')
    const $http = Http._http()
    return new Promise((resolve, reject) => {
      $http({
        url: $http.adornUrl(url),
        method: 'POST',
        data: $http.adornData(data, true, contentType),
        headers:
          contentType === 'json'
            ? { 'Content-Type': 'application/json' }
            : {}
      })
        .then(res => {
          if (res.status === 200) {
            if (res.data && res.data.code === 0) {
              resolve(res.data)
              return
            }
          }
          reject(res.data)
        })
        .catch(reject)
    })
  }
  static axios = axios
}

export default Http
