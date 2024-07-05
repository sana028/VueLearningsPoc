<template>
  <v-data-table-server :headers="headers" :items="serverItems" :items-length="totalItems" 
    :loading="loading" class="custom-data-table">
    <template v-slot:[`item.taskStatus`]="{ value }">
      <v-chip :color="getColor(value)">
        {{ value }}
      </v-chip>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <RouterLink :to="{name:'uploadFile'}">
        <v-icon color="primary"  size="x-large" @click="uploadFile()">mdi-upload</v-icon>
      </RouterLink>
      <RouterLink :to="{ name: 'AddTask' }"><v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon></RouterLink>
      <RouterLink :to="{ name: 'DeleteTask' }"><v-icon size="small" color="error" @click="deleteItem(item)"> mdi-delete
        </v-icon></RouterLink>
    </template>
  </v-data-table-server>
  <RouterView :dialog="dialog" @updateddialog="handleDialog" :taskType="'edit'" :taskInfo="serverItems" />
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { defineProps } from 'vue';
import { RouterView } from 'vue-router';
import { onSnapshot, where, query,collection, orderBy } from 'firebase/firestore';
import { db } from '@/firebaseConfig.mjs';
import { TASK_INFO_DB } from '@/helpers/DB/constant.mjs';


const dialog = ref(false);
const props = defineProps(['data','vuedialog','developerMode']);
const totalItems = ref(0);

const headers = [
  { title: 'Task Name', align: 'start', sortable: false, key: 'taskName' },
  { title: 'Developer', key: 'developerName' },
  { title: 'Task Status', key: 'taskStatus' },
  { title: 'Started Date', key: 'startDate' },
  {title:'Expected Hours', key:'expectedHours'},
  { title: 'Spent Hours', key: 'spentedHours' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const serverItems = ref([]);
const unSubscribe = ref();

const fetchTaskData = (task) => {
  const tasksRef = query(collection(db, TASK_INFO_DB), where("taskName", "==", task),orderBy("taskName","asc"),limit(10));
  unSubscribe.value = onSnapshot(tasksRef, (snapshot) => {
    serverItems.value = []; 
    snapshot.forEach(doc => {
      serverItems.value.push(doc.data());
   
    });
  }, (error) => {
    console.error('Error fetching document:', error);
  });
};

onUnmounted(()=>{
  if(unSubscribe.value){
    unSubscribe.value();
  }
})

const handleDialog = (isClosed) => {
  if(!props.developerMode){
  fetchTaskData(props.data.taskName);
  }
  dialog.value = isClosed;
};

watch([dialog], () => {
  if(!props.developerMode){
  fetchTaskData(props.data.taskName);
  }
  else{
    serverItems.value = props.data;
  }
});


onMounted(() => {
  if(!props.developerMode){
  fetchTaskData(props.data.taskName);
  }else{
    serverItems.value = props.data;
  }
});


const getColor = (value) => {
  if (value == "In-progress") return 'blue';
  else if (value == "Done") return 'green';
  else if (value == "Block") return 'red';
  else if (value == "hold") return 'yellow';
  else return;
}


const editItem = (item) => {
  dialog.value = true
}

const deleteItem = (item) => {
  dialog.value = true
}

const uploadFile = ()=>{
  dialog.value=true;
}

</script>
<style scoped>
.custom-data-table {
  border: 1px solid #80808070;
  border-radius: 10px;
}
</style>