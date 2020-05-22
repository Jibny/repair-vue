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
                    width="90">
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
                    prop="password"
                    label="密码"
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
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="gmtModified"
                    label="更新时间"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
                    width="160">
            </el-table-column>
            <el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <el-button @click="clickUpdate(scope.row)" type="primary" icon="el-icon-edit" circle size="small">修改</el-button>
                </template>
            </el-table-column>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="6"
                :total="6">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "User",
        methods: {
            clickUpdate(row) {
                this.$router.push({
                    path: '/user/userUpdate',
                    query: {
                        id: row.id
                    }
                })
                console.log(row);
            },
        },
        created() {
            const _this = this
            axios.get('/user/listById?id='+sessionStorage.getItem("userid")).then(function (resp) {
                _this.tableData = resp.data.result.records
                console.log(resp.data)
            })
        },
        data() {
            return {
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