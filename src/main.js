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
import { auth } from './firebaseConfig.mjs';
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (user) {
    console.log("User is signed in: ", user);
    // You can store the user in your state management if needed
  } else {
    console.log('No user is signed in.');
  }
});

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
