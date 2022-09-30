<template>
  <Card>
    <sc-Page 
     ref="Pageref"
     :SearchConfig ="Search_config"
     :TableConfig ="Table_config"
     :PageApi ="Page_api"
     :TableHandler ="Table_handler"
     :AddConfig ="Add_config"
     :EditConfig ="Edit_config"
     ></sc-Page>
  </Card>
</template>

<script>
import ScPage from '@/components/Table-group/index.js'
import { getTableData, postTableUpdate, postTableAdd, postTabledelete } from '@/api/system/manufacturer'

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
                placeholder: "物业公司名称",
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

      // 表格配置
      Table_config: {
        // Handler_editParams: data => ({}),
        TableColumnAttrs: [
          {
            label: "制造单位名字",
            prop: "manufacturingCorporationName",
          },
          {
            label: "制造许可证编号",
            prop: "manufacturingLicenseNumber",
          },
          {
            label: "负责人",
            prop: "principal",
          },
          {
            label: "负责人手机号",
            prop: "principalPhone",
          },
          {
            label: "办公地址",
            prop: "address",
          },
          {
            label: "备注",
            prop: "remark",
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
          mode: 'button'
        },
        {
          type: 'danger',
          name: 'delet',
          text: '删除',
          mode: 'button'
        },
      ],

      // 页面接口API
      Page_api: {  
        data: {
          Interface: getTableData,
        },
        edit: {
          Interface: postTableUpdate,
        },
        add: {
          Interface: postTableAdd,
        },
        deletes: {
          Interface: postTabledelete,
          Parameter: {corporationId:'manufacturingCorporationId'}
        }
      },

      // 新增弹窗配置
      Add_config: this.setConfig(true),
      Edit_config: this.setConfig(false),
    }
  },
  created(){
    console.log('创建')
  },
  mounted(){
    console.log('挂载')
  },
  beforeDestroy(){
    console.log('销毁')
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
            prop: "address",
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


