<template>
  <Card>
    <sc-Page
      ref="Pageref"
      :SearchConfig="Search_config"
      :TableColumn="Table_column"
      :TableConfig="Table_config"
      :PageApi="Page_api"
      :TableHandler="Table_handler"
      :AddConfig="Add_config"
      :EditConfig="Edit_config"
    >
      <!-- 表格特殊列插槽 -->
      <template v-slot:expand="slotData">
        <p>{{slotData.name}}</p>
      </template>

    </sc-Page>
  </Card>
</template>

<script>
import ScPage from '@/components/Table-group/index.js'
import { getTableData } from '@/api/jurisdiction/role.js'

export default {
  components: { ScPage },
  data(){
    return {
      // 搜索配置
      Search_config: {
        FormAttrs: {
          // Form Attributes
          inline: true,
        },
        InputData: [
          {
            prop: "name",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "角色名称",
              },
            },
            FormItemAttrs: { // Form-Item Attributes
              
            },
          },
        ],
        ButData: [
          {
            text: "查询",
            type: "search",
            Tag: {
              // tag标签属性
              attr: {
                icon: "el-icon-search",
              },
            },
          },
          {
            text: "新增",
            type: "add",
            Tag: {
              // tag标签属性
              attr: {
                type: "primary",
              },
            },
          },
        ],
      },
      
      // 表格特殊列配置
      Table_column: [
        {
           type:"index", 
        },
        {
           type:"selection", 
        },
        {
           type:"expand", 
        },

      ],
       
      // 表格配置
      Table_config: {
        // Handler_editParams: data => ({}),
        TableColumnAttrs: [
          {
            label: "角色名称",
            prop: "name",
          },
          {
            label: "备注",
            prop: "remark",
          },
          {
            label: "创建时间",
            prop: "createTime",
          },
        ],
        TableAttrs: {
          
        },
      },
      
      // 表格操作列配置
      Table_handler: [
        {
          type: 'primary',
          name: 'edit',
          text: '编辑',
          mode: 'link',
          icon: 'el-icon-delete'
        },
        {
          type: 'danger',
          name: 'dele',
          text: '删除',
          mode: 'link',
          icon: 'el-icon-edit'

        },
      ],

      // 页面接口API
      Page_api: {
        index: getTableData,
        // edit: postTableUpdate,
        // add: postTableAdd
      },

      // 新增弹窗配置
      Add_config: this.setConfig(true),
      Edit_config: this.setConfig(false),
    }
  },
  methods:{
    setConfig( isAdd = true ) {
      return {
        DialogAttrs: {
          title: `${isAdd ? '新增' : '修改'}制造厂家`,
          width: '50%',
        },
        FormAttrs: {
          // Form Attributes
          // inline: true,
          "label-width": "150px"

        },
        InputData: [
          {
            prop: "manufacturingCorporationName",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "制造厂家名称",
              },
            },
            FormItemAttrs: function() { // Form-Item Attributes
              return {
                prop: this.prop,
                label: this.Tag.attr.placeholder
              }
            },
          },
          {
            prop: "manufacturingLicenseNumber",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "制造许可证编号",
              },
            },
            FormItemAttrs: function() { // Form-Item Attributes
              return {
                prop: this.prop,
                label: this.Tag.attr.placeholder
              }
            },
          },
          {
            prop: "principal",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "负责人",
              },
            },
            FormItemAttrs: function() { // Form-Item Attributes
              return {
                prop: this.prop,
                label: this.Tag.attr.placeholder
              }
            },
          },
          {
            prop: "principalPhone",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "负责人手机号",
              },
            },
            FormItemAttrs: function() { // Form-Item Attributes
              return {
                prop: this.prop,
                label: this.Tag.attr.placeholder
              }
            },
          },
          {
            prop: "officeAddress",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "办公地址",
              },
            },
            FormItemAttrs: function() { // Form-Item Attributes
              return {
                prop: this.prop,
                label: this.Tag.attr.placeholder
              }
            },
          },
          {
            prop: "remark",
            isHide: false,
            default: "",
            Tag: {
              // tag标签属性
              attr: {
                placeholder: "备注",
              },
            },
            FormItemAttrs: function() { // Form-Item Attributes
              return {
                prop: this.prop,
                label: this.Tag.attr.placeholder
              }
            },
          }
        ],
        rules:{
          'manufacturingCorporationName.value':[
            { required: true, message: '制造厂家名称', trigger: 'blur' },
          ],
          'manufacturingLicenseNumber.value':[
            { required: true, message: '请输入制造许可证编号', trigger: 'blur' },
          ],
        }
        
      }
    }
  }
    
}
</script>