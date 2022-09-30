<template>
  <div id="layout">
    <Navbar />
    <div id="content">
      <Aside />
      <Main />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Layout/Navbar.vue";
import Aside from "@/components/Layout/Aside.vue";
import Main from "@/components/Layout/Main.vue";
import { set } from 'vue';

export default {
  components: {
    Navbar,
    Aside,
    Main,
  },
  computed: {
    window_height: {
      get(){
        return this.$store.state.Account.window_height
      },
      set(val){
        this.$store.commit('Account/Set_window_height', val)
      }
    },
    window_width: {
      get(){
        return this.$store.state.Account.window_width
      },
      set(val){
        this.$store.commit('Account/Set_window_width', val)
      }
    },

  },

  mounted(){
    this.Getwindow_width_height()
  },
  methods:{
    // 监听窗口宽高
    Getwindow_width_height(){
      this.window_height = document.documentElement["clientHeight"];
      this.window_width = document.documentElement["clientWidth"];

      window.onresize = () => {
        this.window_height = document.documentElement["clientHeight"];
        this.window_width = document.documentElement["clientWidth"];

      };
    }
  }
};
</script>

<style lang="scss">
#layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#content {
  flex: 1;
  display: flex;
}
</style>

