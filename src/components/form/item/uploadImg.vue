<template>
    <el-form-item :label="itemData.label">
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
        created: function(){
            if(this.formData[this.itemData.key]&&this.formData[this.itemData.key].length){
                this.fileList = this.formData[this.itemData.key].map(i=> {
                    return {url: i,key:1}
                });
            }
        },
        data: function () {
            return {
                dialogVisible: false,
                dialogImageUrl: '',
                fileList: []
            }
        },

        methods: {
            handleAvatarSuccess: function(a, file) {
                return;
                let res = URL.createObjectURL(file.raw);
                if(this.formData[this.itemData.key] instanceof Array){
                    this.formData[this.itemData.key].push(res);
                }else{
                    this.formData[this.itemData.key] = [res];
                }

                console.log(1);
                console.log(this.fileList);
            },
            handleRemove(file, fileList) {
                this.formData[this.itemData.key] = fileList.map( i=> {
                    return i.url;
                })
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
                const res = await uploadImg(file.file, this.itemData.url);
                if(this.formData[this.itemData.key] instanceof Array){
                    this.formData[this.itemData.key].push(res);
                }else{
                    this.formData[this.itemData.key] = [res];
                }

            }

        }
    }
</script>

<style lang="scss">
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
        width: 178px;
        height: 178px;
        line-height: 178px;
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
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
