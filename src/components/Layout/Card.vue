<template>
  <el-card
    class="box-card"
    shadow="always"
    :body-style="siteContentViewHeight('card')"
  >
    <el-container
      style="border: 1px solid #eee"
      :style="siteContentViewHeight('container')"
    >
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import { isURL } from "@/utils/validate";
export default {
  computed: {
    window_height: {
      get() {
        return this.$store.state.Account.window_height;
      },
    },
    window_width: {
      get() {
        return this.$store.state.Account.window_width;
      },
    },
  },
  methods: {
    siteContentViewHeight(layout) {

      var height =
        layout == "card"
          ? this.window_height - 40 - 40 - 32 
          : this.window_height - 40 - 40 - 32 - 43;
      if (this.$route.meta.isTab) {
        return isURL(this.$route.meta.iframeUrl)
          ? { height: height + "px" }
          : { minHeight: height + "px" };
      }
      return { minHeight: height + "px" };
    },
  },
};
</script>