/* eslint-disable no-unused-vars */
import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebaseConfig.mjs';
import { SIGNUP, SIGNIN } from "./userAuthentication.mjs";
import { doc, getDoc, setDoc, addDoc, collection, updateDoc, arrayUnion, getDocs,deleteDoc, arrayRemove } from "firebase/firestore";
import { db ,storage} from "../firebaseConfig.mjs";
import { SIGNUPUSER, LOGINEDUSER, TASKDB, TASK_INFO_DB, NEWTASKS } from "@/helpers/DB/constant.mjs";
import { onSnapshot } from "firebase/firestore";
import { uploadBytes, ref, uploadBytesResumable } from "firebase/storage";

const signUp = async (user) => {
    const { email, password } = user;
    try {
        const userCredential = await SIGNUP(email, password);
        const userData = {
            email,
            password,
            signedAt: new Date(),
            userId: userCredential.user.uid
        }
        await addDoc(collection(db, SIGNUPUSER), userData);
        alert('we have sent email to verify you email');

        return userCredential;
    } catch (error) {
        console.error(error);
    }
}
const signIn = async (user) => {
    const { email, password } = user;
    try {
        const userCredential = await SIGNIN(email, password);
        const userData = {
            email,
            password,
            signedAt: new Date(),
            userId: userCredential.user.uid
        }
        const docRef = doc(db, LOGINEDUSER, userCredential.user.uid)
        if (userCredential.user.emailVerified) {
            await setDoc(docRef, userData);
            return userCredential;
        }
        else {
            alert('your email is not verified, verify your email');
            return false;
        }

    } catch (error) {
        console.log(error);
    }
}

const GETALLTASKS = async () => {
    try {
        const docRef = collection(db, TASKDB);
        const list = await getDocs(docRef);
        console.log(list.docs[0].data());
        const data = list.docs[0].data()
        return data;
    } catch (error) {
        console.error(error);
    }
}

const ADDTASK = async (req) => {
    const body = req.body;
    const { task } = body;
    try {
        const docRef = doc(db, TASK_INFO_DB, task);
        await setDoc(docRef, body);
        const updateDocRef = doc(db, TASKDB, NEWTASKS);
        await updateDoc(updateDocRef, { tasks: arrayUnion(task) });
        alert('task created');
        return true;
    }
    catch (error) {
        console.error(error);
    }
}

const GETTASKDETAILS = async (task) => {

    try {
        const docRef = doc(db, TASK_INFO_DB, task);
        const list = getDoc(docRef);
        const data = (await list).data();
        return data;
    } catch (error) {
        console.error(error);
    }
}

const sendPasswordReset = async (email) => {

    try {
        const result = await sendPasswordResetEmail(auth, email).then((res) => {
            return res;
        })
        return result;
    } catch (error) {
        console.error(error);
    }
}

const updateTaskDetails = (taskInfo) => {

}

const deleteTask = async(taskName) => {
    const docRef = doc(db,TASK_INFO_DB,taskName);
    const updateDocRef = doc(db,TASKDB,NEWTASKS);
    try{
    await deleteDoc(docRef);
    await updateDoc(updateDocRef,{tasks:arrayRemove(taskName)});
    alert(`${taskName} is deleted `);
    return true;
    }catch(error){
        alert(error);
        return false;
    }

}



export { signIn, signUp, GETALLTASKS, ADDTASK, GETTASKDETAILS, sendPasswordReset, updateTaskDetails, deleteTask };