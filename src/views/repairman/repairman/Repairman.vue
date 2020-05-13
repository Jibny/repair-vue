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
                    label="工号"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名字"
                    width="80">
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
                    prop="category"
                    label="分类"
                    width="80">
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
                    <template slot-scope="scope">
                        <el-button @click="clickUpdate(scope.row)" type="text" size="small">修改</el-button>
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
        name: "Repairman",
        methods: {
            clickUpdate(row) {
                this.$router.push({
                    path: '/repairman/repairmanUpdate',
                    query: {
                        id: row.id
                    }
                })
                console.log(row);
            },
        },
        created() {
            const _this = this
            axios.get('https://shmly.top/repair/repairman/listById?id='+sessionStorage.getItem("repairmanid")).then(function (resp) {
                _this.tableData = resp.data.result.records
                _this.total = resp.data.result.total
                console.log(resp.data)
            })
        },
        data() {
            return {
                total: null,
                tableData: null
            }
        }
    }
</script>

<style scoped>

</style>