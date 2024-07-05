<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
<template>
    <v-col>
      <v-row>
        <v-autocomplete class="mx-auto" menu-icon="" density="comfortable"  placeholder="Search developer Name"
          style="max-width: 350px;" theme="light" variant="solo" auto-select-first
          v-model:search="search">
          <template v-slot:append>
            <v-slide-x-reverse-transition mode="out-in">
              <v-icon
                :icon="'mdi-magnify'"
                @click="searchData"
                size = "large"  
              ></v-icon>
            </v-slide-x-reverse-transition>
          </template>
        </v-autocomplete>  
      </v-row>
      <v-row>
        <div class="taskItem">
         <TaskView :data="taskDetails" v-if="developerMode" :developerMode="developerMode" :vuedialog="dialog"/>
        </div>
      </v-row>
    </v-col> 
    <!-- <RouterView :dialog="dialog" @updateddialog="handleDialog" :taskType="'add'"></RouterView> -->
  </template>
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import {getDeveloperWorkedTasks} from '../backend/actions.mjs';
  import TaskView from '../components/TaskView.vue';

  const taskDetails = ref();
  const search = ref('');
 const dialog = ref(false);
 const developerMode = ref(false);

  const fetchTheUserStories = async() =>{
    const data = await getDeveloperWorkedTasks(search.value);
    console.log(data)
    taskDetails.value = data;
  }
  
  watch([search],()=>{
    if(search.value.length>=3){
    developerMode.value=false;
    }
  });

  const searchData = async() =>{
    await fetchTheUserStories();
    dialog.value = true;
    developerMode.value = true;
  }
 </script>
  
  