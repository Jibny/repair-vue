<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="类型编号" prop="encode">
                <el-input v-model="ruleForm.encode"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-input v-model="ruleForm.category"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
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
        name: "TypeAdd",
        data() {
            return {
                ruleForm: {
                    id: '',
                    encode:'',
                    category:'',
                    description:'',
                    gmtModified: '',
                    gmtCreate: ''
                },
                rules: {
                    encode: [
                        {required: true, message: '请输入分类编码!', trigger: 'blur'},
                        {pattern: /\d{4,16}/, message: '请输入4到16位数字!', trigger: 'blur'},
                    ],
                    category: [
                        {required: true, message: '请输入类型', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '请输入类型描述', trigger: 'blur'}
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
                        axios.post('/type/add', this.ruleForm).then(function (resp) {
                            if (resp.status == '200') {
                                _this.$alert('分类: ' + _this.ruleForm.encode + ' 添加成功！', '消息', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        _this.$router.push('/admin/type')
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