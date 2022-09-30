<template>
  <nav id="Navbar">
    <el-menu class="el-menu-demo">
      <el-menu-item>
        <icon-svg name="mima"></icon-svg>
        <a class="site-navbar__brand-lg title" href="javascript:;"
          >电梯监管与预警服务平台</a
        >
      </el-menu-item>
    </el-menu>
    <el-menu class="el-menu-demo">
      <el-menu-item >
        <el-dropdown :show-timeout="0" placement="bottom">
          <span style="color:#fff">
            <!-- <img src="~@/assets/img/avatar.png" :alt="userName"> -->
            欢迎您，
            {{ userName }}！
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="voice_disabled" @click.native="voiceSubmit() ">{{
              isSend == 1 ? "静音推送" : "有声推送"
            }}</el-dropdown-item>
            <el-dropdown-item @click.native="logoutHandle()"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
import { voiceState } from '@/api/Layout'
import { clearLoginInfo } from '@/utils/auth'
export default {
  data(){
    return {
        voice_disabled:false
    }
  },
  computed: {
    userName: {
      get() {
        return this.$store.state.Account.userName;
      },
    },
    isSend: {
      get() {
        return this.$store.state.Account.isSend;
      },
      set(val) { this.$store.commit('Account/Set_isSend', val) }
    },
  },
  created(){

  },
  methods:{
    async voiceSubmit(){
        this.isSend = JSON.parse(this.isSend) ? 0 : 1;
        await voiceState({isSend: this.isSend ? 0 : 1,username: this.userName} )
    },
    logoutHandle(){
        clearLoginInfo()
        this.$router.replace({ name: 'login' })
    }
  }
};
</script>


<style lang="scss">
</style>