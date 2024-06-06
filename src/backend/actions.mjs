import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../firebaseConfig.mjs';

const url = import.meta.env.VITE_API_URL;
const signUp =(user)=>{
    try{
        const result=axios.post(url+'/signup',user).then((res)=>{
            return res.data
        })
        return result;
    }catch(Error){
    console.error(Error);
    }
}
const signIn=(user)=>{
    try{
        const result=axios.post(url+'/signIn',user).then((res)=>{
            return res.data
        })
        console.log(result,'red')
        return result;
    }
    catch(error){
        alert('you don`t have an account , create new account');
       return false;
    }
}

const GETALLTASKS = async()=>{
    try{
        const result = await axios.get(url+'/getAllTasks').then((res)=>{
            return res.data
            });
            return result;
    }catch(error){
        return false;
    }
}

const ADDTASK = async()=>{
    try{
        const result = await axios.post(url+'addtask').then((res)=>{
            return res.data;
        })
        return result;
    }catch(error){
        console.error(error);
    }
}

const GETTASKDETAILS = async(task)=>{
    try{
        const result = await axios.get(url+'/gettaskdetails/'+task).then((res)=>{
            return res.data
        })
        return result;
    }
    catch(error){
        console.error(error);
    }
}

const sendPasswordReset = async(email)=>{
 
    try{
        const result = await sendPasswordResetEmail(auth,email).then((res)=>{
            return res;
        })
        return result;
    }catch(error){
        console.error(error);
    }
}

export {signIn, signUp, GETALLTASKS, ADDTASK, GETTASKDETAILS, sendPasswordReset};