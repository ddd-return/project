<template>
  <el-form ref="formRef" :model="Form_Model" v-bind="FormAttrs">
    <template v-for="item in InputData">
      <el-form-item :key="item.prop" >
        <form-tag
          ref="formTagRef"
          :data="item"
          :model="Form_Model[item.prop]"
        ></form-tag>
      </el-form-item>
    </template>
    <template v-for="item in ButData">
        <el-form-item :key="item.type">
            <el-button @click="But_click(item.type)" v-bind="item.Tag.attr" >{{item.text}}</el-button>
        </el-form-item>
    </template>
  </el-form>
</template> 

<script>
import formTag from "../form/formTag.vue";
export default {
  components: { formTag },
  props: {
    SearchConfig: {
      type: Object,
      required: true,
    },
  },
  computed: {
    FormAttrs() {
      return this.SearchConfig.FormAttrs;
    },
    InputData() {
      let { InputData } = this.SearchConfig;
      InputData = InputData.filter((item) => !item.isHide);
      return InputData;
    },
    ButData() {
      return this.SearchConfig.ButData;
    },
    
    Form_Model() {  // 表单绑定项
      let Model = {};
      this.InputData.forEach((e) => {
        Model[e.prop] = { value: e.default, prop: e.prop };
      });
      return Model;
    },

  },
  created() {

  },
  mounted() {

  },
  methods:{
    But_click(type) {

      this.$emit("SearchEmit",type)
    }
  }
};
</script>