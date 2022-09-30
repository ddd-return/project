import Vue from 'vue'
import Router from 'vue-router'
import { isAccountLoggedIn, clearLoginInfo, Routejudgment, Dynamicmenu } from '@/utils/auth'


Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

const originalPush = Router.prototype.push;
 
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
console.log(_import)
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {
    path: '/login',
    component: _import('common/login'),
    name: 'login',
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: _import('common/404'),
    name: '404',
    meta: {
      title: '404未找到'
    }
  },
  
  
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('Layout'),
  name: 'welcome',
  redirect: {
    name: 'welcome'
  },
  meta: {
    title: '主入口整体布局'
  },
  children: [
    {
      path: '/welcome',
      component: _import('pages/dashboard/welcome'),
      name: 'welcome',
      meta: {
        title: '欢迎',
        isTab: true
      }
    },
  ],
  // 在主入口页面进行登录判断
  beforeEnter(to, from, next) {
    if (!isAccountLoggedIn()) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  if (router.options.isAddDynamicMenuRoutes || Routejudgment(to, globalRoutes) === 'global') {
    next()
  } else {
    Dynamicmenu(mainRoutes, router, _import)
    router.options.isAddDynamicMenuRoutes = true
    next({
      ...to,
      replace: true
    })

  }
})





export default router


