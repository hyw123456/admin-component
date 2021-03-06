
# 表单的封装

#### 介绍
前端的组件库
npm:

表单: htadmin-form

#### 软件架构
软件架构说明


#### 安装教程

1. npm install htadmin-form -S
2. 需要element-ui  请   npm install element-ui -S
3. 需要jsx 如何安装移步https://github.com/vuejs/babel-plugin-transform-vue-jsx

npm 地址 https://www.npmjs.com/package/htadmin-form


#### 使用说明
在main.js中写入以下内容

``` js
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import HtAdmin from 'htadmin-form';
Vue.use(HtAdmin);
Vue.use(ElementUI);
new Vue({
   el: '#app',
   render: h => h(App)
 });
```


#### 表单：

html

ps：config是表单的各项数据类型，  formConfig是整个表单的配置例如 按钮显示隐藏
``` html
<elm-form ref="myForm" :config="config"
:formConfig="{showCancelButton: false, confirmButtonText: '点击添加'}">
</elm-form>
```

js

``` js
import * as type from "htadmin-form"; // 引入类型

config: [
 new type.Input({ key: 'name', label: '名字', value: ''})
] // 准备表单格式数据......
```


**效果**

![enter image description here](http://image.zhi-you.net/1/480b8159743e45e9a7eb7533723dda55)

#### 弹窗式表单
html

``` html
<elm-alert-form ref="alertForm" :config="config">
 </elm-alert-form>
```

js

``` js
import {Input} from "htadmin-form";

 config: [ new Input({ key: 'name', label: '名字' }) ]
```

 打开 表单js

``` js
   // 第一个参数是 初始化表单数据，可不传, 第二个参数是各种配置项
                  this.$refs.alertForm.openAlert({name: '名字'}, {
                      labelWidth: '80px',
                      closeOnClickModal: false,
                      /**
                       * 关闭之前
                       * @param action  action 的值为'confirm', 'cancel'或'close'；
                       * @param instance instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；
                       * @param done done 用于关闭 MessageBox 实例
                       * @param form form是表单的数据
                       */
                      beforeClose: function (action, instance, done, form) {
                          if (action === 'confirm') {
                              instance.confirmButtonLoading = true;
                              instance.confirmButtonText = '执行中...';
                              setTimeout(() => {
                                  done();
                                  setTimeout(() => {
                                      instance.confirmButtonLoading = false;
                                  }, 300);
                              }, 2000)
                          } else {
                              done();
                          }
                      }
                  });
```

  **效果**

![enter image description here](http://image.zhi-you.net/1/988785e5decb4a76b5c564b972037505)

**数据类型(扩展)**

| 公用配置项 | 类型 | 说明 |
| ------ | ------ | ------ |
| key |string| 必传且不能重复(表单最后输出对象的key值) |
| label | string | 表单控件左侧的标签名。如果不传则无表单格式（适用与在表单中间插入自定义模板） |
| value | all | 可以为空，初始化数据作用 |
| rules | array | 验证规则，参见 [async-validator](https://github.com/yiminghe/async-validator) |
// 特殊配置项

| 可用控件名称 | 类型 | 特殊配置项 |
| ------ | ------ | ------ |
| 输入框 | Input | inputType(input的type类型), placeholder |
| 选择框 | Select | options(可选列表-对象/字符串数组，可传一个返回数组的promise)，placeholder，labelKey(默认值:label),valueKey(默认值:value) |
| 单个日期 | SingDate | placeholder |
| Switch开关 | Switch | trueValue，falseValue （默认值:true,false） |
| 单选框 | Radio | options(字符串数组，也可以promise) |
| 复选框 | Checkbox | options(字符串数组，也可以promise),max(数字类型,最大可选),min(最小可选) |
| UploadImg | UploadImg | url(上传图片路径), max(最大数量), size(大小限制/kb) |
| 富文本 | Editor | . |
| 自定义控件 | CustomComponent | 见下文 |

......更多

**表单配置项**

表单使用  formConfig属性 传入一个对象

弹窗表单使用  openAlert函数的 第二个参数 （对象）

传入对象的配置项

| 参数 | 类型 | 说明 | 例子/默认值|
| ------ | ------ | ------ | ------ |
| label-width | string | 标签的宽度 | '120px' |
| showCancelButton | boolean | 是否显示取消按钮 | true |
| showConfirmButton | boolean | 是否显示确定按钮 | true |
| confirmButtonText | string | 确定按钮的文本 | '确定' |
| cancelButtonText | string | 取消按钮的文本 | '取消' |
| closeOnClickModal | boolean | 是否可通过点击遮罩关闭(弹窗可用)  | false |
| ... | more | 更多参考element-ui   | ... |


####  [DEMO点击这里](https://github.com/hyw123456/admin-component-demo)
