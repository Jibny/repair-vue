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
                <el-input type="password" v-model="ruleForm.password"></el-input>
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
            <el-form-item label="验证码" >
                <div style="width: 400px;height: 50px;">
                    <div style="width: 120px;height: 50px;float:left;">
                        <el-input v-model="checkCode" placeholder="请输入验证码"></el-input>
                    </div>
                    <div style="width: 140px;height: 50px;float:left" @click="refreshCode()">
                            <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">用户注册</el-button>
                <el-button type="primary" @click="test()">返回登入</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>


<script>
    import SIdentify from "../components/SIdentify";

    export default {
        name: "UserRegister",
        components: {SIdentify},
        data() {
            return {
                checkCode: "",
                identifyCode: "",
                identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ",//随便打的
                ruleForm: {
                    id: '',
                    number: '16100100',
                    name: '学生',
                    username: 'stuTest',
                    password: '123456',
                    address: '西13',
                    telephone: '18912345678',
                    email: '123456987@qq.com',
                    gmtModified: '',
                    gmtCreate: ''
                },
                rules: {
                    number: [
                        {required: true, message: '请输入用户学号', trigger: 'blur'},
                        {pattern: /\d{6,18}/, message: '请输入6到16位数字!', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入名字', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入账号!', trigger: 'blur'},
                        {pattern: /^.{6,18}$/, message: '请输入6到18位任意字符!', trigger: ['blur', 'change']},
                    ],
                    password: [
                        {required: true, message: '请输入密码!', trigger: 'blur'},
                        {pattern: /^.{6,18}$/, message: '请输入6到18位任意字符!', trigger: ['blur', 'change']},
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
                },
            };
        },
        methods: {
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
                this.checkCode = this.identifyCode;
                //console.log(this.identifyCode)
            },
            randomNum(min, max) {
                max = max + 1
                return Math.floor(Math.random() * (max - min) + min)
            },
            // 随机生成验证码字符串
            makeCode(data, len) {
                for (let i = 0; i < len; i++) {
                    this.identifyCode += data[this.randomNum(0, data.length - 1)]
                }
            },
            test() {
                console.log(this.ruleForm)
                this.$router.push('/')
            },
            submitForm(formName) {
                if(this.identifyCode.toLowerCase()==this.checkCode.toLowerCase()){
                    const _this = this
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            axios.post('/user/add', this.ruleForm).then(function (resp) {
                                if (resp.status == '200') {
                                    _this.$alert('报修用户: ' + _this.ruleForm.name + ' 注册成功！', '消息', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            _this.$router.push('/')
                                        }
                                    })
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                }else{
                    alert("验证码错误")
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.refreshCode();
        }
    }
</script>

<style scoped>
    .get-code {
        width: 400px;
        height: 100px;
        display: inline;
        margin: 0px 0px 0px 0px;

    }
</style>