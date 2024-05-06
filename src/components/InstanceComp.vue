<template>
    <div>
        <ul>
            <li >some</li>
        </ul>
        <ul>
            <li>hi</li>
        </ul>
    </div>
</template>
<script >
export default {
    name:'InstanceComp',
    data(){
        return{
            color:'red',

        }
    },
    mounted() {
        console.log(this.$data.color)
        this.$el.children[1].style.backgroundColor = 'lightblue'
    }
}

</script>
