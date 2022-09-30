import store from '@/store'
import router from '@/router'

import { isURL } from '@/utils/validate'

export function isAccountLoggedIn() {
  return (sessionStorage.getItem('token') !== null)
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  sessionStorage.clear();
  store.commit("resetStore");
  router.options.isAddDynamicMenuRoutes = false;
}
/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
export function Routejudgment(route, global) {
  var temp = []
  for (var i = 0; i < global.length; i++) {
    if (route.path === global[i].path) {
      return 'global'
    } else if (global[i].children && global[i].children.length >= 1) {
      temp = temp.concat(global[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}


/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
export function Dynamicmenu(mainRoutes, router, _import, routes = [] , temp) {
  const menuList = temp || JSON.parse(sessionStorage.getItem("Menus") || "[]");

  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].subMenuList && menuList[i].subMenuList.length >= 1) {
      temp = temp.concat(menuList[i].subMenuList)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].menuName,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`pages/${menuList[i].url}`) || null
        } catch (e) { }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    Dynamicmenu(mainRoutes, router, _import, routes ,temp)
  } else {
    // mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    
    router.addRoute(mainRoutes)
    router.addRoute({
      path: '*',
      redirect: '/404',
    })
    // sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    store.commit('Account/Set_Menurouting',mainRoutes.children || '[]')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

