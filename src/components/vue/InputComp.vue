<script setup>
    defineProps(['title'])
</script>

<template>
    <section class="flex flex-col justify-center items-center w-1/4 m-1">
        <h1>{{title}}</h1>
        <slot/>
    </section>    
</template>