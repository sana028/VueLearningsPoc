import { defineStore } from "pinia";
import { useSessionStorage } from '@vueuse/core';

export const useLoginStore = defineStore({
    id:'loginStore',
    state :(()=>{
        return{
           userId:useSessionStorage('userId',''),
           userName: useSessionStorage('userName',''),
           userEmail : useSessionStorage('userEmail',''),
           userAuthenticated:useSessionStorage('userAuthenticated',false),
        }
    }),
    getters:{
        getUserId(state){
            return state.userId
        }
    },
    actions:{
        setUserId(userId){
            this.userId = userId;
        }
    }
});

