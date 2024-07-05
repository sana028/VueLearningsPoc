<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-card class="elevation-6 mt-10">
                    <v-window v-model="step">
                        <v-window-item :value="1">
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-card-text class="mt-12">
                                        <h4 class="text-center">Login in to Your Account</h4>
                                        <h6 class="text-center  grey--text ">Log in to your account so you can continue
                                            builiding <br>and editing your onboarding flows</h6>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8">

                                                <v-text-field v-model="loginEmail" label="Email" outlined dense
                                                    color="blue" autocomplete="false" class="mt-16" />
                                                <span v-if="loginv$.loginEmail.$error" :style="{color:'red'}">{{ loginv$.loginEmail.$errors[0].$message }}</span>
                                                <v-text-field v-model="loginPassword" label="Password" outlined dense
                                                    color="blue" autocomplete="false" type="password"   />
                                                    <span v-if="loginv$.loginPassword.$error" :style="{color:'red'}">{{ loginv$.loginPassword.$errors[0].$message }}</span>
                                                <div>
                                                   <RouterLink :to="{name:'forgotPassword'}" class="caption blue--text"
                                                        style="text-align: center;margin-left:10px;" >Forgot
                                                        password</RouterLink>
                                                  
                                                </div>
                                                <div>
                                                    <v-checkbox v-model="remember" label="Remember Me" class="mt-n1"
                                                        color="blue">
                                                    </v-checkbox>
                                                </div>

                                                <v-btn color="blue" dark block tile @click="login()">Log in</v-btn>

                                                <h5 class="text-center  grey--text mt-4 mb-3">Or Log in using</h5>
                                                <div class="d-flex  justify-space-between align-center mr-10 mb-16">
                                                    <v-btn depressed outlined>
                                                        <v-icon color="red" icon="mdi-google"></v-icon>
                                                    </v-btn>
                                                    <v-btn depressed outlined>
                                                        <v-icon color="blue" icon="mdi-facebook"></v-icon>
                                                    </v-btn>
                                                    <v-btn depressed outlined>
                                                        <v-icon color="light-blue lighten-3"
                                                            icon="mdi-twitter"></v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                                <v-col cols="12" md="6" class="blue rounded-bl-xl login">
                                    <div style="  text-align: center; padding: 180px 0;">
                                        <v-card-text class="white--text">
                                            <h3 class="text-center ">Don't Have an Account Yet?</h3>
                                            <h6 class="text-center">Let's get you all set up so you can start creating
                                                your your first<br> onboarding experience</h6>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-window-item>
                        <v-window-item :value="2">
                            <v-row>
                                <v-col cols="12" md="6" class="blue rounded-br-xl signup">
                                    <div style="  text-align: center; padding: 180px 0;">
                                        <v-card-text class="white--text">
                                            <h3 class="text-center ">Alredy Signed up?</h3>
                                            <h6 class="text-center">Log in to your account so you can continue building
                                                and<br> editing your onboarding flows</h6>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn tile outlined dark @click="step--">Log in</v-btn>
                                        </div>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-card-text class="mt-12">
                                        <h4 class="text-center">Sign Up for an Account</h4>
                                        <h6 class="text-center  grey--text ">Let's get you all set up so you can start
                                            creatin your <br>
                                            first onboarding experiance</h6>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" >
                                                <v-row>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field v-model="firstName" label="First Name" outlined
                                                            dense color="blue" autocomplete="false" class="mt-4" 
                                                     />
                                                    </v-col>
                                                    <v-col cols="12" sm="6">
                                                        <v-text-field v-model="lastName" label="Last Name" outlined
                                                            dense color="blue" autocomplete="false" class="mt-4"
                                                           />
                                                    </v-col>
                                                </v-row>
                                                <v-text-field v-model="signUpEmail" label="Email" outlined dense
                                                    color="blue" autocomplete="false" 
                                                    />
                                                <v-text-field v-model="signUpPassword" label="Password" outlined dense
                                                    color="blue" autocomplete="false" type="password" 
                                                    />
                                                <v-row>
                                                    <v-checkbox v-model="accept" label="I Accept Terms &Conditions"
                                                        class="mt-n1" color="blue"
                                                        > </v-checkbox>
                                                </v-row>
                                                <v-btn color="blue" dark block tile @click.prevent="signup()">Sign up</v-btn>

                                                <h5 class="text-center  grey--text mt-4 mb-3">Or Sign up using</h5>
                                                <div class="d-flex  justify-space-between align-center mr-10 mb-11">
                                                    <v-btn depressed outlined>
                                                        <v-icon color="red" icon="mdi-google"></v-icon>
                                                    </v-btn>
                                                    <v-btn depressed outlined>
                                                        <v-icon color="blue" icon="mdi-facebook"></v-icon>
                                                    </v-btn>
                                                    <v-btn depressed outlined>
                                                        <v-icon color="light-blue lighten-3"
                                                            icon="mdi-twitter"></v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <template v-if="isCredentailsWrong">
    <ToasterPopup :isActive="isCredentailsWrong" @updateIsActive="handleSnackbar">
        <template #header>
            Email / password are wrong entered. 
            Please enter correct one.
        </template>
        </ToasterPopup>
    </template>
