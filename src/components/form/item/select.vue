<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <el-select v-model="formData[itemData.key]" :placeholder="itemData.placeholder"
                   :multiple="itemData.multiple"
                   :remote="itemData.remote"
                   :filterable="itemData.filterable"
                   :remote-method="remoteMethod"
                   :loading="loading"
                    @change="change"
                    @input.native="input">
            <el-option :label="typeof item==='string'?item:item[itemData.labelKey]"
                       :value="typeof item==='string'?item:item[itemData.valueKey]"
                       v-for="(item, index) in optinsList"
                       :key="index"
            ></el-option>
        </el-select>
    </el-form-item>
</template>

<script>
    export default {
        name: "elm-select",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
        watch:{
            "itemData.options":{
                handler(v){
                    this.optinsList=v
                },
                deep:true,
            },
        },
        data(){
            return{
                loading: false,
                optinsList:this.itemData.options,
            }
        },
        created(){
          if(this.itemData.multiple){
              if(!this.formData[this.itemData.key]||!Array.isArray(this.formData[this.itemData.key])){
                  this.formData[this.itemData.key]=[]
              }
          }
        },
        methods:{
            async remoteMethod(query){
                if(this.itemData.remote&&this.itemData.filterable&&typeof this.itemData.services==='function'){
                    this.loading = true;
                    let params=this.itemData.otherParams
                    if(query){
                        params=Object.assign({},params,{[this.itemData.paramQueryName]:query})
                    }
                    let res=await this.itemData.services(params)
                    if(this.itemData.resKey){
                        this.itemData.options.splice(0, this.itemData.options.length,...res[this.itemData.resKey])
                    }
                    else{
                        this.itemData.options.splice(0, this.itemData.options.length,...res)
                    }
                    this.loading=false
                }
            },
            change(val){
                if(this.itemData.changeCb && typeof this.itemData.changeCb ==='function'){
                    this.itemData.changeCb(val)
                }
            },
            //保证选中删除时，未触发remoteMethod的修复
            input(e){
                let val = e.target.value
                if(!val){
                    this.remoteMethod()
                }
            }
        }

    }
</script>

