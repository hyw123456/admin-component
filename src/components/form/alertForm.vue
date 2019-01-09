<template>
    <div></div>
</template>

<script>
    import {generateUUID} from "../../service/util";
    import ElmForm from './elmForm'

    export default {
        name: "alertForm",
        components: {
            'elm-form': ElmForm
        },
        props: {
            config: {
                type: Array
            }
        },
        data: function () {
            return {
                id: '',
                handles: {},
                beforeClose: null
            }
        },
        methods: {
            openAlert: function (init, config = {}) {

                // console.log(this.$slots);
                this.id = generateUUID();
                const h = this.$createElement;
                let slots = [];
                for (let i in this.$slots) {
                    slots.push(h('template', {
                        slot: i
                    }, this.$slots[i]))
                }
                let formConfig = {...config, showConfirmButton: false, showCancelButton: false};
                let self = this;
                this.beforeClose = config.beforeClose;
                let all = function (action, instance, done) {
                    self.handles = {
                        action, instance, done
                    }
                    if (action === 'confirm') {
                        self.$refs[self.id].submit();
                    } else {
                        self.$refs[self.id].cancel();
                    }
                };
                config.beforeClose = all;
                this.$msgbox({
                    title: '',
                    message: (<elm-form ref={this.id} key={this.id} formConfig={formConfig} config={this.config}
                labelWidth={config.labelWidth || '80px'}
                on-form-submit={this.submit} on-form-cancel={this.cancel}
                scopedSlots={this.$scopedSlots}>{slots}</elm-form>),

                confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    showCancelButton: true,
            ...config,
            });
                if (init) {
                    this.$nextTick(() => {
                        this.$refs[this.id].resetFormData(init);
                    })
                }


            },
            submit: function (e) {
                this.beforeClose && this.beforeClose(this.handles.action,this.handles.instance, this.handles.done, e);
                this.handles = null;
            },
            cancel: function () {
                if(this.beforeClose){
                    this.beforeClose(this.handles.action,this.handles.instance, this.handles.done);
                }else{
                    this.handles.done();
                }
                this.handles = null;
            }
        }
    }
</script>

<style scoped>

</style>
