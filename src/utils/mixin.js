// /**
//  * 防抖：事件触发后，在延迟时间内再次触发事件，讲重新计时
//  * @fn
//  * /
export default {
  data() {
    return {
      Debounce_Timeout: null,
      Throttle_Timeout: null,

    }
  },
  methods: {
    /**
     * 防抖：规定时间内只执行一次，重复触发，将重新计时
     * @param {delay} 定时时间
     * @param {func} 执行函数 
     * @returns 
     */
    Debounce(func, delay = 1000) {
      return (() => {
        const context = this
        const args = arguments
        if (context.Debounce_Timeout) {
          clearTimeout(context.Debounce_Timeout)
        }
        context.Debounce_Timeout = setTimeout(() => {
          func.apply(context, args)
          context.Debounce_Timeout = null
        }, delay)
      })()
    },

    /**
     * 节流:规定时间内只触发一次，重复触发，亦只执行一次
     * @param {delay} 定时时间
     * @param {func} 执行函数 
     * @returns 
     */
    throttle(func, delay = 1000) {
      return (() => {
        const context = this
        const args = arguments
        if (context.Throttle_Timeout) {
          return
        }
        context.Throttle_Timeout = setTimeout(() => {
          func.apply(context, args)
          context.Throttle_Timeout = null
        }, delay)

      })()
    },
    // /**
    // * 邮箱
    // * @param {*} s
    // */
    // isEmail(s) {
    //   return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
    // },

    // /**
    // * 手机号码
    // * @param {*} s
    // */
    // isMobile(s) {
    //   return /^1[0-9]{10}$/.test(s)
    // },

    // /**
    // * 电话号码
    // * @param {*} s
    // */
    // isPhone(s) {
    //   return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
    // },

    // /**
    // * URL地址
    // * @param {*} s
    // */
    // isURL(s) {
    //   return /^http[s]?:\/\/.*/.test(s)
    // },
  }
}

