import Vue from "vue";
import axios from "axios";
import merge from 'lodash/merge'
import qs from 'qs'
import AES from './AES'


// axios 基础配置
const service = axios.create({
  withCredentials: true,
  timeout: 15000,
})

// 请求拦截
service.interceptors.request.use(config => {
    return config
})

// 响应拦截
service.interceptors.response.use(config => {
    if(config.data) {
        return config.data
    }
    return config
})


/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
 service.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    return (process.env.NODE_ENV !== 'production' && process.env.VUE_APP_OPEN_PROXY ? process.env.VUE_APP_DEVE_CROSS_DOMAIN_URL : process.env.VUE_APP_DEVE_BASE_URL) + actionName;
}


/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
 service.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        "t": new Date().getTime(),
        "type": 'develop',
        "username":AES.encrypt(sessionStorage.getItem('userName'))
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
 service.adornData = (data = {}, openDefultdata = true, contentType = 'form') => {
    var defaults = {
        't': new Date().getTime(),
        'username':AES.encrypt(sessionStorage.getItem('userName'))
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}



export default service

