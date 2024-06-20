<!-- eslint-disable vue/no-parsing-error -->
<template>
    <v-container class="container">
        <v-card class="border-accent-colour border-t-4 mt-3 card-styles" elevation="0" light tag="section" v-if="checkEmail"
            max-width="560" >
            <v-card-title class="pb-0 mx-auto px-6 py-8" max-width="344">
                <h2 class="headline mb-2">Reset Password</h2>
            </v-card-title>
            <v-card-text class="pt-0 text-align">
                <p class="body-1  mb-10 ">You can reset your passowrd here</p>
            </v-card-text>
            <v-card-content>
                <v-text-field v-model="emailAddress" :readonly="loading" class=" pl-4 pr-4"
                    label="Email" clearable></v-text-field>
                <span v-if="v$.emailAddress.$error" class="email-error">{{ v$.emailAddress.$errors[0].$message }}</span>
            </v-card-content>
            <v-card-actions>
                <v-btn :loading="loading" color="success" size="large" type="submit" variant="elevated" block @click="handleResetLink()">
                    Reset Password
                </v-btn>
            </v-card-actions>
            <input></input>
           
        </v-card>
        <v-card>
        <v-card-title> Login with new password</v-card-title>
        <v-card-text>
            After reset the password <RouterLink :to="{name:'login'}">login</RouterLink> in to account
        </v-card-text>
    </v-card>
    </v-container>
    <v-snackbar v-model="checkEmail" location="center">
       Check your email inbox for reset password
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="checkEmail=false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>
<script setup>
import { ref, watch } from 'vue';
import { sendPasswordReset } from '@/backend/actions.mjs';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const emailAddress = ref('');
const checkEmail = ref(false);
const form = ref(null);
const rules = {
    emailAddress: [
        required,
        email
    ]
}
const v$ = useVuelidate(rules, [emailAddress]);

watch([emailAddress], () => {
    v$.value.$touch();
});

const handleResetLink = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        const res = await sendPasswordReset(emailAddress.value);
        checkEmail.value=true;
        console.log(res);
    }
}
</script>
<style scoped>
.card-styles {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
}

.container {
    display: flex;
    justify-content: center;
}

.text-align {
    text-align: center;
}

.email-error{
    color: red;
    text-align: start;
    padding: 16px;
}
</style>