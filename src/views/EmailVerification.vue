<template>
    <v-container>
        <v-card style="padding: 20px">
            <v-card-title class="title-style">Email Verification</v-card-title>
            <v-card-text class="card-text">
                We have sent a email verification mail to <span class="email">{{store.userEmail}}</span> check your inbox and click on verification link.
                if you didn't recieve click on resend verification email button.
                once you are verfied login with your credentails
            </v-card-text>
            <v-card-actions class="card-actions">
                <v-btn @click="resendVerificationEmail" style="background-color: #0daf0dd1;">Resend Verification Email</v-btn>
                <v-btn @click="verifyLogin" style="background-color: steelblue;">verify Email</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script setup>
import { useRouter } from 'vue-router';
import {auth} from '../firebaseConfig.mjs';
import { onAuthStateChanged, getAuth, sendEmailVerification } from 'firebase/auth';
import { useLoginStore } from '@/stores/loginStore';

const router = useRouter();
const store = useLoginStore();
const user=store.user;


const resendVerificationEmail =async()=>{
    console.log(user);
    await sendEmailVerification({...user});
    window.prompt('check your inbox for verfication email')

}
const verifyLogin=async()=>{

 onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User in checkEmailVerification: ", user);
          if (user.emailVerified) {
            router.push('/');
          } else {
            alert('Please verify your email first');
          }
        } else {
          alert('No user is signed in.');
        }
      });
    

}


</script>
<style scoped>

.title-style{
    text-align: center;
    color: green;
}

.card-text{
    text-align: center;
}
.email{
    color:blue;
}

.card-actions{
    justify-content: space-between;
    color: white;
}
</style>