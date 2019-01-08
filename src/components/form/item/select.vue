<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <el-select v-model="formData[itemData.key]" :placeholder="itemData.placeholder">
            <el-option :label="typeof item==='string'?item:item[itemData.labelKey]" :value="typeof item==='string'?item:item[itemData.valueKey]" v-for="(item, index) in itemData.options" :key="index"></el-option>
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
        }
    }
</script>

