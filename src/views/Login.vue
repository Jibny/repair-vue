<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">校园宿舍报修系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text"
                          v-model="ruleForm2.username"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm2.password"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="radio">
                    <el-radio :label="1">用户</el-radio>
                    <el-radio :label="2">维修员</el-radio>
                    <el-radio :label="3">管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:40%;" @click="register()" :loading="logining">注册</el-button>
                <el-button type="primary" style="width:56%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logining: false,
                radio: 1,
                id:'',
                ruleForm2: {
                    username: '16102100',
                    password: '123456',
                },
                rules2: {
                    username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                    password: [{required: true, message: 'enter your password', trigger: 'blur'}]
                },
                checked: false
            }
        },
        methods: {
            register() {
                console.log(this.ruleForm)
                this.$router.push('/userRegister')
            },
            handleSubmit(event) {
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        const _this = this;
                        if (this.radio == 1) {
                            axios.post('/login/userLogin?username=' + this.ruleForm2.username + '&password=' + this.ruleForm2.password).then(function (resp) {
                                console.log(resp)
                                if (resp.data.code == 200) {
                                    alert("用户登入成功")
                                    sessionStorage.setItem("userid",resp.data.result.id)
                                    _this.$router.push({
                                        path: '/user/home'
                                    })
                                } else (
                                    alert(resp.data.message)
                                )
                            })
                        } else if (this.radio == 2) {
                            axios.post('/login/repairmanLogin?username=' + this.ruleForm2.username + '&password=' + this.ruleForm2.password).then(function (resp) {
                                console.log(resp)
                                if (resp.data.code == 200) {
                                    alert("维修人员登入成功")
                                    sessionStorage.setItem("repairmanid",resp.data.result.id)
                                    _this.$router.push({
                                        path: '/repairman/home',
                                    })
                                } else (
                                    alert(resp.data.message)
                                )
                            })
                        } else if (this.radio == 3){
                            axios.post('/login/adminLogin?username=' + this.ruleForm2.username + '&password=' + this.ruleForm2.password).then(function (resp) {
                                console.log(resp)
                                if (resp.data.code == 200) {
                                    alert("管理员登入成功")
                                    sessionStorage.setItem("admin","admin-nishuodedui")
                                    _this.$router.push({
                                        path: '/admin/home',
                                    })
                                } else (
                                    alert(resp.data.message)
                                )
                            })
                        }
                        // this.logining = true;
                        // if(this.ruleForm2.username === 'admin' &&
                        //     this.ruleForm2.password === '123456'){
                        //     this.logining = false;
                        //     sessionStorage.setItem('user', this.ruleForm2.username);
                        //     this.$router.push({path: '/admin/home'});
                        // }else{
                        //     this.logining = false;
                        //     this.$alert('username or password wrong!', 'info', {
                        //         confirmButtonText: 'ok'
                        //     })
                        // }
                    } else {
                        console.log('error submit!');
                        return false;
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 90%;
    }

    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }

</style>