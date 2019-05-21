<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <el-cascader
                :expand-trigger="itemData.expandTrigger"
                :show-all-levels="itemData.showAllLevels"
                :change-on-select="itemData.changeOnSelect"
                @active-item-change="activeItemChange"
                :filterable="itemData.filterable"
                :props="itemData.props"
                :placeholder="itemData.placeholder"
                :options="itemData.remote?options:itemData.options"
                v-model="value">
        </el-cascader>
    </el-form-item>
</template>

<script>
    export default {
        name: "elm-cascader",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
        data(){
            return {
                options:[],//绑定数据
                expandOptions:{},//保存每一项信息，包括其子集
                isInit:false,
            }
        },
        computed:{
            value:{
                get(){
                    return this.formData[this.itemData.key]
                },
                set(val){
                    this.formData[this.itemData.key]=val
                }
            },
        },
        watch:{
            value: {
                async handler(val){
                    if(this.itemData.remote&&val&&val.length){
                        this.init()
                    }
                },
                // deep:true,
                //immediate:true,
            }
        },
        created(){
            if(this.itemData.remote){
                this.init()
            }
            // if(this.itemData.remote&&this.itemData.options){
            //     this.options=this.itemData.options
            //     this.expandOptionsSet(undefined,this.options)
            // }
        },
        methods:{
            async init(){
                if((!this.options||this.options.length==0)&&!this.isInit){
                    this.isInit=true
                    // this.options = await Promise.resolve([{label:'食品',value:0,children:[]}, {label:'家具',value:1},{label:'服装',value:2}]);
                    this.options = await this.itemData.services();
                    this.expandOptionsSet(undefined,this.options)
                }
                if(this.value&&this.value.length>1){
                    for(let i=0;i<this.value.length-1;i++){
                        await this.activeItemChange([this.value[i]])//获取其子集
                    }
                }
            },
            async  activeItemChange(ary){//当父级选项变化时触发的事件，仅在 change-on-select(是否允许选择任意一级的选项) 为 false 时可用
                if(!this.itemData.remote)
                    return
                let val=ary[ary.length-1]
                if(this.expandOptions[val]&&this.expandOptions[val].children&&!this.expandOptions[val].children.length){
                    //let res = await Promise.resolve([{label:'饺子',value:10}, {label:'土豆',value:11},{label:'青菜',value:12}]);
                    let res =await  this.itemData.services({[this.itemData.servicesParamsKey]:val});
                    this.expandOptionsSet(val,res)
                }
            },
            expandOptionsSet(id,data){
                let props=this.itemData.props
                if(id===undefined){//第一级目录
                    data.forEach(item=>{
                        let value=item[props.value]
                        if(item[this.itemData.hasChildrenKey]){
                            this.$set(item,props.children,[])
                        }
                        if(!(value in this.expandOptions)) {
                            this.$set(this.expandOptions,value,item)
                        }
                    })
                    return
                }
                if(id in this.expandOptions && (!this.expandOptions[id][props.children]||!this.expandOptions[id][props.children].length)){
                    this.expandOptions[id][props.children]=data
                    data.forEach(item=>{
                        let value=item[props.value]
                        if(item[this.itemData.hasChildrenKey]){
                            this.$set(item,props.children,[])
                            //item[props.children]= []
                        }
                        if(!(value in this.expandOptions)) {
                            this.$set(this.expandOptions,value,item)
                            //this.expandOptions[value]=item
                        }
                    })
                }
            }
        }
    }
</script>

