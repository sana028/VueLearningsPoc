<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="props.dialog" max-width="600">
            <v-card>
                <v-card-title style="color: red;">Delete Task</v-card-title>
                <v-card-text>
                    Are you sure you want delete the {{ taskName }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" variant="elevated" @click="handleDeleteTask">Delete</v-btn>
                    <v-btn @click="handleClose()" variant="outlined" color="primary">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { deleteTask } from '@/backend/actions.mjs';
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { watch } from 'vue';

const route = useRouter();
const taskName = ref('');
const props = defineProps({
    dialog: Boolean,
    taskInfo: Array
});


onMounted(() => {
    console.log(props.taskInfo, props.dialog)
    if (props.taskInfo) {
        taskName.value = props.taskInfo[0]?.taskName;
        console.log(taskName.value,props.taskInfo[0]?.taskName)
    }
})
const emit = defineEmits(['updatedialog'])

const handleClose = () => {
    emit('updateddialog', false);
    route.go(-1);
}

const handleDeleteTask = async () => {
    const isDeleted = await deleteTask(taskName.value);
    if (isDeleted) {
        emit('updateddialog', false, isDeleted, taskName.value);
        route.go(-1);
    } else {
        emit('updateddialog', false, isDeleted);
        route.go(-1);
    }
}

</script>
<style scoped></style>