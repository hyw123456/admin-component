<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
     <div>
         <p>表单项 输入数据{{formData[itemData.key]}}</p>
         <button @click.prevent="change(1)">数据改变</button>
     </div>
    </el-form-item>
</template>

<script>
    export default {
        name: "test",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
        methods: {
            /**
             * 数据被改变了， 用户修改，或者其他修改
             */
            change: function (newValue) {
                this.formData[this.itemData.key] += newValue;
            }
        }
    }
</script>

<style scoped>

</style>
