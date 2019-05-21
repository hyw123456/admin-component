<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <el-input v-model="formData[itemData.key]" :type="itemData.inputType" :placeholder="itemData.placeholder" :rows="itemData.rows" :disabled="itemData.disabled"></el-input>
    </el-form-item>
</template>

<script>
    export default {
        name: "elm-input",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
       methods: {

       }
    }
</script>

<style scoped>

</style>
