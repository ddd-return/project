import { getJurisdiction, getMenus, contactList } from '@/api/login'
import axios from "axios";


export default {
    namespaced: true,
    state: {
        isSend: sessionStorage.getItem('isSend') || '',
        userName: sessionStorage.getItem('userName') || '',
        Jurisdiction: sessionStorage.getItem('Jurisdiction') || null,
        Menus: sessionStorage.getItem('Menus') || null,
        Menurouting: sessionStorage.getItem('Menurouting') || null,
        MainTabs: [],
        Menus_Ac_Name: '',
        MainTabs_Ac_Name: '',
        window_height: '',
        window_width: '',

    },
    mutations: {
        SetInformation(state, parameter) {
            state.Jurisdiction = JSON.stringify(parameter.Jurisdiction)
            state.Menus = JSON.stringify(parameter.Menus)
            sessionStorage.setItem('Jurisdiction', JSON.stringify(parameter.Jurisdiction))
            sessionStorage.setItem('Menus', JSON.stringify(parameter.Menus))
            sessionStorage.setItem('token', true)
        },
        Set_isSend(state,switchs){
            sessionStorage.setItem('isSend',switchs)
            state.isSend = switchs
        },
        Set_userName(state,name){
            sessionStorage.setItem('userName',name)
            state.userName = name
        },
        Set_Menurouting(state,Menurouting) {
            sessionStorage.setItem('Menurouting',JSON.stringify(Menurouting) )
            state.Menurouting = Menurouting
        },
        Set_MainTabs(state,MainTabs) {
            state.MainTabs = MainTabs
        },
        Set_Menus_Ac_Name(state,Menus_Ac_Name) {
            state.Menus_Ac_Name = Menus_Ac_Name
        },
        Set_MainTabs_Ac_Name(state,MainTabs_Ac_Name) {
            state.MainTabs_Ac_Name = MainTabs_Ac_Name
        },
        Set_window_height(state,height){
            state.window_height = height
        },
        Set_window_width(state,width){
            state.window_width = width
        },
    },
    actions: {
        information({ commit }) {
            let promise = new Promise((resolve, reject) => {
                axios.all([getJurisdiction(), getMenus()])
                    .then(axios.spread((Jurisdiction, Menus) => {
                        if (Jurisdiction.code == 0 && Menus.code == 0) {
                            this._vm.$bus.$emit("but_loading")
                            commit('SetInformation', {
                                Jurisdiction: Jurisdiction.data,
                                Menus: Menus.data.subMenuList,
                            })
                            this._vm.$message({
                                type: 'success',
                                message: '登录成功',
                                duration: 1000,
                                onClose: () => {
                                    resolve(true)
                                }
                            })
                        } else {
                            this._vm.$bus.$emit("but_loading")
                            this._vm.$message({
                                type: 'error',
                                message: '登录失败',
                                duration: 1000,
                            })
                            reject(false)
                        }
                    })
                    )
            })
            return promise

        }
    }
}