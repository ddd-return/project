<template>
  <div class="login_wrap">
    <div class="login_region animate__animated animate__fadeIn">
      <div>
        <h1>电梯系统用户登录</h1>
        <h3>USER LOGIN OF SHENGDU NETWORK SYSTEM</h3>
      </div>
      <div>
        <h1 style="color: #fff">1111用户登录</h1>
        <el-form
          status-icon
          :rules="rules"
          ref="FormRef"
          :model="form"
          label-width="80px"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="form.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password v-model="form.password">
              <icon-svg slot="prefix" name="zhedie"></icon-svg>
            </el-input>
          </el-form-item>
          <div class="storage">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </div>
          <div class="submit">
            <el-button
              :loading="but_loading"
              class="submit_btn"
              type="primary"
              @click="
                Debounce(() => {
                  LoginSubit();
                })
              "
              >登录</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { postLogin, } from "@/api/login";
// import { Debounce } from '@/utils/index'
export default {
  components: {},
  data() {
    return {
      form: {
        username: process.env.NODE_ENV === "production" ? "" : "shengdu",
        password: process.env.NODE_ENV === "production" ? "" : "hzsd123456",
      },
      checked: false,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      but_loading: false,
    };
  },
  mounted() {
    this.$bus.$on("but_loading",()=>{
      if(this.but_loading) {
        this.but_loading = false
      } else {
        this.but_loading = true
      }
    })
  },
  methods: {
    LoginSubit() {
      this.$refs.FormRef.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("but_loading")
          const data = await postLogin(this.form);
          if (data.code == 0) {
            this.$store.commit('Account/Set_userName', data.data.username)
            this.$store.commit('Account/Set_isSend', data.data.isSend)
            this.$store.dispatch("Account/information").then((res) => {
              if (res) {
                this.$router.replace({ name: "welcome" }).catch( err => { err});
                // sessionStorage.setItem('token', true)

              }
            });
          } else {
            this.$message.error(data.msg);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-svg__mima {
  width: 25px;
  height: 40px;
}
.login_region .el-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-form-item {
    width: 100%;
  }
  & .el-form-item ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }
}
.v-enter-active {
  animation: move 1s;
}
.v-leave-active {
  animation: move 1s reverse;
}
@keyframes move {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translate(0);
  }
}
.animate__animated .animate__fadeInDown {
}
</style>


