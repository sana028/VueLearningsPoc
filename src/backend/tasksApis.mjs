/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
import * as express from 'express';
import { db, auth } from '../firebaseConfig.mjs';
import { collection, addDoc,getDoc, doc, arrayUnion, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';
const router = express.Router();
import { SIGNUP, SIGNIN } from './userAuthentication.mjs';
import { TASKDB, TASK_INFO_DB, SIGNUPUSER , LOGINEDUSER, NEWTASKS} from '../helpers/DB/constant.mjs';


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await SIGNUP(email, password);
    const loginedUser = collection(db, SIGNUPUSER)
    const userData = {
      email,
      password,
      signedAt: new Date(),
      userId:userCredential.user.uid
    }
    let data=null;
    const docRef=doc(db,SIGNUPUSER,userCredential.user.uid)
    if(userCredential.user){
      alert('your email is not verfied , check your mail')
     data = setDoc(docRef,userData);
     if (data) {
      res.status(200).send({userCredential,userId:data.id})
    }
    }else{
      alert('you don`t have an account , create new account');
    }
  } catch (error) {
    res.status(500).status(error);
  }
})

router.post('/signIn', async (req, res) => {
  const { email, password } = req.body;
  console.log(req,'re');
  try {
    const userCredential = await SIGNIN(email, password);
    const loginedUser =  collection(db, LOGINEDUSER)
    const userData = {
      email,
      password,
      signedAt: new Date(),
      userId:userCredential.user.uid
    }
    const docRef=doc(db,LOGINEDUSER,userCredential.user.uid)
    console.log(userCredential.user)
    if(userCredential.user.emailVerified){
    await setDoc(docRef,userData);
    }
    if(userCredential){
      res.status(200).send(userCredential)
    }
    
  } catch (error) {
    res.status(500).status(error);
  }
});

router.get('/getAllTasks', async(req, res) => {
  try{
    console.log('hit');
  const docRef = doc(db, TASKDB, NEWTASKS);
  console.log(docRef);
  const list = await getDoc(docRef);
  console.log(list.data());
  const data = (list).data();
  res.status(200).send(data);
  }catch(error){
    res.status(500).send(error);
  }
})

router.post('/addtask', async(req, res) => {
  const body = req.body;
  const {task} = body;
  console.log(task);
  try{
    const docRef = doc(db,TASK_INFO_DB, task);
    await setDoc(docRef,body);
    const updateDocRef = doc(db, TASKDB, NEWTASKS);
    await updateDoc(updateDocRef,{tasks: arrayUnion(task)});
    res.status(200).send('task added');
  }
  catch(error){
     res.status(500).send(error);
  }

})


router.get('/gettaskdetails/:task', async(req, res) => {
  const task = req.params.task;
  console.log(task,req.params)
  try{ 
    const docRef = doc(db, TASK_INFO_DB, task);
    const list = getDoc(docRef);
    const data = (await list).data();
    res.status(200).send(data);
    }catch(error){
      res.status(500).send(error);
    }
})



// eslint-disable-next-line no-undef
export default router;