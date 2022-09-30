<template>
  <div>
    <!-- 搜索 -->
    <sc-Search
      :SearchConfig="SearchConfig"
      @SearchEmit="Search_butemit"
    ></sc-Search>
    <!-- 表格 -->
    <sc-Table
      v-loading="Table_Loading"
      v-bind="$attrs"
      :TableConfig="TableConfig"
      :TableData="Table_data"
      :PageApi="PageApi"
      @HandlerEmit="Table_handleremit"
    >
      <!-- 表格特殊列插槽 -->
      <template v-slot:expand="{ slotData }">
        <slot name="expand" v-bind="slotData"></slot>
      </template>
    </sc-Table>
    <!-- 分页 -->
    <sc-pagination
      ref="scPagination"
      v-bind="PaginationConfig"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </sc-pagination>

    <!-- 弹窗 新增/修改/配置 -->
    <sc-dialog
      v-bind="$attrs"
      :visible.sync="DialogShow"
      v-if="DialogShow"
      :Config="Config"
      :Api="Api"
    ></sc-dialog>
  </div>
</template>

<script>
import ScSearch from "../components/sc-Search";
import ScTable from "../components/sc-Table";
import ScDialog from "../components/sc-Dialog.vue";
import ScPagination from "../components/sc-Pagination.vue";

import utils from "../utils";

export default {
  components: {
    ScSearch,
    ScTable,
    ScDialog,
    ScPagination,
  },
  props: {
    SearchConfig: {
      type: Object,
      default: () => ({}),
    },
    TableConfig: {
      type: Object,
      default: () => ({}),
    },
    PageApi: {
      type: Object,
      default: () => ({}),
    },
    PaginationConfig: {
      type: Object,
      default: () => ({}),
    },
    AddConfig: {
      type: Object,
      default: () => ({}),
    },
    EditConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    Data_api() {
      const { data } = this.PageApi
      return data;
    },
    Edit_api() {
      const { edit } = this.PageApi;
      return edit;
    },
    Add_api() {
      const { add } = this.PageApi;
      return add;
    },
    Delete_api() {
      const { deletes } = this.PageApi;
      return deletes;
    },
  },
  data() {
    return {
      pagination: {
        page: 1,
        size: 10,
      },
      Table_data: [],
      DialogShow: false,
      Config: {},
      Api: "",
      Table_Loading: false,
    };
  },
  created() {},
  mounted() {
    this.getTable_data();
  },
  methods: {
    async getTable_data(params = { ...this.pagination }) {
      if (!this.Data_api.Interface) throw Error("未配置 data Interface");
      const Api = this.Data_api.Interface;
      this.Table_Loading = true;
      await Api(params)
        .then((data) => {
          if (data.code == 0) {
            this.Table_data = data.data.content;
            this.PaginationConfig.total = data.data.totalElements;
            this.PaginationConfig.pageSize = params.size;
            this.PaginationConfig.currentPage = params.page;
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((error) => {
          this.$message.error(error.msg);
        })
        .finally(() => {
          this.Table_Loading = false;
        });
    },

    // 操作列按钮
    Table_handleremit(data, name) {
      if (name == "edit") {
        if (!this.EditConfig.InputData) throw Error("未配置 Edit_config.data");
        if (!this.Edit_api) throw Error("未配置 edit API");
        this.Config = utils._Clone(this.EditConfig);
        this.Api = this.Edit_api;
        this.Config.InputData.forEach((e) => {
          // e.default = e.handleEdit
          //   ? e.handleEdit(data[e.prop], e.prop, data)  // 函数处理的原因？
          //   : data[e.prop];
          e.default = data[e.prop];
        });
        this.Config.Scope = data;
        this.DialogShow = true;
        return;
      }
      if (name == "delet") {
        if (!this.Delete_api.Interface) throw Error("未配置 deletes Interface");
        if (!this.Delete_api.Parameter) throw Error("未配置 deletes Parameter");
        this.Table_delete(data);
        return;
      }
    },

    // 删除
    async Table_delete(data) {
      const Api = this.Delete_api.Interface;
      let parameter = this.Delete_api.Parameter;
      let parameters = {};
      for (let i in parameter) {
        for (let e in data) {
          if (parameter[i] == e) {
            parameters[i] = data[e];
          }
        }
      }

      await Api(parameters)
      .then( data => {
        console.log(data)
        if(data.code == 0) {
          this.$message.success('操作成功')
          this.getTable_data()
        } else {
          this.$message.error(`操作失败：${data.msg}`)
        }
      } )
      .catch( error => {
        this.$message.error(`未知错误：${error.msg}，请联系管理员`)
        
      })
    },

    // 搜索列按钮
    Search_butemit(type) {
      if (type == "add") {
        if (!this.AddConfig.InputData) throw Error("未配置 Add_config.data");
        if (!this.Add_api) throw Error("未配置 add API");
        this.Config = utils._Clone(this.AddConfig);
        this.Api = this.Add_api;
      }
      this.DialogShow = true;
    },

    // 分页条数事件
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getTable_data();
    },

    // 分页页数事件
    handleCurrentChange(val) {
      this.pagination.page = val;
      this.getTable_data();
    },
  },
};
</script>