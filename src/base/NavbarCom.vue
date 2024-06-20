<template>
  <v-app>
    <v-card style="box-shadow: none">
      <v-layout>
        <v-app-bar color="primary" prominent>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>My files</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-account" v-bind="props" size="large">

              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-icon icon="mdi-logout" @click="handleLogout"></v-icon>

          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
          <v-list :items="items"></v-list>
        </v-navigation-drawer>

        <v-main>
          <v-container>
            <router-view></router-view>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>




</template>

<script setup>
import { ref } from 'vue';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig.mjs';
import { useRouter } from 'vue-router';

const router = useRouter();
const drawer = ref(false);
const items = ref([
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },]);

const handleLogout = async () => {
  try {
    await signOut(auth);
    router.push({name:'login'}); 
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

const showProfile = () => {

}
</script>
<style scoped>
.nav-bar-style {
  margin-bottom: 40px;
}
</style>