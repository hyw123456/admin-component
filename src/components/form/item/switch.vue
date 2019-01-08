<template>
    <el-form-item :label="itemData.label">
        <el-switch v-model="formData[itemData.key]"
                   :active-value="itemData.trueValue"
                   :inactive-value="itemData.falseValue"></el-switch>
    </el-form-item>
</template>

<script>
    export default {
        name: "sSwitch",
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
