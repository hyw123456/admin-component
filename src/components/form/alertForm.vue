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
                resolve: null,
                reject: null,
                id: ''
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
                return new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                    this.$msgbox({
                        title: '',
                        message: (<elm-form ref={this.id} key={this.id} formConfig={config} config={this.config} labelWidth={config.labelWidth || '80px'}
                                            on-form-submit={this.submit} on-form-cancel={this.cancel} scopedSlots={this.$scopedSlots}>{slots}</elm-form>),

                        confirmButtonText: '确定',
                        cancelButtonText: '取消',

                        beforeClose: (action, instance, done) => {
                            done();
                            this.reject();
                        },
                        closeOnClickModal: false,
                        ...config,
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    if (init) {
                        this.$nextTick(() => {
                            this.$refs[this.id].resetFormData(init);
                        })
                    }

                })


            },
            submit: function (e) {
                console.log(this.$refs[this.id]);
                this.resolve({
                    form: e,
                    close: this.$msgbox.close
                });
            },
            cancel: function () {
                this.reject();
                this.$msgbox.close()
            }
        }
    }
</script>

<style scoped>

</style>
