/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import axios from "axios";

const SIGNUP=async(email,password)=>{
    try{
        const userCredential=await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        const result=await axios.post('http://localhost:3600/api/registerUser',user).then((res)=>{
            return res.data;
        })
    }
    catch(error){
           console.error('Network Error : '+error);
    }
}

const SIGNIN=async(email,password)=>{
    try{
        const userCredential=await signInWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        user.signInAt=new Date();
        const result = await axios.post('http://localhost:3600/api/signIn',user).then((res)=>{
            return res.data;
        })
    }
    catch(error){
        console.log(error);
    }
}

export default {SIGNIN,SIGNUP}