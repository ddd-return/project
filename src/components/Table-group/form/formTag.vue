<template>
  <div>
    <el-select
      v-if="TagType == 'select'"
      v-model="Vmodel.value"
      v-bind="TagAttrs"
      clearable
    >
      <el-option
        v-for="item in Options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input v-else v-model="Vmodel.value" v-bind="TagAttrs" clearable></el-input>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      Vmodel: this.model,
    };
  },
  computed: {
    TagAttrs() {
      return this.data.Tag.attr;
    },
    Options() {
      return this.data.Tag.options && this.data.Tag.options;
    },
    TagType() {
      return this.data.tagType && this.data.tagType;
    },
  },
  watch: {
    Vmodel: {
      handler(newName, oldName) {

      },
      deep: true,
      immediate: false,
    },
  },
  created() {

  },
};
</script>