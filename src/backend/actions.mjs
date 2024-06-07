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
    }catch(error){
        alert('You have an account already, try to login');
    console.error(error,'signUp');
    }
}
const signIn=async(user)=>{
    let result;
    try{
       await axios.post(url+'/signIn',user).then((res)=>{
            if (res.data === "your email is not verified") {
                console.log('ver');
                alert("Your email is not verified, verify your email.");
                result= false; 
            }
           result= res.data; 
        })
        .catch((error) => {
            alert('You don’t have an account, create a new account.');
            console.error(error);
            result= false;
        });
      return result;

    }
    catch(error){
        console.log('jjjj')
        alert('you don`t have an account , create new account');
        console.error(error,'signIn');
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