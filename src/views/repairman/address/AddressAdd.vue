<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="地址编号" prop="encode">
                <el-input v-model="ruleForm.encode"></el-input>
            </el-form-item>
            <el-form-item label="区域" prop="area">
                <el-input v-model="ruleForm.area"></el-input>
            </el-form-item>
            <el-form-item label="宿舍地址" prop="dorm">
                <el-input v-model="ruleForm.dorm"></el-input>
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
        name: "AddressAdd",
        data() {
            return {
                ruleForm: {
                    id: '',
                    encode:'',
                    area:'',
                    dorm:'',
                    gmtModified: '',
                    gmtCreate: ''
                },
                rules: {
                    encode: [
                        {required: true, message: '请输入地址编码!', trigger: 'blur'},
                        {pattern: /\d{4,16}/, message: '请输入4到16位数字!', trigger: 'blur'},
                    ],
                    area: [
                        {required: true, message: '请输入区域', trigger: 'blur'}
                    ],
                    dorm: [
                        {required: true, message: '请输入宿舍楼', trigger: 'blur'}
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
                        axios.post('/address/add', this.ruleForm).then(function (resp) {
                            if (resp.status == '200') {
                                _this.$alert('地址: ' + _this.ruleForm.encode + ' 添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/admin/address')
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
        }
    }
</script>

<style scoped>

</style>