<!-- eslint-disable no-case-declarations -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-dialog v-model="props.dialog">
        <v-card class="card">
            <v-progress-linear v-model="progress" color="primary"></v-progress-linear>
            <v-card-title>Upload the file</v-card-title>
            <v-card-text>
                <v-file-input accept="image/*" label=" upload the image of the task" v-model="filePath"></v-file-input>
                <v-file-input lable="upload the task Document" v-model="taskFile"></v-file-input>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" variant="elevated" @click="uploadTheMediaFile()">Upload</v-btn>
                <v-btn color="" variant="outlined" @click="handleClose">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { storage } from '@/firebaseConfig.mjs';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { uploadBytesResumable, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useLoginStore } from '@/stores/loginStore';
import { useSearchStore } from '@/stores/userData';

const router = useRouter();
const store = useLoginStore();
const searchStore = useSearchStore();
const props = defineProps({
    dialog: Boolean
});
const filePath = ref();
const progress = ref(0);
const taskFile = ref();
const updateCompleted = ref(false);
const emit = defineEmits(['updateddialog']);

const handleClose = () => {
    emit('updateddialog', false);
    router.go(-1);
}
watch([progress], () => {
    console.log(progress);
})
const uploadTheMediaFile = async () => {
    try {
        const file = filePath.value;
        const task = taskFile.value;
        if (!file && !task) {
            console.log("No file selected");
            return;
        }
        console.log(file, task, `images/${store.userId}/${file.name}`)
        const storageRf = storageRef(storage, `images/${store.userId}/${file.name}`);
        const bytesStorageRef = storageRef(storage, `documents/${store.userId}/${task.name}`);
        const byteFileRef = uploadBytes(bytesStorageRef, task);
        const fileRef = uploadBytesResumable(storageRf, file);
        updateCompleted.value = (await byteFileRef).metadata.updated ? true : false;
        fileRef.on('state_changed',
            (snapshot) => {
                const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progressValue}% done`);
                progress.value = progressValue;
            },
            (error) => {
                console.error("Upload error:", error); // Enhanced error logging
            },
            async () => {
                console.log('Uploaded a blob or file!', progress.value, updateCompleted.value);
                const fileURL = await getDownloadURL(storageRf);

                // Store file metadata in Firestore
                const fileMetadata = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: fileURL
                };
                console.log(fileMetadata)
                if (progress.value == 100 && updateCompleted.value) {
                    setTimeout(() => {
                        if (progress.value === 100) { // Ensure the progress is still 100%
                            console.log('Uploaded a blob or file!');
                            alert('file uploaded');
                            searchStore.storeFileName(fileMetadata);
                            emit('updateddialog', false);

                            router.go(-1);
                        }
                    }, 2000);
                }
            }
        );
    } catch (error) {
        alert('You have entered wrong type of files first field only accept images ,and  second fields only documents')
        console.error("Unexpected error:", error);
    }
}



</script>
<style scoped>
.card {
    padding: 10px;
}
</style>