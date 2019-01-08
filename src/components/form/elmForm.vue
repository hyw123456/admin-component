<script>
    import {generateUUID} from "../../service/util";
    import {Base, CustomComponent} from "../type.js";
    import Support from './other/cusSupport';

    export default {
        name: "elmForm",
        components: {
            Support
        },
        props: {
            config: {
                type: Array
            },
            formConfig: {
                type: null,
                default: function () {
                    return {};
                }
            }
        },
        data: function () {
            return {
                formData: {},
                id: generateUUID()
            }
        },
        render: function (h) {
            this.setDefaultValue();
            let items = Array.apply(null, {length: this.config.length}).map((it, i) => {
                let props = {
                    itemData: this.config[i],
                    formData: this.formData
                }, component = '';
                if (this.config[i] instanceof Base) {
                    // 如果是定义好的组件
                    component = require('./item/' + this.config[i].type);
                    return h(component.default, {
                        props
                    });
                } else if (this.config[i] instanceof CustomComponent) {
                    // 自定义组件
                    component = this.$slots[this.config[i].name]; // 如果是简单的 静态插槽
                    if(!component){
                        // 如果是有作用域的插槽 ps 利用support组件实现内部重新渲染(在数据会改变的情况下)，不用重新渲染整个表单
                        component = [h('Support', {
                            props: {
                                item: this.config[i]
                            },
                            scopedSlots: this.$scopedSlots
                        })];
                    }
                    if (this.config[i].label) {
                        return (<el-form-item label={this.config[i].label}>
                            {component}
                        </el-form-item>)
                    } else {
                        return <div>{component}</div>;
                    }


                } else {
                    return 'error';
                }
            });
            // 添加 下方俩个 按钮  // 以后改成可由外部传入
            items.push(<el-form-item>
                {this.formConfig.showConfirmButton !== false ? <el-button type="primary"
                                                                          onClick={this.submit}>{this.formConfig.confirmButtonText || '确定'}</el-button> : ''}
                {this.formConfig.showCancelButton !== false ?
                    <el-button onClick={this.cancel}>{this.formConfig.cancelButtonText || '取消'}</el-button> : ''}
            </el-form-item>);

            // 拼接规则
            let rules = Object.assign({}, ...this.config.map(i => {
                return {[i.key]: i.rules}
            }));
            // 完成表单控件
            return (
                <el-form key={this.id} ref={this.id} label-width={this.formConfig['label-width']||'120px'} rules={rules} model={this.formData}>
                    {items}
                </el-form>)
        },
        methods: {
            submit: function (e) {

                //  console.log(this.config);
                this.$refs[this.id].validate((valid) => {
                    if (valid) {
                        this.$emit('form-submit', this.formData)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel: function () {
                this.$emit('form-cancel');
            },
            /**
             * 重设表单数据，一般父组件调用
             * @param form 外部传进来的 表单数据
             * */
            resetFormData: function (form) {
                Object.assign(this.formData, form)
            },
            /**
             * 设置默认表单数据 初始化调用
             */
            setDefaultValue: function () {
                this.formData = Object.assign({}, ...this.config.map(i => {
                    return {[i.key]: i.value}
                }));
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-form {
        padding-right: 20px;
    }
</style>
