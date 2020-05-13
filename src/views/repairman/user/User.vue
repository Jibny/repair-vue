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
                    prop="number"
                    label="学号"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名字"
                    width="66">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="telephone"
                    label="手机号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="gmtModified"
                    label="更新时间"
                    width="140">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
                    width="140">
            </el-table-column>
            <el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                    <!--                <template slot-scope="scope">-->
                    <!--                    <el-button @click="clickAdd()" type="text" size="small">添加</el-button>-->
                    <!--                    <el-button @click="clickUpdate(scope.row)" type="text" size="small">修改</el-button>-->
                    <!--                    <el-button @click="clickDelete(scope.row)" type="text" size="small">删除</el-button>-->
                    <!--                </template>-->
                </el-table-column>
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
        name: "User",
        methods: {

            handleClickPage(currentPage) {
                const _this = this
                axios.get('https://shmly.top/repair/user/list?pageNo=' + currentPage + '&pageSize=6').then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })
            }
        },
        created() {
            const _this = this
            axios.get('https://shmly.top/repair/user/list?pageNo=1&pageSize=6').then(function (resp) {
                _this.tableData = resp.data.result.records
                _this.total = resp.data.result.total
                console.log(resp.data)
            })
        },
        data() {
            return {
                total: null,
                tableData: null
                //     [{
                //     id: '12345',
                //     number: '16102100',
                //     name: '张三',
                //     username: 'student1',
                //     password: '123456',
                //     address: '西13',
                //     telephone: '18000001111',
                //     email: '1234567@qq.com',
                //     gmtModified: '2020-04-25 20:29:15',
                //     gmtCreate: '2020-04-24 20:29:15'
                // }, {
                //     id: '12346',
                //     number: '16102100',
                //     name: '张三',
                //     username: 'student1',
                //     password: '123456',
                //     address: '西13',
                //     telephone: '18000001111',
                //     email: '1234567@qq.com',
                //     gmtModified: '2020-04-25 20:29:15',
                //     gmtCreate: '2020-04-24 20:29:15'
                // }]
            }
        }
    }
</script>

<style scoped>

</style>