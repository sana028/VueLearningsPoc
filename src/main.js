import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import routers from './routers'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebaseConfig.mjs';
import { getAuth } from 'firebase/auth'

onAuthStateChanged(getAuth(), (user) => {
  console.log(user);
if (user) {
console.log(user);
if (user.emailVerified) {
// User is signed in and email is verified
// router.push('/home/search')
} else {
alert('Please verify your email to proceed.');
}
}
})

const vuetify = createVuetify({
   components,
   directives,
   icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
 })

createApp(App).use(routers).use(createPinia()).use(vuetify).mount('#app');
