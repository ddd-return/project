import Vue from 'vue'
import Vuex from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import Account from './modules/Account'
import Common from './modules/Common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Account,
    Common
  },
  mutations: {
    // 重置vuex本地储存状态 将缓存改为初始状态
    resetStore (state) {
      Object.keys(state).forEach((key) => {
        state[key] = cloneDeep(window.SITE_CONFIG['storeState'][key])
      })
    }
  },
})

export default store
