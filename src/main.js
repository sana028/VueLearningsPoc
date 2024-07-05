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
import { useLoginStore } from './stores/loginStore'
// import { useRouter } from 'vue-router'


onAuthStateChanged(auth, (user) => {
  const store=useLoginStore();
  if (user) {
    store.userEmail=user.email;
    store.userId =  user.uid;

    store.userAuthenticated=user.emailVerified;
    if(!user.emailVerified){
      alert('now login with your credentials');
        // useRouter().push({name:'login'});
        
    }

    // You can store the user in your state management if needed
  } else {
    store.userEmail='';
    store.userAuthenticated=false;

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
