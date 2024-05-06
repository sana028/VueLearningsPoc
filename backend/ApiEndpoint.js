/* eslint-disable no-unused-vars */
import express from 'express';
import {db,auth} from '../firebaseConfig.js';
import { collection,addDoc } from 'firebase/firestore';
const router=express.Router();


router.post('/registerUser',(req,res)=>{
    const body=req.body;
    const addDocument=collection(db,'signupUser');
    addDoc(addDocument,body).then(()=>{
        res.send({
            message:'User Registered Successfully'
        })
    }).catch((error)=>{
        res.send({
            message:error
        })
    });
});

router.post('/signIn',(req,res)=>{
    const body=req.body;
    const addDocument=collection(db,'signupUser');
    addDoc(addDocument,body).then(()=>{
        res.send({
            message:'logined successfully'
            })
    }).catch((error)=>{
        res.send({
            message:error
        })
    })
});

router.get('/getAllTaks',(req,res)=>{

})

router.post('/addtask',(req,res)=>{
    const body=req.body.task;

})

router.get('/suggestions/:name',(req,res)=>{
    
})

router.get('/gettaskdetails',(req,res)=>{
    
})

// eslint-disable-next-line no-undef
export default router;