<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <el-radio-group v-model="formData[itemData.key]">
            <el-radio :label="item" :value="item[itemData.valueKey]"
                      v-for="(item,index) in itemData.options" :key="index"></el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script>
    export default {
        name: "radio",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        }
    }
</script>

