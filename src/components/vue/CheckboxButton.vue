<script setup>

    import { ref } from 'vue'
    let trueFalse = ref(true)

    changeTrueFalse()

    function changeTrueFalse() {
        trueFalse = !trueFalse        
    }    

</script>

<template>
    <section class="bg-red-300 h-10 w-10 cursor-pointer" @click="changeTrueFalse">
        <h1 v-show="trueFalse == false">x</h1>
        <h1 v-show="trueFalse == true">✓</h1>
    </section>
</template>