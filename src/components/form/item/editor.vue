<template>
    <el-form-item :label="itemData.label" :prop="itemData.key">
        <vue-editor v-model="formData[itemData.key]"></vue-editor>
    </el-form-item>
</template>

<script>
    import {generateUUID} from "../../../service/util";
    import { VueEditor } from "vue2-editor";
    export default {
        name: "editor",
        components: {
            VueEditor
        },
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
        data: function () {
            return {
                id: generateUUID()
            }
        },
        mounted: function () {

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
