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
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="gmtCreate"
                    label="创建时间"
                    width="160">
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
        name: "Repairman",
        methods: {
            handleClickPage(currentPage) {
                const _this = this
                axios.get('https://shmly.top/repair/repairman/list?pageNo=' + currentPage + '&pageSize=6').then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })
            }
        },
        created() {
            const _this = this
            axios.get('https://shmly.top/repair/repairman/list?pageNo=1&pageSize=6').then(function (resp) {
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