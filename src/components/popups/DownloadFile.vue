<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-dialog v-model="props.dialog">
        <v-card>
            <v-card-title>Download Files</v-card-title>
            <v-card-text>
                <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-card-actions>
                <v-btn color="primary" variant="elevated" prepend-icon="mdi-download" @click="handleDownload(item)">Download</v-btn>
                <v-btn color="error" variant="outlined" prepend-icon="mdi-delete" @click="handleDelete(item)">Delete</v-btn>
              </v-card-actions>
              </v-list-item>
            </v-list>
            </v-card-text>
            <v-card-actions>
                <v-btn color="teal" variant="outlined" @click="handleClose">Close</v-btn>
                </v-card-actions>
        </v-card>

    </v-dialog>
</template>
<script setup>

import { defineProps,defineEmits,ref, onMounted } from 'vue';
import { db } from '@/firebaseConfig.mjs';
import { DOWNLOAD,DOWNLOADSDOC } from '@/helpers/DB/constant.mjs';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/userData';
import { useLoginStore } from '@/stores/loginStore';

const props = defineProps({
    dialog: Boolean,
})
const emit = defineEmits(['updateddialog']);
const items = ref();
const router = useRouter();
const store = useSearchStore();
const userDataStore = useLoginStore();
onMounted(()=>{
    const tasksRef = doc(db, DOWNLOAD, DOWNLOADSDOC);
    onSnapshot(tasksRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        items.value = data.files ;
      } else {
        console.log('Document does not exist');
      }
    }, (error) => {
      console.error('Error fetching document:', error);
    });
})

const handleDownload = (file) =>{
  const fileName = `images/${userDataStore.userId}/${file.name}`
   store.downloadTheFile(fileName);
   
}

const handleClose = ()=>{
    emit('updateddialog', false);
    router.go(-1);
}

const handleDelete = (file) =>{
  const fileName = `images/${userDataStore.userId}/${file.name}`
  store.deleteTheFile(fileName,file);
  emit('updateddialog', false);
  router.go(-1);
}
</script>
<style scoped>
</style>