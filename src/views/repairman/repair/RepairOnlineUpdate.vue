<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="维修人员" prop="repairmanName">
                <el-input v-model="ruleForm.repairmanName"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="repairmanTelephone">
                <el-input v-model="ruleForm.repairmanTelephone"></el-input>
            </el-form-item>
            <el-form-item label="处理时间" prop="gmtDeal">
                <el-date-picker
                        v-model="ruleForm.gmtDeal"
                        type="datetime"
                        format="yyyy-MM-dd hh:mm:ss"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即处理</el-button>
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
                                _this.$alert('报修单: '+_this.ruleForm.id+' 信息处理成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/repairman/repairOnlineDeal')
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
                _this.ruleForm.status = "正在处理"
                //console.log(resp.data)
            })
            axios.get('/repairman/queryById?id=' + sessionStorage.getItem("repairmanid")).then(function (resp) {
                _this.ruleForm.repairmanName = resp.data.result.name
                _this.ruleForm.repairmanTelephone = resp.data.result.telephone
                console.log(resp.data)
            })
        }
    }
</script>

<style scoped>

</style>