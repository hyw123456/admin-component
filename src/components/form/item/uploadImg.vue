<template>
    <el-form-item :label="itemData.label">
        <div v-if="itemData.one">
           <el-upload
                   class="avatar-uploader"
                   :show-file-list="false"
                    action="https://jsonplaceholder.typicode.com/posts/"
                   :http-request="myUploadImg"
                   :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>
        </div>
        <div  v-else>
            <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :file-list="fileList"
                    :limit="itemData.max"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :http-request="myUploadImg"
                    :before-upload="beforeAvatarUpload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </el-form-item>
</template>

<script>
    import {uploadImg} from "../../../service/util";

    export default {
        name: "upload-img",
        props: {
            itemData: {
                type: Object
            },
            formData: {
                type: Object
            }
        },
        computed:{
            fileList(){
                if(this.formData[this.itemData.key]&&this.formData[this.itemData.key].length){
                    return this.formData[this.itemData.key].slice()
                }
                return []
            },
            imageUrl:{
                get(){
                    return this.formData[this.itemData.key]?this.formData[this.itemData.key].url:''
                },
                set(val){
                    //this.formData[this.itemData.key].url=val
                }
            }
        },
        created: function(){
        },
        data: function () {
            return {
                dialogVisible: false,
                dialogImageUrl: '',
               // fileList: [],
               // imageUrl:""
            }
        },
        methods: {
            handleRemove(file, fileList) {
                let current=this.formData[this.itemData.key].find(item=>item.uid===file.uid)
                if(current){
                    this.$nextTick(()=>{
                        this.formData[this.itemData.key].splice(this.formData[this.itemData.key].indexOf(current),1)
                    })
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file) {
              //  const isJPG = file.type === 'image/jpeg';
                const limitSize = this.itemData.size&&(file.size / 1024  > this.itemData.size);


                if (limitSize) {
                    this.$message.error('上传头像图片大小不能超过'+this.itemData.size+'KB!');
                }
                return  !(limitSize);
            },
            myUploadImg:async function (file) {
                const res = await uploadImg(file.file, this.itemData.url,this.itemData.fileKey);
                res.uid=file.file.uid
                if(this.itemData.one){
                    this.imageUrl = res.url
                    this.formData[this.itemData.key]=res
                }
                else{
                    if(this.formData[this.itemData.key] instanceof Array){
                        this.formData[this.itemData.key].push(res);
                    }else{
                        this.formData[this.itemData.key] = [res];
                    }
                }
             },

        }
    }
</script>

<style lang="scss" >
    .avatar-uploader .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }

    .el-upload--picture-card {
        width: 148px;
        height: 148px;
    }
</style>
<style scoped lang="scss">
    .flex {
        flex-wrap: wrap;
    }

    .imgs {
        width: 148px;
        height: 148px;
        margin-right: 10px;
        margin-bottom: 10px;
        display: block;
    }

    .avatar {
        width: 148px;
        height: 148px;
        display: block;
    }
</style>
