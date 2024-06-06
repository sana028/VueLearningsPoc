<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
<template>
  <v-col>
    <v-row>
      <v-autocomplete class="mx-auto" density="comfortable" menu-icon="" placeholder="Search your task name"
        prepend-inner-icon="mdi-magnify" style="max-width: 350px;" theme="light" variant="solo" auto-select-first
        v-model:search="search" :items=filteredTasks @keydown.enter="handleSubmit" @change="handleClick">
      </v-autocomplete>
    </v-row>
    <v-row>
      <div class="taskItem">
        <v-card-actions style="justify-content: flex-end;">
          <RouterLink :to="{ name: 'AddTask' }"><v-btn color="primary" size="large" type="submit" variant="elevated"
              prepend-icon="mdi-plus" @click="handleAdd">Add</v-btn></RouterLink>
        </v-card-actions>
        <v-card v-if="taskDetails" class="card">
          <v-card-title class="card-title">{{ taskName  }}</v-card-title>
          <v-card-item v-for="(value, key) of taskDetails" :key="key" class="card-item">
            
            <v-row>
              <v-col cols="12" sm="4">{{ key }} </v-col>
              <v-col cols="12" sm="2">:</v-col>
              <v-col cols="12" sm="4">{{ value }}</v-col>
            </v-row>
          </v-card-item>
          <v-card-actions style="justify-content: center;">
            <v-btn class="edit-btn" @click="handleEdit">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-row>
  </v-col>
  <RouterView :dialog="dialog" @updateddialog="handleDialog"></RouterView>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { GETALLTASKS, GETTASKDETAILS } from '@/backend/actions.mjs';
import { useRouter } from 'vue-router';

const router = useRouter();
const search = ref<string>('');
const allTasks = ref<Array<string>>([]);
const taskDetails = ref();
const dialog = ref(false);
const taskName = ref();

onMounted(async () => {
  const data = await GETALLTASKS();
  allTasks.value = data.tasks;
})
watch([search],()=>{
   console.log(search);
})
const filteredTasks = computed<string[]>(() => {
  console.log(allTasks.value)
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
  console.log('submitted');
  getTaskDetails();
}

const getTaskDetails = async () => {
  const result = await GETTASKDETAILS(search.value);
  console.log(result)
  console.log(result.taskName);
  if (result) {
    taskDetails.value = result;
    taskName.value=result.taskName
  }
}

const handleEdit = () => {
  // const url = router.resolve({
  //   name: 'task',
  //   params: { task: search.value }
  // }).href;

  // window.open(url, '_blanck');
}

const handleAdd = () =>{
   dialog.value=true;
}

const handleDialog = () =>{
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
</style>