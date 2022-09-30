<template>
    <el-submenu
      v-if="menu.subMenuList && menu.subMenuList.length >= 1"
      :index="menu.menuId + ''"
    >
      <template slot="title">
        <icon-svg
          style="width: 1.2em !important; height: 1.2em !important"
          :name="menu.icon || ''"
        ></icon-svg>
        <span>{{ menu.name || menu.menuName }}</span>
      </template>
      <AsideSubmenu
        v-for="item in menu.subMenuList"
        :key="item.menuId"
        :menu="item"
        :Menurouting="Menurouting"
      ></AsideSubmenu>
    </el-submenu>

    <el-menu-item
      v-else-if="!menu.subMenuList && menu.scope != 1 && menu.menuType != 1"
      :index="menu.menuId + ''"
      @click="Routejump(menu)"
    >
      <icon-svg :name="menu.icon || ''"></icon-svg>
      <span>{{ menu.name || menu.menuName }}</span>
    </el-menu-item>
  
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
    Menurouting: {
      type: Array,
      required: true,
    },
  },
  components: {
    AsideSubmenu: () => import("./AsideSubmenu.vue"), // 解决组件循环嵌套 webpack 的异步 import
  },
  created() {},
  methods: {
    Routejump(menu) {
      var route = this.Menurouting.filter(
        (item) => item.meta.menuId === menu.menuId
      );
      if (route.length >= 1) {
        this.$router.push({ name: route[0].name });
      }
    },
  },
};
</script>