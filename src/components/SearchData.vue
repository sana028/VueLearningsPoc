<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
<template>
  <v-col>
    <v-row>
      <v-autocomplete class="mx-auto" menu-icon="" density="comfortable"  placeholder="Search your task name"
        style="max-width: 350px;" theme="light" variant="solo" auto-select-first
        v-model:search="search" :items=filteredTasks @keydown.enter="handleSubmit" @change="handleClick">
        <template v-slot:append>
          <v-slide-x-reverse-transition mode="out-in">
            <v-icon
              :icon="'mdi-magnify'"
              @click="handleSubmit"
              size = "large"
              
            ></v-icon>
          </v-slide-x-reverse-transition>
        </template>
      </v-autocomplete>
      
    </v-row>
    <v-row class="btn-add">
      <RouterLink :to="{ name: 'downloadFile' }"><v-btn color="secondary" size="large" type="button" variant="elevated"
              prepend-icon="mdi-download" @click="handleAdd">Downloads</v-btn></RouterLink>
      <RouterLink :to="{ name: 'AddTask' }"><v-btn color="primary" size="large" type="button" variant="elevated"
              prepend-icon="mdi-plus" @click="handleAdd">Add</v-btn></RouterLink>
     
    </v-row>
    <v-row>
      <div class="taskItem">
       <TaskView :data="taskDetails" v-if="taskDetails?.taskName == search" :vuedialog="dialog"/>
      </div>
    </v-row>
  </v-col>
  <RouterView :dialog="dialog" @updateddialog="handleDialog" :taskType="'add'"></RouterView>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed, onUnmounted } from 'vue';
import { GETTASKDETAILS } from '@/backend/actions.mjs';
import { useRouter } from 'vue-router';
import TaskView from '@/components/TaskView.vue';
import { collection, onSnapshot,doc, query, orderBy, limit, getDocs, } from 'firebase/firestore';
import { db } from '@/firebaseConfig.mjs';
import { NEWTASKS, TASKDB } from '@/helpers/DB/constant.mjs';

const router = useRouter();
const search = ref<string>('');
const allTasks = ref<Array<string>>([]);
const taskDetails = ref();
const dialog = ref(false);
const taskName = ref();
const unSubscribe = ref();

onMounted(async () => {
  fetchTheTaskINAORDERWITHLIMIT();
});

const fetchTheTaskINAORDERWITHLIMIT = async() =>{
  const tasksRef = collection(db, TASKDB);
  const taskRef = query(tasksRef, orderBy('tasks', 'asc'), limit(10));
  const ref = (await getDocs(taskRef));
  ref.forEach((doc) => {
    console.log(doc.data());
    allTasks.value = doc.data().tasks;
    });
  console.log(allTasks.value)
   
}
watch([search],()=>{
  console.log(search.value);
  fetchTheTaskINAORDERWITHLIMIT();
})


const filteredTasks = computed<string[]>(() => {

  if (search.value.length < 3) {
    return [];
  }
  return allTasks.value.filter(task =>
    task.toLowerCase().includes(search.value.toLowerCase())
  );
});

const handleClick = () => {
  getTaskDetails();
}
const handleSubmit = () => {

  getTaskDetails();
}

const getTaskDetails = async () => {
  const result = await GETTASKDETAILS(search.value);
  const matchingWords = allTasks.value.filter(word => word.startsWith(search.value));
  
  if (result) {
    taskDetails.value = result;
    taskName.value=result.taskName
  }
}


const handleAdd = () =>{
   dialog.value=true;
}

const handleDialog = (isSuccess) =>{
  if(isSuccess){
    const query=collection(db,TASKDB);
   
  }
  dialog.value=false;
}

</script>
<style scoped>
.v-enter-from {
  opacity: 0;
  rotate: 180deg;
}

.v-enter-to {
  opacity: 1;
  rotate: 0deg;
}

.v-enter-active {
  transition: all 0.7s;
}

.v-enter-from,
.v-leave-to {
  transition: opacity 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 16px #00000026;
}

header {
  position: relative;
  margin-bottom: 20px;
}

.card-title {
  border: 1px solid #80808091;
  border-radius: 10px;
  margin: 20px;
  background-color: #80808017;
}

.card {
  width: 80%;
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  background-color: rgb(60 60 60 / 2%);
}

.taskItem {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
}

.edit-btn {
  background-color: #2d2dc3d1;
  color: white;
}

.card-item {
  padding: 0.625rem 4rem;
}
.btn-add{
  display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}
</style>