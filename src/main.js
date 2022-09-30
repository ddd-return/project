import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/scss/index.scss'
import 'element-ui/lib/theme-chalk/index.css'; // 引入 element 样式
import '@/icons'
import 'animate.css';
// import '@/element-ui-theme'
import cloneDeep from 'lodash/cloneDeep'
import mixins from '@/utils/mixin'
import Card from '@/components/Layout/Card'
// import ElementUI from 'element-ui';




import element from './element/index.js' 
Vue.use(element)
Vue.mixin(mixins)
Vue.component("Card", Card)
// Vue.use(ElementUI);


Vue.config.productionTip = false
// 挂载全局
Vue.prototype.$axios = axios // axios请求方式
Vue.prototype.$bus = new Vue();




// 保存整站vuex本地储存初始状态 
window.SITE_CONFIG = {}
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
