<template>
  <!-- 这是子组件-->
  <div class="child">
    <h2>Child的标题</h2>    
    <slot name="mySlot" v-bind:childData="childUser"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed:{
    childUser(){
      return {
        Name: "Tom", 
        Age: 23
      }
    }
  }
};
</script>