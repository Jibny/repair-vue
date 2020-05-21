<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--            <el-form-item label="报修分类" prop="category">-->
            <!--                <el-input v-model="ruleForm.category"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="报修分类" prop="category">
                <el-select v-model="ruleForm.category"  placeholder="请选择">
                    <el-option
                            v-for="item in types"
                            :key="item.id"
                            :label="item.category"
                            :value="item.category">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域" prop="area">
                <el-input v-model="ruleForm.area" readOnly></el-input>
            </el-form-item>
            <!--            <el-form-item label="宿舍楼" prop="dorm">-->
            <!--                <el-input v-model="ruleForm.dorm"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="宿舍楼" prop="dorm">
                <el-select v-model="ruleForm.dorm" filterable placeholder="请选择">
                    <el-option
                            v-for="item in dorms"
                            :key="item.id"
                            :label="item.dorm"
                            :value="item.dorm">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="房间号" prop="room">
                <el-input v-model="ruleForm.room"></el-input>
            </el-form-item>
            <!--            <el-form-item label="用户学号" prop="userNumber">-->
            <!--                <el-input v-model="ruleForm.userNumber"></el-input>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="用户名字" prop="userName">-->
            <!--                <el-input v-model="ruleForm.userName"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="故障描述" prop="problem">
                <el-input v-model="ruleForm.problem"></el-input>
            </el-form-item>
            <el-form-item label="故障图片">
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8888/repair/upload?diyPath=images"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <!--            <el-form-item label="故障图片" prop="image">-->
            <!--                <el-input v-model="ruleForm.image"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="故障原因" prop="reason">
                <el-input v-model="ruleForm.reason"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button @click="test()">Test</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    export default {
        name: "RepairOnlineAdd",
        data() {
            return {
                types: [],
                dorms: [],
                imageUrl: '',
                ruleForm: {
                    id: '',
                    category: '',
                    area: '阳光学院',
                    dorm: '西13',
                    room: '222',
                    userNumber: '',
                    userName: '',
                    problem: '故障问题',
                    image: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2902578366,1420588776&fm=26&gp=0.jpg',
                    reason: '故障的原因',
                    status: '申请报修',
                    repairmanName: '',
                    repairmanTelephone: '',
                    context: '',
                    score: '',
                    gmtDeal: '',
                    gmtModified: '',
                    gmtCreate: ''
                },
                rules: {
                    category: [
                        {required: true, message: '请输入类型', trigger: 'blur'}
                    ],
                    area: [
                        {required: true, message: '请输入区域', trigger: 'blur'}
                    ],
                    dorm: [
                        {required: true, message: '请输入宿舍楼', trigger: 'blur'}
                    ],
                    room: [
                        {required: true, message: '请输入房间号', trigger: 'blur'}
                    ],
                    userNumber: [
                        {required: true, message: '请输入用户学号', trigger: 'blur'},
                        {pattern: /\d{6,18}/, message: '请输入6到16位数字!', trigger: 'blur'},
                    ],
                    userName: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    problem: [
                        {required: true, message: '请输入故障描述', trigger: 'blur'}
                    ],
                    image: [
                        {required: false, message: '请复制图片链接', trigger: 'blur'}
                    ],
                    reason: [
                        {required: true, message: '请输入故障原因', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请输入故障原因', trigger: 'blur'}
                    ],
                    repairmanName: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    repairmanTelephone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change']}
                    ],
                    context: [
                        {required: true, message: '请输入评价', trigger: 'blur'}
                    ],
                    score: [
                        {required: true, message: '请输入评价分数', trigger: 'blur'}
                    ],
                    gmtDeal: [
                        {required: true, message: '请输入处理时间', trigger: 'blur'}
                    ],
                    gmtModified: [
                        {required: true, message: '请输入完成时间', trigger: 'blur'}
                    ],
                }
            };
        },
        created() {
            const _this = this
            axios.get('/user/queryById?id=' + sessionStorage.getItem("userid")).then(function (resp) {
                _this.ruleForm.userNumber = resp.data.result.number
                _this.ruleForm.userName = resp.data.result.name
            })
            axios.get('/type/list').then(function (resp) {
                console.log(resp)
                _this.types = resp.data.result.records
                _this.types = resp.data.result.records
            })
            axios.get('/address/list?pageNo=1&pageSize=22').then(function (resp) {
                console.log(resp)
                _this.dorms = resp.data.result.records
                _this.dorms = resp.data.result.records
            })
        },
        methods: {
            test() {
                console.log(this.ruleForm)
            },
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('/online/add', this.ruleForm).then(function (resp) {
                            if (resp.status == '200') {
                                _this.$alert('用户: ' + _this.ruleForm.userName + ' 报修单申请成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/user/repairOnline')
                                    }
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                console.log(res)
                this.imageUrl = URL.createObjectURL(file.raw);
                this.ruleForm.image = "http://localhost:8888/repair/" + res.message
                console.log(this.ruleForm.image)
                //this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isIMG = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isIMG) {
                    this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isIMG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>