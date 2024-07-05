<!-- eslint-disable vue/no-mutating-props -->
<template>
   <div class="pa-4 text-center">
    <v-dialog v-model="props.dialog" max-width="600">
      <v-card prepend-icon="mdi-account" :title="type">
        <v-card-text>
          <v-row >
            <v-col>
              <v-text-field label="Task name*" v-model="taskName" required></v-text-field>
            </v-col>

            <v-col >
              <v-text-field
                hint="example of persistent helper text"
                label="Developer*"
                v-model="developerName"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            </v-row>
           <v-row>
            <v-col  >
              <BaseDatePicker :isMenu="isstartDateMenu" @updateTheDate="handleStartDate" label="Start Date"/>
            </v-col>

            <v-col >
              <BaseDatePicker :isMenu="isEndDateMenu" @updateTheDate="handleEndDate" label="End Date"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Expected Hours*"
                type="number"
                v-model="expectedHours"
                required
              ></v-text-field>
            </v-col>
            <v-col >
              <v-text-field
                label="Spent Hours*"
                type="number"
                v-model="spentedHours"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                :items="['To do', 'In-progress', 'Done', 'Block','hold']"
                label="Status*"
                v-model="taskStatus"
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
            <v-textarea label="Add_Notes" v-model="taskNotes"></v-textarea>
          </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis"
            >*indicates required field</small
          >
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="handleClose"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="handleSave"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <ToasterPopup :isActive="isSuccess" @updateIsActive="handleSnackbar">
    <template #header>
      Task Created
      </template>
  </ToasterPopup>
</template>
<script setup>
import { defineProps,defineEmits, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseDatePicker from '../BaseDatePicker.vue';
import { TASK_INFO_DB,TASKDB,NEWTASKS } from '@/helpers/DB/constant.mjs';
import {doc,setDoc,updateDoc,arrayUnion } from 'firebase/firestore';
import { db } from '@/firebaseConfig.mjs';
import ToasterPopup from '../popups/ToasterPopup.vue';

const route = useRouter();
const props = defineProps({
    dialog: Boolean,
    taskType : String,
    taskInfo:Array
});
const emit = defineEmits(['updateddialog']);
const isstartDateMenu = ref(false);
const isEndDateMenu = ref(false);
const startDate = ref();
const taskName = ref('');
const taskStatus = ref();
const developerName = ref();
const expectedHours = ref(0);
const spentedHours = ref(0);
const taskNotes = ref('');
const endDate = ref();
const isSuccess = ref(false);
const type =ref('');

const handleClose = () =>{
    emit('updateddialog', false,isSuccess.value);
    route.go(-1);
}

onMounted(()=>{

    if(props.taskType=='add'){
      type.value = 'Add Task '
    }else{
      type.value = 'Edit Task'
    }
  if(props.taskInfo){

    const taskData=props.taskInfo[0];
    taskName.value=taskData.taskName;
    taskStatus.value=taskData.taskStatus;
    developerName.value=taskData.developerName;
    expectedHours.value=taskData.expectedHours;
    spentedHours.value=taskData.spentedHours;
    taskNotes.value=taskData.taskNotes;
    startDate.value=taskData.startDate;
    endDate.value=taskData.endDate;
  }
})

const handleSave =async()=>{
    let taskInfo = {
      taskName: taskName.value,
      taskStatus: taskStatus.value,
      developerName: developerName.value,
      expectedHours: expectedHours.value,
      spentedHours: spentedHours.value,
      taskNotes: taskNotes.value,
      startDate:startDate.value,
      endDate:endDate.value
    }
    
    const docRef = doc(db,TASK_INFO_DB, taskName.value);

    await setDoc(docRef,{...taskInfo});
    const updateDocRef = doc(db, TASKDB, NEWTASKS);
    await updateDoc(updateDocRef,{tasks: arrayUnion(taskName.value)});
    if(updateDocRef){
      isSuccess.value = true;
      route.go(-1);
    }
    
}

const handleStartDate=(date,isMenu)=>{
   console.log(date.value)
    isstartDateMenu.value=isMenu;
    startDate.value=date.value;
}

const handleEndDate =(date,isMenu)=>{
  //end date logic here
  isEndDateMenu.value = isMenu;
  endDate.value =date.value;
}

const handleSnackbar=()=>{
  isSuccess.value = false;
}
</script>
<style scoped></style>