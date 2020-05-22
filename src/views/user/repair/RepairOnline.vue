<template>
    <div>
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
                    width="100">
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
                    prop="gmtCreate"
                    label="创建时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="160">
                <template slot-scope="scope">
<!--                    <el-button @click="clickAdd()" type="text" size="small">添加</el-button>-->
                    <el-button @click="clickUpdate(scope.row)"  type="primary" icon="el-icon-edit" circle size="small">修改</el-button>
                    <el-button @click="clickDelete(scope.row)" type="danger" icon="el-icon-delete" circle size="small">删除</el-button>
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
            clickAdd() {
                this.$router.push('/user/repairOnlineAdd')
            },
            clickUpdate(row) {
                this.$router.push({
                    path: '/user/repairOnlineUpdate',
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
                axios.get('/online/listByUserNumber?pageNo=' + currentPage + '&pageSize=6&userNumber='+this.number+'&status=申请报修').then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })
            }
        },
        created() {
            const _this = this
            axios.get('/user/queryById?id='+sessionStorage.getItem("userid")).then(function (resp) {
                _this.number = resp.data.result.number
                axios.get('/online/listByUserNumber?pageNo=1&pageSize=6&userNumber='+_this.number+'&status=申请报修').then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })
            })
        },
        data() {
            return {
                total: null,
                number:'',
                tableData:null,
                    // [{
                    //     id: '12345',
                    //     category:'',
                    //     area:'',
                    //     dorm:'',
                    //     room:'',
                    //     userNumber: '16102100',
                    //     userName: '张三',
                    //     problem:"",
                    //     image:'',
                    //     reason:'',
                    //     status:'',
                    //     repairmanName:'',
                    //     repairmanTelephone: '18000001111',
                    //     context:'',
                    //     score: '',
                    //     gmtDeal: '2020-04-26 20:29:15',
                    //     gmtModified: '2020-04-27 20:29:15',
                    //     gmtCreate: '2020-04-24 20:29:15'
                    // }, {
                    //     id: '12346',
                    //     category:'',
                    //     area:'',
                    //     dorm:'',
                    //     room:'',
                    //     userNumber: '16102100',
                    //     userName: '张三',
                    //     problem:"",
                    //     image:'',
                    //     reason:'',
                    //     status:'',
                    //     repairmanName:'',
                    //     repairmanTelephone: '18000001111',
                    //     context:'',
                    //     score: '',
                    //     gmtDeal: '2020-04-26 20:29:15',
                    //     gmtModified: '2020-04-27 20:29:15',
                    //     gmtCreate: '2020-04-24 20:29:15'
                    // }]
            }
        }
    }
</script>

<style scoped>

</style>