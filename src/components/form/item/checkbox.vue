<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <el-checkbox-group v-model="formData[itemData.key]" :max="itemData.max" :min="itemData.min">
            <el-checkbox :label="item" v-for="item in itemData.options" :key="item"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>
</template>

<script>
    // 未完成
    export default {
        name: "elm-checkbox",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
    }
</script>

<style scoped>

</style>
