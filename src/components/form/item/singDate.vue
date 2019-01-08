<template>
    <el-form-item :label="itemData.label" >
        <el-date-picker
                v-model="formData[itemData.key]"
                type="datetime"
                :placeholder="itemData.placeholder">
        </el-date-picker>
    </el-form-item>
</template>

<script>
    export default {
        name: "singDate",
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

<style scoped>

</style>
