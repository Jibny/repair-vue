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
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="encode"
                    label="地址编号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="area"
                    label="地址区域"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="dorm"
                    label="宿舍楼"
                    width="150">
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
        name: "Address",
        methods: {
            handleClickPage(currentPage) {
                const _this = this
                axios.get('https://shmly.top/repair/address/list?pageNo=' + currentPage + '&pageSize=6').then(function (resp) {
                    _this.tableData = resp.data.result.records
                    _this.total = resp.data.result.total
                    console.log(resp.data)
                })
            }
        },
        created() {
            const _this = this
            axios.get('https://shmly.top/repair/address/list?pageNo=1&pageSize=6').then(function (resp) {
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