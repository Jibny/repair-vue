<template>
    <div>
        <el-form :inline="true" :model="ruleForm">
            <el-form-item label="报修单号" prop="id">
                <el-input v-model="ruleForm.id" size="small" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="报修分类" prop="category">
                <el-select v-model="ruleForm.category"  clearable placeholder="请选择" style="width: 120px">
                    <el-option
                            v-for="item in types"
                            :key="item.id"
                            :label="item.category"
                            :value="item.category">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户学号" prop="userNumber">
                <el-input v-model="ruleForm.userNumber" size="small" style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="报修状态" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择" style="width: 140px">
                    <el-option
                            v-for="item in status"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="维修人员" prop="repairmanName">
                <el-input v-model="ruleForm.repairmanName" size="small" style="width: 100px"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="clickSearch()">搜索</el-button>
        </el-form>

        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    fixed
                    type="index"
                    prop="id"
                    label="编号"
                    width="60">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="id"
                    label="报修单号"
                    width="180px">
            </el-table-column>
            <el-table-column
                    prop="category"
                    label="报修分类"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="area"
                    label="区域"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="dorm"
                    label="宿舍楼"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="room"
                    label="房间号"
                    width="70">
            </el-table-column>
            <el-table-column
                    prop="userNumber"
                    label="用户学号"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="userName"
                    label="用户名字"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="problem"
                    label="故障描述"
                    width="130">
            </el-table-column>
            <el-table-column align="center" prop="image" label="故障图片" width="130">
                <template scope="scope">
                    <img :src="scope.row.image" width="100" height="100"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="reason"
                    label="故障原因"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="报修状态"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="repairmanName"
                    label="维修人员"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="repairmanTelephone"
                    label="联系方式"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="context"
                    label="评价内容"
                    width="110">
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="评分"
                    width="88">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="gmtDeal"
                    label="处理时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="gmtModified"
                    label="更新时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="210">
                <template slot-scope="scope">
                    <el-button @click="clickAdd()" type="success" size="small">添加</el-button>
                    <el-button @click="clickUpdate(scope.row)" type="primary" size="small">修改</el-button>
                    <el-button @click="clickDelete(scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="6"
                :total="total"
                @current-change="handleClickPage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "RepairOnline",
        methods: {
            clickSearch(){
                console.log(this.ruleForm)
                const _this = this
                axios.post('/online/listSearch?pageNo=1&pageSize=10',_this.ruleForm).then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })

            },
            clickAdd() {
                this.$router.push('/admin/repairOnlineAdd')

            },
            clickUpdate(row) {
                this.$router.push({
                    path: '/admin/repairOnlineUpdate',
                    query: {
                        id: row.id
                    }
                })
                console.log(row);
            },
            clickDelete(row) {
                console.log(row.id)
                const _this = this
                axios.delete('/online/delete?id=' + row.id).then(function (resp) {
                    console.log(resp.data)
                    if (resp.data.code == '200') {
                        _this.$alert('报修单: ' + row.id + ' 信息删除成功！', '消息', {
                            confirmButtonText: '确定',
                            callback: action => {
                                window.location.reload()
                            }
                        })
                    }
                })


            },
            handleClickPage(currentPage) {
                const _this = this
                axios.get('/online/list?pageNo=' + currentPage + '&pageSize=10').then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })
            }
        },
        created() {
            const _this = this
            axios.get('/online/list?pageNo=1&pageSize=10').then(function (resp) {
                _this.tableData = resp.data.result.records
                _this.total = resp.data.result.total
                console.log(resp.data)
            })
            axios.get('/type/list').then(function (resp) {
                console.log(resp)
                _this.types = resp.data.result.records
                _this.types = resp.data.result.records
            })
        },
        data() {
            return {
                ruleForm: {
                    id: '',
                    category: '',
                    area: '',
                    dorm: '',
                    room: '',
                    userNumber: '',
                    userName: '',
                    problem: '',
                    image: '',
                    reason: '',
                    status: '',
                    repairmanName: '',
                    repairmanTelephone: '',
                    context: '',
                    score: '',
                    gmtDeal: '',
                    gmtModified: '',
                    gmtCreate: ''
                },
                types:[],
                status: [
                    {
                        id: '1',
                        value: '申请报修',
                    },
                    {
                        id: '2',
                        value: '正在处理',
                    },
                    {
                        id: '3',
                        value: '处理完成',
                    }],
                total: null,
                tableData:
                    [{
                        id: '12345',
                        category: '',
                        area: '',
                        dorm: '',
                        room: '',
                        userNumber: '16102100',
                        userName: '张三',
                        problem: "",
                        image: '',
                        reason: '',
                        status: '',
                        repairmanName: '',
                        repairmanTelephone: '18000001111',
                        context: '',
                        score: '',
                        gmtDeal: '2020-04-26 20:29:15',
                        gmtModified: '2020-04-27 20:29:15',
                        gmtCreate: '2020-04-24 20:29:15'
                    }, {
                        id: '12346',
                        category: '',
                        area: '',
                        dorm: '',
                        room: '',
                        userNumber: '16102100',
                        userName: '张三',
                        problem: "",
                        image: '',
                        reason: '',
                        status: '',
                        repairmanName: '',
                        repairmanTelephone: '18000001111',
                        context: '',
                        score: '',
                        gmtDeal: '2020-04-26 20:29:15',
                        gmtModified: '2020-04-27 20:29:15',
                        gmtCreate: '2020-04-24 20:29:15'
                    }]
            }
        }
    }
</script>

<style scoped>

</style>