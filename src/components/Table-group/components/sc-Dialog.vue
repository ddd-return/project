<template>
  <el-dialog
    ref="dialog"
    v-bind="DialogAttrs"
    :visible.sync="dialogVisible"
  >
    <el-form
        ref="formRef"
        :model="Form_Model"
        v-bind="FormAttrs"
        :rules="Form_rules"
    >
        <template v-for="item in InputData">
            <el-form-item 
                :prop="`${item.prop}.value`"
                v-bind="item.FormItemAttrs()"
                :key="item.prop">
                <Form-tag
                    ref="formTagRef"
                    :data="item"
                    :model="Form_Model[item.prop]"
                ></Form-tag>
            </el-form-item>
        </template>
    </el-form>


    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="Dialog_butSubmit()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import FormTag from '../form/formTag.vue'
  export default {
    components:{
        FormTag
    },
    props:{
        visible: {
            type: Boolean,
            default: false
        },
        Config: {
            type:Object,
            default: () => ({}),
        },
        Api: Function,

    },
    computed:{
        DialogAttrs(){
            const { DialogAttrs } = this.Config
            const defaultAttrs = {
                width: '80%',
                "status-icon": true
            }

            const Dialog = Object.assign({}, defaultAttrs, DialogAttrs,  )

            return Dialog
        },
        FormAttrs(){
            const { FormAttrs } = this.Config
            const defaultAttrs = {
                "status-icon": true
            }
            const Form = Object.assign({}, defaultAttrs, FormAttrs,  )

            return Form
        },
        InputData(){
            const { InputData } = this.Config
            return InputData
        },
        Form_Model() {  // 表单绑定项
            const { Scope } = this.Config
            const Model = {};

            Object.keys(Scope).forEach(e => {
                Model[e] = {value:Scope[e],prop:e }
                
            })

            return Model
        },
        Form_rules(){
            const { rules } = this.Config
            return rules
        }


    },
    data() {
      return {
        dialogVisible: this.visible
      };
    },
    watch:{
        dialogVisible(val){
          this.$emit('update:visible', val)
        }
    },
    created(){

    },
    methods: {
        Dialog_butSubmit(){
            this.$refs.formRef.validate( async valid => {
                if (valid) {

                    this.Form_submit()
                    return true
                } 
                return false
                
            })
        },
        async Form_submit(){
            const Form_data = {}
            console.log(this.Form_Model)
            Object.keys(this.Form_Model).forEach( e => {
                const object = this.Form_Model[e] 
                Form_data[e] = object.handle ? object.handle(object.value, e) : object.value
            } )
            await this.Api(Form_data)
            .then( (data) => {
                if(data.code == 0) {
                   this.$message.success('操作成功')
                   this.dialogVisible = false
                } else {
                    this.$message.error(`操作失败：${data.msg}`)
                }
            })
            .catch( error => {
                this.$message.error(`未知错误：${error.msg}，请联系管理员`)
            })
            
        }
    }
  };
</script>