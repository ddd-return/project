<template>
  <Card>
      <div class="screen-wrapper">
        <div class="screen" id="screen">
          <div class="section">A</div>
          <div class="section">B</div>
          <div class="section">C</div>
          <div class="section">D</div>
          <div class="section">E</div>
        </div>
      </div>
  </Card>
</template>
<script>
export default {
  mounted() {
    window.addEventListener("resize",() => this.setScale() )
  },
  methods: {
    setScale() {
      let designWidth = 1920; //设计稿的宽度，根据实际项目调整
      let designHeight = 1080; //设计稿的高度，根据实际项目调整
      let scale =
        document.documentElement.clientWidth /
          document.documentElement.clientHeight <
        designWidth / designHeight
          ? document.documentElement.clientWidth / designWidth
          : document.documentElement.clientHeight / designHeight;
      document.querySelector('#screen').style.transform = `scale(${scale}) translate(-50%)`;
    },
  },
};
</script>

<style lang="scss" scope>
.box {
  width: 10rem;
  height: 10rem;
  background: #f00;
}
$design_width: 1920px;//设计稿的宽度，根据实际项目调整
$design_height: 1080px;//设计稿的高度，根据实际项目调整
.screen-wrapper {
   height: 100%;
   background-color: aqua;
   position: relative;
   .screen{
      display: inline-block;
      width: $design_width;
      height: $design_height;
      background: yellow;
      transform-origin: 0 0;
      position: absolute;
      border: 1px solid #000;
      left: 50%;
      .section{
         height: 200px;
         width: 200px;
         outline: 1px solid #ddd;
         line-height: 200px;
         font-size: 40px;
         text-align: center;
         display: inline-block;
      }
   }
}

</style>