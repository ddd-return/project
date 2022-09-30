<template>
  <aside id="Aside">
    <div class="scroll">
      <el-menu
        :default-active="Menus_Ac_Name || 'welcome'"
        :collapseTransition="false"
      >
        <AsideSubmenu
          v-for="menu in Menus"
          :key="menu.menuId"
          :menu="menu"
          :Menurouting="Menurouting"
        ></AsideSubmenu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
import AsideSubmenu from "./AsideSubmenu.vue";
import { isURL } from "@/utils/validate";

export default {
  components: {
    AsideSubmenu,
  },
  computed: {
    Menus: {
      get() {
        return JSON.parse(this.$store.state.Account.Menus);
      },
    },
    Menus_Ac_Name: {
      get() {
        return this.$store.state.Account.Menus_Ac_Name;
      },
      set(val) {
        this.$store.commit("Account/Set_Menus_Ac_Name", val);
      },
    },
    Menurouting: {
      get() {
        return this.$store.state.Account.Menurouting;
      },
    },
    MainTabs: {
      get() {
        return this.$store.state.Account.MainTabs;
      },
      set(val) {
        this.$store.commit("Account/Set_MainTabs", val);
      },
    },
    MainTabs_Ac_Name: {
      get() {
        return this.$store.state.Account.MainTabs_Ac_Name;
      },
      set(val) {
        this.$store.commit("Account/Set_MainTabs_Ac_Name",val)
      }
    }
  },
  watch: {
    $route: "routeHandle",
  },
  created() {
    this.routeHandle(this.$route);
  },
  methods: {
    // 监听路由 存储激活菜单的 index 存储标签页 数组 当前标签页 name
    routeHandle(route) {
      if (route.meta.isTab) {  //1.判断是否会被可被标签页记录
        //2.判断是否已被标签页记录
        let tab = this.MainTabs.filter((item) => item.name === route.name)[0];
        if (!tab) {
            //3.获取当前标签页信息
          if (route.meta.isDynamic) {
            route = this.Menurouting.filter(
              (item) => item.name === route.name
            )[0];
            if (!route) {
              return console.error("未能找到可用标签页!");
            }
          }
          tab = {
            menuId: route.meta.menuId || route.name,
            name: route.name,
            title: route.meta.title,
            type: isURL(route.meta.iframeUrl) ? "iframe" : "module",
            iframeUrl: route.meta.iframeUrl || "",
          };
          //4.进行路由 标签页存储
          this.MainTabs = this.MainTabs.concat(tab);
        }
        this.Menus_Ac_Name = tab.menuId + "";
        this.MainTabs_Ac_Name = tab.name;
      }
    },
  },
};
</script>

<style lang="scss">
#Aside .scroll > .el-menu {
  background-color: transparent;
}
.el-menu .el-menu-item,
.el-menu .el-submenu .el-submenu__title {
  color: #8a979e;
}
.el-menu .el-submenu.is-active .el-submenu__title {
  color: #e8eaec;
}
.el-menu .el-menu .el-menu-item {
  min-width: 160px;
  padding: 0px 0px 0px 30px !important;
}
.el-menu .el-submenu.is-opened > .el-submenu__title,
.el-menu .el-menu {
  background-color: #080808;
}
.el-menu .el-menu-item:hover,
.el-menu .el-submenu > .el-submenu__title:hover {
  color: #c5cbcf;
  background-color: #2b373d;
}
.el-menu .el-menu-item:focus {
  background-color: #2b373d;
}
.el-menu .el-menu-item.is-active {
  color: #e8eaec;
}
</style>
