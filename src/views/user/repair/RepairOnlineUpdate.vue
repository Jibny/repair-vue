<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="报修分类" prop="category">
                    <el-input v-model="ruleForm.category"></el-input>
                </el-form-item>
                <el-form-item label="区域" prop="area">
                    <el-input v-model="ruleForm.area" readOnly></el-input>
                </el-form-item>
                <el-form-item label="宿舍楼" prop="dorm">
                    <el-input v-model="ruleForm.dorm"></el-input>
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
                <el-form-item label="故障图片" prop="image">
                    <el-input v-model="ruleForm.image"></el-input>
                </el-form-item>
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
        name: "RepairOnlineUpdate",
        data() {
            return {
                ruleForm: {
                    id: '',
                    category:'',
                    area:'',
                    dorm:'',
                    room:'',
                    userNumber: '',
                    userName: '',
                    problem:"",
                    image:'',
                    reason:'',
                    status:'',
                    repairmanName:'',
                    repairmanTelephone: '',
                    context:'',
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
                        {required: true, message: '请输入宿舍楼', trigger: 'blur'}
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
                    gmtCreate: [
                        {required: true, message: '请输入申请时间', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            test() {
                console.log(this.ruleForm)
            },
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.put('/online/edit', this.ruleForm).then(function (resp) {
                            if(resp.status == '200'){
                                _this.$alert('报修单: '+_this.ruleForm.id+' 信息修改成功！', '消息', {
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
            }
        },
        created() {
            //alert(this.$route.query.id)
            const _this = this;
            axios.get('/online/queryById?id=' + this.$route.query.id).then(function (resp) {
                _this.ruleForm = resp.data.result
                console.log(resp.data)
            })

        }
    }
</script>

<style scoped>

</style>