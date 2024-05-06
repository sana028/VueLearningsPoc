<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars-->
<template>
  <header>
  <div>
    <NavbarCom @componentName="getComponentfromchild"/>
    </div>
  </header>
    <div><main >
        <!-- <button @click="toggle()">click</button> -->
        <!-- <Transition name="fade" mode="out-in" appear>
            <p v-if="exists">learn</p>
        </Transition> -->
        <Transition>
        <KeepAlive>
           <component :is="activeComp" custom-attr=""/>
        </KeepAlive>
    </Transition>

<button @click="open = true">Open Modal</button>
<TransitionGroup>
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
</TransitionGroup>
    </main>
  </div>
    <!-- <InstanceComp/> -->
    <!-- <TodoList/> -->

</template>
<script setup lang="ts">
import NavbarCom from '@/base/NavbarCom.vue';
import InstanceComp from './InstanceComp.vue';
import TodoList from './TodoList.vue';


import { TransitionGroup, ref } from 'vue';
let exists=ref(false);


let activeComp = ref(null);
let items=[{text:'hello',id:1},{text:'walr',id:2}]
let open=ref(false);

// const changeComponet=(componentName:string)=>{
//     if(componentName === 'About'){
//         activeComp.value=AboutPage;
//     }else{
//         activeComp.value=PrivacyPage;
//     }

// }

const toggle=()=>{
    items.push({text:'fr',id:3});
    console.log(items)
    exists.value=!exists.value;
}
const getComponentfromchild=(component:any)=>{
    console.log(component);
        activeComp.value=component;
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

header{
  position:relative;
  margin-bottom: 20px;
}
</style>