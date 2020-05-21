<template>
    <div id="app">
        <el-container style="height: 800px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router :default-openeds="['4']">
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show=='repairman'">
                        <template slot="title"><i class="el-icon-menu"></i>{{item.name}}</template>
                        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                                      :class="$route.path==item2.path ? 'is-active' : '' ">{{item2.name}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="info">信息</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出登入</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>维修员</span>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'Home',
        methods: {
            info(){
                console.log("info()")
                this.$router.push('/repariman/repairman')
            },
            logout(){
                sessionStorage.removeItem("repairmanid")
                alert("退出成功,请重新登入!")
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>