</template>

<script setup >
import { ref, watch } from 'vue';
import { signUp, signIn } from '@/backend/actions';
import { minLength, required, email, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useLoginStore } from '@/stores/loginStore';
import { RouterLink } from 'vue-router';
import ToasterPopup from './popups/ToasterPopup.vue';
import { useRouter } from 'vue-router';

const routers = useRouter()
const store = useLoginStore();
const loginEmail = ref('');
const loginPassword = ref('');
const signUpEmail = ref('');
const signUpPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const remember = ref(false);
const accept = ref(false);
const isCredentailsWrong = ref(false);

const step = ref(1);

const passwordRegex = helpers.regex('passwordRegex', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
const loginRules =  {
    loginEmail: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Email must be valid', email),
    },
    loginPassword: {
      required: helpers.withMessage('Password is required', required),
      minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8)),
    },
}

const rules =  {
    signUpEmail: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Email must be valid', email),
    },
    signUpPassword: {
      required: helpers.withMessage('Password is required', required),
      minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8)),
    //   passwordRegex: helpers.withMessage('Password must contain at least one letter and one number', passwordRegex),
    },
    firstName: {
      required: helpers.withMessage('First name is required', required),
      minLength: helpers.withMessage('First name must be at least 3 characters', minLength(3)),
    },
    lastName: {
      required: helpers.withMessage('Last name is required', required),
      minLength: helpers.withMessage('Last name must be at least 3 characters', minLength(3)),
    },
    accept: {
      required: helpers.withMessage('You must accept the terms and conditions', required),
    },
  };


const v$ = useVuelidate(rules, {signUpEmail, signUpPassword, firstName, lastName, accept });
const loginv$ =  useVuelidate(loginRules, { loginEmail,loginPassword});

watch([loginEmail, loginPassword], () => {
  loginv$.value.$touch();
});

watch([signUpEmail, signUpPassword, firstName,lastName,accept],()=>{
    v$.value.$touch();
})
const login = async () => {
    loginv$.value.$touch;
    if (!loginv$.value.$invalid) {
        if (loginEmail.value && loginPassword.value) {
            const userLoginInfo = {
                email: loginEmail.value,
                password: loginPassword.value
            }
            try {
                const res = await signIn(userLoginInfo);
              
                // if(res){
                store.userId = res.user.uid;
                store.userAuthenticated = res.user.emailVerified;
                routers.push({path : '/home/search'})
                // }
            } catch (error) {
                isCredentailsWrong.value = true;
               
                console.error(error);
            }
        }

    }
}

const signup = async () => {
    v$.value.$touch();
    if (!v$.value.$invalid) {
        if (signUpEmail.value && signUpPassword.value && firstName.value && lastName.value) {
            const userSignUpInfo = {
                email: signUpEmail.value,
                password: signUpPassword.value,
                firstName: firstName.value,
                lastName: lastName.value
            }
            try {
              
                const userCredential = await signUp(userSignUpInfo);
               
                store.setUserId(userCredential.user.uid);
                store.user=userCredential;
                store.userEmail=signUpEmail.value;
                step.value = step.value -1;
                alert('now login with your credentials');
            } catch (error) {
                console.error(error); 
               
            }
        }
    }
}

const handleSnackbar = ()=>{
    isCredentailsWrong.value = false;
}

</script>
<style scoped>
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}

.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}

.signup {
    background-color: #3385ff;
    border-bottom-right-radius: 40%;
}

.login {
    background-color: #3385ff;
    border-bottom-left-radius: 40%;
}
</style>


