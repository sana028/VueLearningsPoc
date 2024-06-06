<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFormatted"
          :label="props.label"
          readonly
          v-on="on"
          @click="menu=true"
        ></v-text-field>
      </template>
      <v-date-picker
        v-if="menu"
        v-model="date"
        min="1950-01-01"
        @input="menu=false"
      ></v-date-picker>
    </v-menu>

</template>
<script setup>

import { ref, onMounted, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';



const menu = ref(false);
const date=ref(new Date());
const dateFormatted = ref(new Date().toString().substr(0, 10))

const props =defineProps({
    isMenu:Boolean,
    label:String,
})

const emit = defineEmits(['updateTheDate'])

onMounted(()=>{
    menu.value = props.isMenu;
    dateFormatted.value =formateDate(new Date().toISOString().substr(0, 10))
})

const formateDate=(date)=>{
  const d=new Date(date);
    if (!date) return null
    const year = d.getFullYear();
  const month = d.getMonth() + 1 // Months are zero-based
  const day = d.getDate()
    return `${day}/${month}/${year}`
}

watch(date, (val, oldVal) => {
  dateFormatted.value=formateDate(date.value);
  emit('updateTheDate',dateFormatted,false); 
    menu.value = false
  })

  



</script>
