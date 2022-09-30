import request from '@/utils/request'

// 登录
export function postLogin(params) {
    return request({
        url: request.adornUrl('/manage/sys/user/login'),
        method: 'post',
        params: params
    })
}

// 获取权限
export function getJurisdiction() {
    return request({
        url: request.adornUrl("/manage/sys/role/queryUserNamePermission"),
        method: "get",
        params:request.adornParams()
    });
}

// 获取菜单树
export function getMenus() {
    return request({
        url: request.adornUrl("/manage/sys/menu/getMenus"),
        method: "get",
        params:request.adornParams()
    });
}

export function contactList(query) {
    return request({
      url: request.adornUrl('/elevator-contact/contactList'),
      method: 'get',
      params: request.adornParams({elevatorId:1})
    })
  }

