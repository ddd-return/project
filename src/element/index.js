import Vue from 'vue'

import {
    Form, FormItem, Input, Message, Checkbox, Button, TimePicker, DatePicker, Menu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Submenu, Tabs,
    TabPane, Card, Container, Main, Select, Option, Table, TableColumn, Dialog, Link, Pagination, Loading, Upload,
} from 'element-ui';


const element = {
    install: function (Vue) {
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Input)
        Vue.use(Checkbox)
        Vue.use(Button)
        Vue.use(TimePicker)
        Vue.use(DatePicker)
        Vue.use(Menu)
        Vue.use(MenuItem)
        Vue.use(Dropdown)
        Vue.use(DropdownMenu)
        Vue.use(DropdownItem)
        Vue.use(Submenu)
        Vue.use(Tabs)
        Vue.use(TabPane)
        Vue.use(Card)
        Vue.use(Container)
        Vue.use(Main)
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Dialog)
        Vue.use(Link)
        Vue.use(Pagination)
        Vue.use(Upload)
        Vue.use(Loading.directive)

    }
}

Vue.prototype.$message = Message;

export default element
