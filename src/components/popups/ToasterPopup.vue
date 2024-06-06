<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-snackbar v-model="props.isActive" location="center">
       <slot name="header"></slot>

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="emitIsActive">
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>
<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps({
  isActive: {
    type: [Boolean, String, Number, Object, Array, Function],
    required: true 
  }
});

const emit = defineEmits(['updateIsActive']);

const emitIsActive =()=>{
    emit('updateIsActive',false)
}

</script>
<style>
</style>