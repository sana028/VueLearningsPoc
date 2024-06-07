/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebaseConfig.mjs'

const SIGNUP = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential;
        await sendEmailVerification(userCredential.user);
        return user;
    }
    catch (error) {
        throw new Error('Network Error : ' + error)
    }
}

const SIGNIN = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
            const user = userCredential;

            return user;
        }
    }
    catch (error) {
        alert('create new account')
        console.error(error, 'err');
    }
}



export { SIGNIN, SIGNUP }