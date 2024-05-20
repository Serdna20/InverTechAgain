<script setup>
    import { ref } from 'vue'

    defineProps({
        title: String,
        information: String
    })

    let buttonStatus = ref(false)
    let buttonText = ref("Mostrar")

    function showHideText() {
        buttonStatus.value = ! buttonStatus.value

        buttonText.value = "Mostrar"
        if (buttonStatus.value) {
            buttonText.value = "Ocultar"
        }
    }

</script>

<template>
    <div class="mx-auto max-w-96 w-full max-h-96 h-full bg-slate-700">
        <section class="border-b border-b-white flex flex-row justify-around">
            <h1>{{ title }}</h1>
            <button @click="showHideText" class="w-32 bg-white border rounded">{{ buttonText }}</button>
        </section>
        <section v-if="buttonStatus">
            <h1>{{ information }}</h1>
        </section>
    </div>
</template>