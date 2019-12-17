// src/config/menuConfig.js
const menuList = [
    // {
    //     title: '首页1',
    //     key: '/home'
    // },
    {
        title: '信息修改',
        key: '/information',
        icon:"mail",
    },
    {
        title: '用户列表',
        key: '/ui/buttons',
        icon:"mail",
    },
    {
        title: '新增账号',
        key: '/add',
        icon:"mail",
    },
    {
        title: '新增试题',
        key: '/textadd',
        icon:"mail",
        children: [
            {
                title: '理论多选',
                key: '/textadd/more',
                icon:"mail",
            },
            {
                title: '理论单选',
                key: '/textadd/single',
                icon:"mail",
            },
            {
                title: '看图选择',
                key: '/textadd/seepi',
                icon:"mail",
            },
            {
                title: '判断题',
                key: '/textadd/judge',
                icon:"mail",
            },
            {
                title: '简答题',
                key: '/textadd/jianda',
                icon:"mail",
            },
            {
                title: '自选题',
                key: '/textadd/personal',
                icon:"mail",
            },
          
        ]
    },
    {
        title: '抽题规则',
        key: '/rules',
        icon:"mail",
    },

    {
        title: '试题列表',
        key: '/examlist',
        icon:"mail",
    },
    {
        title: '模拟操作',
        key: '/mncz',
        icon:"mail",
    },
    {
        title: '成绩分析',
        key: '/analysis',
        icon:"mail",
    },
    // {
    //     title: '表单',
    //     key: '/form',
    //     children: [
    //         {
    //             title: '登录',
    //             key: '/form/login',
    //         },
    //         {
    //             title: '注册',
    //             key: '/form/reg',
    //         }
    //     ]
    // },
    // {
    //     title: '表格',
    //     key: '/table',
    //     children: [
    //         {
    //             title: '基础表格',
    //             key: '/table/basic',
    //         },
    //         {
    //             title: '高级表格',
    //             key: '/table/high',
    //         }
    //     ]
    // },
    // {
    //     title: '富文本',
    //     key: '/rich'
    // },
    // {
    //     title: '城市管理',
    //     key: '/city'
    // },
    // {
    //     title: '订单管理',
    //     key: '/order',
    // },
    // {
    //     title: '员工管理',
    //     key: '/user'
    // },
    // {
    //     title: '车辆地图',
    //     key: '/bikeMap'
    // },
    // {
    //     title: '图标',
    //     key: '/charts',
    //     children: [
    //         {
    //             title: '柱形图',
    //             key: '/charts/bar'
    //         },
    //         {
    //             title: '饼图',
    //             key: '/charts/pie'
    //         },
    //         {
    //             title: '折线图',
    //             key: '/charts/line'
    //         },
    //     ]
    // },
    // {
    //     title: '权限设置',
    //     key: '/permission'
    // },
];
export default menuList;