<template>
  <el-table :data="Data_List" style="width: 100%" v-bind="TableAttrs">
    <!-- 特殊列 -->
    <template v-for=" item in TableColumn">
      <el-table-column v-if="item.type == 'expand' " :key="item.type" v-bind="item">
        <template slot-scope="props">
          <slot name="expand" v-bind:slotData="props.row"></slot>
        </template>
      </el-table-column>
      <el-table-column  v-else :key="item.type" v-bind="item">
      </el-table-column>
    </template>
    <!-- 表格内容 -->
    <template v-for="item in TableColumnAttrs">
      <el-table-column :key="item.prop" v-bind="item"></el-table-column>
    </template>
    <!-- 操作列 -->
    <el-table-column v-bind="TableHandler.Attrs">
      <template slot-scope="scope">
        <template v-for="(item, index) in TableHandler.content">
          <template v-if="item.mode == 'button'">
            <el-button
              v-bind="item"
              :key="index"
              @click="but_click(item.name,scope)"
            >
              <template v-if="item.text">{{ item.text }}</template>
            </el-button>
          </template>
          <template v-else>
            <el-link  
              :key="index"
              v-bind="item"
              @click="but_click(item.name,scope)"
            >
            {{ item.text }}
            </el-link>
          </template>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    TableConfig: {
      type: Object,
      equired: true,
    },
    TableData: {
      type: Array,
      default: () => [],
    },
    PageApi: {
      type: Object,
      default: () => {},
    }
  },
  computed: {
    TableColumnAttrs() {
      const { TableColumnAttrs } = this.TableConfig
      const DefaultAttrs = {  // 默认样式
        width: 'auto',
        align: "center",
        headerAlign: "center",
        'show-overflow-tooltip': true,
      }
      

      const Column = TableColumnAttrs.map( e => {
        return e =  Object.assign({}, DefaultAttrs, e )
      } ) 
      return Column
    },
    TableAttrs() {
      const { TableAttrs  } = this.TableConfig

      const DefaultAttrs = { // 表格默认样式
        border: true,
        style: 'winth:100% ',
        stripe: true,
        'highlight-current-row': true,
        'row-key': 'id'
      }

      const Table = Object.assign({},DefaultAttrs,  TableAttrs  )

      return Table;
    },
    TableHandler() {
      const { TableHandler = [] } = this.$attrs;

      const DefaultAttrs = { // 操作列默认样式
        label: "操作",
        width: 80,
        align: "center",
        headerAlign: "center",
      };

      const ButAttrs = { // 按钮默认默认样式
        size: 'small', 
        type: 'primary'
      }

      const LinkAttrs = { // 链接默认默认样式
        
      }

      const Handler = { content: [], Attrs: DefaultAttrs };
      if (!(TableHandler && Array.isArray(TableHandler) && TableHandler.length))
        return null;
      
      Handler.content = TableHandler.map( e => {
        const Attr = e.mode == 'button' ? ButAttrs : LinkAttrs
        return e = Object.assign({}, Attr, e )
      })
      Handler.Attrs.width = Handler.content.length * Handler.Attrs.width + 20;

      return Handler;
    },
    TableColumn() {
      const { TableColumn = [] } = this.$attrs;


      const DefaultAttrs = { // 操作列默认样式
        width: 50, 
        'header-align': 'center', 
        align: 'center'
      };

      const IndexAttrs = { // index默认样式
        label: '序号'
      }

      const SelectionAttrs = { // selection默认样式
        'reserve-selection': true
      }

      const ExpandAttrs = { // expand默认样式

      }
      const Column = TableColumn.map( e => {
        const attr = e.type === 'index' ? {...IndexAttrs,...e } : e.type === 'selection' ? {...SelectionAttrs,...e} :  {...ExpandAttrs,...e}
        return e = Object.assign({}, DefaultAttrs,  attr )
      } )



      return Column
    }

  },
  data() {
    return {
      Data_List: [],
      
    };
  },
  watch: {
    TableData(val) {
      if (val) {

        this.Data_List = val;
      }
    },
  },
  mounted() {

  },
  created() {

  },
  methods:{
    but_click(name,scope){
      if(name == 'edit' || name == 'delet') {
        return this.Handler_editevent(name,scope)
        
      } 

    },
    async Handler_editevent(name,scope){
      // const { Handler_editParams: handler } = this.tableConfig
      // 默认使用id 查询？

      // const { id } = scope.row  
      // const param = handler ? handler(scope.row) : { id }

      // const params = handler && handler(scope.row)
      
      const { Edit_api } =  this.PageApi
      if(Edit_api) {
        const {data} = await Edit_api(params)
        if(data.code == 0) {
          this.$emit('HandlerEmit',data.data,name)
        }

      } else {
        console.log(name)
        this.$emit('HandlerEmit',scope.row,name)
      }
    }
  }
};
</script>