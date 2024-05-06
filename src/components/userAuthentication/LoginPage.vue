<template>
    <div class="body-container">
        <div class="login-box"  v-if="!isLoginClicked">
            <h3>Sign Up</h3>
            <form>
                <div class="form-group">
                   
                    <input type="text" placeholder="username" v-model="newUserName" required/>
                    <span class="error-msg">{{ signUpUserNamemsg }}</span>
                </div>
                <div class="form-group">
                    
                    <input type="email" placeholder="Enter your email" v-model="newUserEmail" required/>
                    <span class="error-msg">{{ signUpEmailmsg }}</span>
                </div>
                <div class="form-group">
                   
                    <input type="password" placeholder="Enter your password" v-model="newUserPassword" required/>
                    <span class="error-msg">{{ sigUpPasswordmsg }}</span>
                </div>
                <button  type="submit" @click="checkUserDetails()">Sign Up</button>
                <div>
                    <span>Create a new account <a @click.prevent="changeauthenticationForm()">SignIn</a></span>
                </div>
            </form>

        </div>
        <div class="login-box"  v-if="isLoginClicked">
            <h3>Sign In</h3>
            <form>
                <div class="form-group">
                    <input type="email" placeholder="Enter your email" v-model="loginEmail" required/>
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Enter your password" v-model="loginPassword" required/>
                </div>
                <button type="submit">Sign In</button>
            </form>
            <div>
                    <span>Already have a number <a @click="changeauthenticationForm()">SignUp</a></span>
                </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, ref ,watch} from 'vue';
import '../../styles/login.css';
import { useRouter } from 'vue-router';
let newUserName=ref('');
let newUserEmail=ref('');
let newUserPassword=ref('');
let loginEmail=ref('');
let loginPassword=ref('');
let loginSuccess=ref(false);
let sigUpPasswordmsg=ref('');
let signUpUserNamemsg=ref('');
let signUpEmailmsg=ref('');
const router=useRouter();

let isLoginClicked=ref(false);

router.beforeEach((to,from,next)=>{
    console.log(to)
    if(from.name==='login'){
        isLoginClicked.value=true;
        next(true);
    }else{
        isLoginClicked.value=false;
    }
    
});

watch(newUserEmail,(newEmail,oldEmail)=>{
    if((/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(newEmail)){
        signUpEmailmsg.value='';
    }else{
        signUpEmailmsg.value='email is not valid';
    }
})
watch(newUserName,(newName,oldName)=>{
    if((/^[a-zA-Z][a-zA-Z\s]*$/).test(newName)){
        signUpUserNamemsg.value='';
    }else{
        signUpUserNamemsg.value='Name is not valid it should start with alphabets';
    }
    if(newName==''){
        signUpUserNamemsg.value='Enter your name';
    }
})
watch(newUserPassword,(newPassword,oldPassword)=>{
    if(newPassword.length>=8){
        if(( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/).test(newPassword)){
             loginSuccess.value=true;
             sigUpPasswordmsg.value='';
        }
    }else{
        sigUpPasswordmsg.value='password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
    }

})

const changeauthenticationForm=()=>{
     isLoginClicked.value=!isLoginClicked.value;
}

const checkUserDataValidated=computed(()=>{
      return   signUpEmailmsg.value=='' && signUpUserNamemsg.value=='' && sigUpPasswordmsg.value=='';
})


const checkUserDetails=()=>{
    event?.preventDefault();
      if(checkUserDataValidated.value){
           router.push({name:'home'});
      }
      else{
       alert('there is a field is empty');
      }
}



</script>