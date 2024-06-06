import { defineStore } from "pinia";



export const useSearchStore=defineStore('search',{
    state:()=>{
        return{
            suggestions:'',
            tasksData:[] ,
            taskId:Number,
        }
    },
    actions:{
        getAllSuggestions(){
            //
        }
    }
})
