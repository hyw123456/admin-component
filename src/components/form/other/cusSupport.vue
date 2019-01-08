<script>
    /**
     * support组件的意义是   选项数据改变时候 只需要 重新渲染该部分选项即可，不需要重新渲染整个表单
     */
    export default {
        name: "cusSupport",
        props: {
            item: Object
        },
        render: function (h) {
            let com = this.$scopedSlots[this.item.name]&&this.$scopedSlots[this.item.name](this.item);
            return <div>{com||"slot名字未找到"}</div>;
        }
    }
</script>

<style scoped>

</style>
