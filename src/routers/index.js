import { createWebHistory, createRouter } from "vue-router";
import { useLoginStore } from "@/stores/loginStore";



const routes = [
    //lazy loading routes,
    {
        path: '/',
        name: 'login',
        component: import(/*webpackChunkName:"login" */'../components/SignUp.vue')
    },
    {
        path:'/signIn',
        name: 'signIn',
        component:import(/* webpackChunkName:"signIn" */'../singInWithLink/EmailLinkLogin.vue'),
        props:true
    },
    {
        path:'/forgot-password',
        name: 'forgotPassword',
        component: import(/* webpackChunkName:"forgotPassword" */'../views/ForgotPassword.vue')
    },
    {
         path:'/verify-email',
         name:'verifyEmail',
         component:import(/* webpackChunkName:"verifyEmail" */'../views/EmailVerification.vue'),
         props:true
    },
    {
        path:'/verify-emailLink',
        name:'verifyEmailLink',
        component:import(/* webpackChunkName :"verifyEmailLink" */'../singInWithLink/VerifyEmailLink.vue'),
        props:true
    },
    {
        path:'/home/',
        name: 'home',
        component: import(/* webpackChunkName:"home" */'../base/NavbarCom.vue'),
        children:[
            {
                path: "search",
                name: 'search',
                component: import(/*webpackChunkName:"home" */'../components/SearchData.vue'),
                props: true,
                children:[
                    {
                        path:'todo',
                        name:'AddTask',
                        component: import(/* webpackChunkName: "AddTask" */'../components/todo/AddTask.vue'),
                        props:true
                    },{
                        path:'delete',
                        name:'DeleteTask',
                        component:import(/* webpackChunkName : "DeleteTask" */'../components/todo/DeleteTask.vue'),
                        props:true
                    },
                    {
                        path:'upload',
                        name:'uploadFile',
                        component:import(/* webpackChunkName : "uploadFile" */'../components/todo/AddFile.vue'),
                        props:true
                    },
                    {
                        path:'download',
                        name:'downloadFile',
                        component:import(/* webpackChunkName : "downloadFile */'../components/popups/DownloadFile.vue'),
                        props:true
                    }
                ]
            },  
        ]
    }
]

const routers = createRouter({
    history: createWebHistory(),
    routes
});

routers.beforeEach((to, from, next) => {
    const store=useLoginStore();
    const isAuthenticated = store.userAuthenticated
    if (to.name === 'login' || isAuthenticated ) {
        next();
    } else {
        next('/');
    }
})

export default routers;

