import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    //管理员界面菜单
    {
        path: '/admin/home',
        name: '管理员菜单',
        component: () => import('../views/admin/Home'),
        show:'admin',
        redirect: '/admin/RepairOnline',
        children: [
            {
                path: '/admin/user',
                name: '用户管理',
                component: () => import('../views/admin/user/User')
            },
            {
                path: '/admin/repairman',
                name: '维修人员管理',
                component: () => import('../views/admin/repairman/Repairman')
            },
            {
                path: '/admin/repairOnline',
                name: '报修管理',
                component: () => import('../views/admin/repair/RepairOnline')
            },

            {
                path: '/admin/address',
                name: '地址管理',
                component: () => import('../views/admin/address/Address')
            },
            {
                path: '/admin/type',
                name: '分类管理',
                component: () => import('../views/admin/type/Type')
            },
        ]
    },
    {
        path: '/admin/home',
        name: '隐藏菜单',
        component: () => import('../views/admin/Home'),
        redirect: '/admin/RepairOnline',
        show:'admin-ex',
        children: [
            {
                path: '/admin/userAdd',
                name: '用户添加',
                component: () => import('../views/admin/user/UserAdd')
            },
            {
                path: '/admin/userUpdate',
                name: '用户修改',
                component: () => import('../views/admin/user/UserUpdate'),
            },
            {
                path: '/admin/repairmanAdd',
                name: '维修人员添加',
                component: () => import('../views/admin/repairman/RepairmanAdd')
            },
            {
                path: '/admin/repairmanUpdate',
                name: '维修人员修改',
                component: () => import('../views/admin/repairman/RepairmanUpdate'),
            },
            {
                path: '/admin/addressAdd',
                name: '地址添加',
                component: () => import('../views/admin/address/AddressAdd')
            },
            {
                path: '/admin/addressUpdate',
                name: '地址修改',
                component: () => import('../views/admin/address/AddressUpdate'),
            },
            {
                path: '/admin/typeAdd',
                name: '分类添加',
                component: () => import('../views/admin/type/TypeAdd')
            },
            {
                path: '/admin/typeUpdate',
                name: '分类修改',
                component: () => import('../views/admin/type/TypeUpdate'),
            },
            {
                path: '/admin/repairOnlineAdd',
                name: '报修添加',
                component: () => import('../views/admin/repair/RepairOnlineAdd')
            },
            {
                path: '/admin/repairOnlineUpdate',
                name: '报修修改',
                component: () => import('../views/admin/repair/RepairOnlineUpdate'),
            },
            {
                path: '/admin/upload',
                name: '图片上传',
                component: () => import('../components/Upload'),
            }

        ]

    },

    //用户界面菜单
    {
        path: '/user/home',
        name: '用户菜单',
        component: () => import('../views/user/Home'),
        show:'user',
        redirect: '/user/user',
        children: [
            {
                path: '/user/user',
                name: '个人中心',
                component: () => import('../views/user/user/User')
            },
            {
                path: '/user/repairOnlineAdd',
                name: '在线报修',
                component: () => import('../views/user/repair/RepairOnlineAdd')
            },
            {
                path: '/user/repairOnline',
                name: '正在申请报修',
                component: () => import('../views/user/repair/RepairOnline')
            },
            {
                path: '/user/repairOnlineAdvice',
                name: '等待处理评价',
                component: () => import('../views/user/repairadvice/RepairOnlineAdvice')
            },
            {
                path: '/user/repairOnlineHistory',
                name: '报修历史记录',
                component: () => import('../views/user/repair/RepairOnlineHistory')
            },
            {
                path: '/user/address',
                name: '报修地址查看',
                component: () => import('../views/user/address/Address')
            },
            {
                path: '/user/type',
                name: '报修分类查看',
                component: () => import('../views/user/type/Type')
            },
            {
                path: '/user/repairman',
                name: '维修人员查看',
                component: () => import('../views/user/repairman/Repairman')
            },
        ]
    },
    {
        path: '/user/home',
        name: 'user-ex',
        component: () => import('../views/user/Home'),
        redirect: '/user/RepairOnline',
        show:false,
        children: [
            {
                path: '/user/userUpdate',
                name: '用户修改',
                component: () => import('../views/user/user/UserUpdate'),
            },
            {
                path: '/user/repairOnlineUpdate',
                name: '在线报修',
                component: () => import('../views/user/repair/RepairOnlineUpdate')
            },
            {
                path: '/user/repairOnlineAdviceAdd',
                name: '报修工单评价',
                component: () => import('../views/user/repairadvice/RepairOnlineAdviceAdd')
            },
        ]

    },

    //维修员界面菜单
    {
        path: '/repairman/home',
        name: '维修员菜单',
        component: () => import('../views/repairman/Home'),
        show:'repairman',
        redirect: '/repairman/RepairOnline',
        children: [
            {
                path: '/repairman/repairman',
                name: '个人信息中心',
                component: () => import('../views/repairman/repairman/Repairman')
            },
            {
                path: '/repairman/repairOnline',
                name: '报修工单受理',
                component: () => import('../views/repairman/repair/RepairOnline')
            },
            {
                path: '/repairman/repairOnlineCategoryHistory',
                name: '维修历史记录',
                component: () => import('../views/repairman/repair/RepairOnlineCategoryHistory')
            },
            {
                path: '/repairman/address',
                name: '报修地址修改',
                component: () => import('../views/repairman/address/Address')
            },
            {
                path: '/repairman/type',
                name: '报修分类修改',
                component: () => import('../views/repairman/type/Type')
            },
            {
                path: '/repairman/user',
                name: '用户信息查看',
                component: () => import('../views/repairman/user/User')
            },
        ]
    },
    {
        path: '/repairman/home',
        name: '隐藏菜单',
        component: () => import('../views/repairman/Home'),
        redirect: '/repairman/RepairOnline',
        show:'repairman-ex',
        children: [

            {
                path: '/repairman/repairmanUpdate',
                name: '维修人员修改',
                component: () => import('../views/repairman/repairman/RepairmanUpdate'),
            },
            {
                path: '/repairman/addressAdd',
                name: '地址添加',
                component: () => import('../views/repairman/address/AddressAdd')
            },
            {
                path: '/repairman/addressUpdate',
                name: '地址修改',
                component: () => import('../views/repairman/address/AddressUpdate'),
            },
            {
                path: '/repairman/typeAdd',
                name: '分类添加',
                component: () => import('../views/repairman/type/TypeAdd')
            },
            {
                path: '/repairman/typeUpdate',
                name: '分类修改',
                component: () => import('../views/repairman/type/TypeUpdate'),
            },
            {
                path: '/repairman/repairOnlineUpdate',
                name: '报修受理',
                component: () => import('../views/repairman/repair/RepairOnlineUpdate'),
            },
        ]

    },
    {
        path: '/',
        name: '管理员菜单',
        component: () => import('../views/Login'),
    },
    {
        path: '/userRegister',
        name: '报修用户注册',
        component: () => import('../views/UserRegister'),
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
