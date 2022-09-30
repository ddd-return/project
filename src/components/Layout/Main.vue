<template>
  <main id="Main">
    <el-tabs 
      v-model="MainTabs_Ac_Name" 
      :closable="true"
      @tab-click="Routejump"
      @tab-remove="Routedeletion">
      <el-tab-pane v-for="item in MainTabs" :key="item.name" :label="item.title" :name="item.name">
          <keep-alive >
            <router-view v-if="item.name === MainTabs_Ac_Name"/>
          </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  computed: {
    MainTabs_Ac_Name: {
      get() {
        return this.$store.state.Account.MainTabs_Ac_Name;
      },
      set(val) {
        this.$store.commit("Account/Set_MainTabs_Ac_Name", val);
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
    Menus_Ac_Name: {
      get() {
        return this.$store.state.Account.Menus_Ac_Name;
      },
      set(val) {
        this.$store.commit("Account/Set_Menus_Ac_Name", val);
      },
    },
  },
  created(){

  },
  methods: {
    Routejump(menu) {
      let route = this.MainTabs.filter(
        (item) => item.name === menu.name
      );
      if (route.length >= 1) {
        this.$router.push({ name: route[0].name });
      }
    },
    Routedeletion(menu) {
      this.MainTabs = this.MainTabs.filter( item => item.name !== menu)
      if(this.MainTabs.length >= 1) {
        if(menu === this.MainTabs_Ac_Name) {
          this.$router.push(
            { name: this.MainTabs[this.MainTabs.length - 1].name },
            () => {
              // this.Menus_Ac_Name = this.$route.name;
            }
          );
        }
      } else {
        this.Menus_Ac_Name = "";
        this.$router.push({ name: "welcome" });
      }
    }
  },
};
</script>

<style lang="scss">
  #Main > .el-tabs .el-tabs__header   {
    padding: 0 55px 0 15px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
    background-color: #fff;
    position: fixed;
    top: 40px;
    right: 0;
    left: 170px;
    z-index: 10;
  }
  #Main > .el-tabs .el-tabs__content {
    padding: 0px 15px 15px;
    // min-width: 1250px;
  }
  #Main .el-tabs__nav-wrap::after {
    background-color: #fff;
    height: 0px;
  }
</style>