import { createWebHistory, createRouter } from "vue-router";

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
                        path:'add',
                        name:'AddTask',
                        component: import(/* webpackChunkName: "AddTask" */'../components/todo/AddTask.vue'),
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

// routers.beforeEach((to, from, next) => {
//     if (to.name === 'login' && to.name) {
//         next();
//     } else {
//         return '';
//     }
// })

export default routers;

