import { createWebHistory,createRouter, type RouteRecordRaw } from "vue-router";

const routes:Array<RouteRecordRaw>=[
    //lazy loading routes
    {path:'',
    name:'login',
    component:import(/*webpackChunkName : '' */'../components/userAuthentication/LoginPage.vue'),
    props:true,
    },
    {path:"/home" ,
    name:'home',
    component:import(/*webpackChunkName:"home" */'../components/SearchData.vue'),
   
   },
]

const routers=createRouter({
    history:createWebHistory(),
    routes
})

export default routers;

