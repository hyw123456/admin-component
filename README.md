
# 前端组件库

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

引入(基础) // main.js

import HtAdmin from 'htadmin-form';

Vue.use(HtAdmin);

#### 表单：

html

`<elm-form ref="myForm" :config="config" :formConfig="{showCancelButton: false, confirmButtonText: '点击添加'}">
 </elm-form>`

js

`import * as type from "htadmin-form"; // 引入类型`

`
config: [
 new type.Input({ key: 'name', label: '名字', value: ''})
] // 准备表单格式数据......
`

**效果**

![enter image description here](http://image.zhi-you.net/1/480b8159743e45e9a7eb7533723dda55)

#### 弹窗式表单
html

` <elm-alert-form ref="alertForm" :config="config">
 </elm-alert-form>`

js

`
import {Input} from "htadmin-form";
 `

 `
 config: [ new Input({ key: 'name', label: '名字' }) ]`

 打开 表单js

 `this.$refs.alertForm.openAlert({name: '名字'}).then(   // alertForm是表单html  ref的名字  第一个参数是初始化数据对象， 第二个是配置项`

  ` ({form, close}) => {  `
      `this.$message(JSON.stringify(form));`

`close();//调用close在请求完成之后关闭 `

  `}  `

`)`

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


#### DEMO请看附件
#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
