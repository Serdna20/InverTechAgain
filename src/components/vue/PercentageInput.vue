<script setup>

    import { ref } from 'vue'
    let msg = ref(0)

    function inputPercentage() {
        
            let amount = document.getElementById('tasa');
            
            const n = amount.value;
            if ( n >= 0 && n <= 100 ) {
                msg = amount.value  
            } else {
                msg = 0
            }

            amount.value = msg
    }

</script>

<template>
    <section>
        <input type='number' @change="inputPercentage" id="tasa" placeholder="Tasa (anual)"
        class="px-2 py-1 outline-none border border-1"
        v-model="msg"
        @input="inputPercentage">
    </section>
</template>