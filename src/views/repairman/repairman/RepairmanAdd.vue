<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="学号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="名字" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="telephone">
                <el-input v-model="ruleForm.telephone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
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
        name: "UserAdd",
        data() {
            return {
                ruleForm: {
                    id: '',
                    number: '',
                    name: '',
                    username: '',
                    password: '',
                    category: '',
                    address: '',
                    telephone: '',
                    email: '',
                    gmtModified: '',
                    gmtCreate: ''
                },
                rules: {
                    number: [
                        {required: true, message: '请输入工号', trigger: 'blur'},
                        {pattern: /\d{6,18}/, message: '请输入6到16位数字!', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入密码!', trigger: 'blur'},
                        {pattern: /^.{6,18}$/, message: '请输入6到18位任意字符!', trigger: ['blur', 'change']},
                    ],
                    password: [
                        {required: true, message: '请输入密码!', trigger: 'blur'},
                        {pattern: /^.{6,18}$/, message: '请输入6到18位任意字符!', trigger: ['blur', 'change']},
                    ],
                    category: [
                        {required: true, message: '请输入分类', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请输入宿舍地址', trigger: 'blur'}
                    ],
                    telephone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur', 'change']}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
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
                        axios.post('https://shmly.top/repair/repairman/add', this.ruleForm).then(function (resp) {
                            if (resp.status == '200') {
                                _this.$alert('维修员: ' + _this.ruleForm.name + ' 添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/admin/user')
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