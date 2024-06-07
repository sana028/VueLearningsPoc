<template>
  <v-app>
  <v-card>
    <v-layout>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>

      <v-main >
        <v-card-text>
            <router-view></router-view>
        </v-card-text>
      </v-main>
    </v-layout>
  </v-card>
</v-app>




</template>

<script setup>
import { ref } from 'vue';


const drawer = ref(false);
const group = ref(null);
const items = ref( [
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
const appTitle = 'Awesome App';
// const sidebar = ref<boolean>(false);
const menuItems = [
    { title: 'Home', path: '/home', icon: 'home' },
    { title: 'Sign Out', path: '/', icon: 'face' },
]

</script>
<style scoped>
.nav-bar-style{
    margin-bottom: 40px;
}
</style>