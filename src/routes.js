import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import { Loading } from 'element-ui';
// let loadingInstance1 = Loading.service({ fullscreen: true });
// import Page4 from './views/nav2/Page4.vue'
// import Page5 from './views/nav2/Page5.vue'
// import Page6 from './views/nav3/Page6.vue'
// import Table from './views/nav1/Table.vue'
// const Table = () => import('./views/nav1/Table.vue')
// const Page4 = () => import('./views/nav2/Page4.vue')
// const Page5 = () => import('./views/nav2/Page5.vue')
// const Page6 = () => import('./views/nav3/Page6.vue')
const Table = resolve => {
  Loading.service({ fullscreen: true });
  require.ensure(['./views/nav1/Table.vue'], () => {
    resolve(require('./views/nav1/Table.vue'))
    Loading.service({ fullscreen: true}).close();
  })
}
// const Table = r => require.ensure([], () => r(require('./views/nav1/Table.vue')), 'group-table')
// const Page4 = r => require.ensure([], () => r(require('./views/nav2/Page4.vue')), 'group-table')
// const Page5 = r => require.ensure([], () => r(require('./views/nav2/Page5.vue')), 'group-table')
// const Page6 = r => require.ensure([], () => r(require('./views/nav3/Page6.vue')), 'group-table')
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        // component: Login,
        component:function(resolve){
            require(['./views/Login.vue'],resolve)
        },
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '网关信息',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', 
            component: Main, name: '主页', hidden: true },
            { path: '/table', 
            component: Table, 
                // component:function(resolve){
                //     require(['./views/nav1/Table.vue'],resolve)
                // },
            name: '信息修改' },
            { path: '/form', 
            component: Form, name: 'Form' },
            { path: '/user',
             component: user, name: '信息展示以及查询' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', 
            // component: Page4, 
                component:function(resolve){
                    require(['./views/nav2/Page4.vue'],resolve)
                },
            name: '页面4' },
            { path: '/page5', 
            // component: Page5,
            component:function(resolve){
                require(['./views/nav2/Page5.vue'],resolve)
                },
             name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航三',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', 
            // component: Page6, 
            component:function(resolve){
                require(['./views/nav3/Page6.vue'],resolve)
                },
            name: '页面6' },
            { path: '/page7',
                // component: Page6,
                component:function(resolve){
                    require(['./views/nav3/Page7.vue'],resolve)
                },
                name: '页面7' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;