<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-card class="card-style ">
          <v-toolbar dark class="tool">
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field v-model="emailAddress" prepend-icon="mdi-email" name="login" label="Login"
              type="email"></v-text-field>
            <span v-if="v$.emailAddress.$error" style="color:red">{{ v$.emailAddress.$errors[0].$message }}</span>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" @click="signIn" block size="large" class="email-link">send Link</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script setup>
import { ref, watch } from 'vue';
import { required, email } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { sendSignInLinkToEmail, isSignInWithEmailLink } from 'firebase/auth';
import { auth } from '@/firebaseConfig.mjs';
import { useLoginStore } from '@/stores/loginStore';

const darkTheme = ref(true)
const platformName = 'Log In';
const password = ref(null);
const username = ref(null);
const emailAddress = ref('');
const store = useLoginStore();


const rules = {
  emailAddress: { required, email },
}

const v$ = useVuelidate(rules, { emailAddress });

watch([emailAddress], () => {
  v$.value.$touch();
  console.log(v$.value);
});

const signIn = async () => {
  const actionCodeOptions = {
    url:  'http://localhost:5173/verify-emailLink',
    handleCodeInApp: true,
  }
  v$.value.$touch();
  if (!v$.value.$invalid) {
    console.log('hello');
    try {
      await sendSignInLinkToEmail(auth, emailAddress.value, actionCodeOptions);
      store.userEmail = emailAddress.value;
      localStorage.setItem('email', emailAddress.value)
      alert('Sign-in link sent! to your email')

    } catch (error) {
      console.error(error);
    }
  }
}



</script>
<style scoped>
.card-style {
  width: 100%;
  border: 1px solid rgb(180, 173, 173);
  border-radius: 10px;

}

.email-link {
  background-color: rgb(255 47 0 / 48%);
  color: white;
}

.tool {
  background-color: rgb(24 192 153);
}
</style>