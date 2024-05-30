<script setup>

    import { ref } from 'vue'

    let initialAmount = ref(0)

</script>

<template>
    <section class="w-full flex flex-col justify-center items-center">
        <div class="flex flex-row justify-between items-center w-4/5 mb-10">
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Cantidad</p>
                <input v-model="valueToConvert" @change="validateValue()" type="number" class="h-10 outline-none border border-1 appearance-none pl-2 py-2 w-48">
            </section>
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Moneda a usar:</p>
                <select v-model="initialCurrency" @change="validateValue()" class="appearance-none h-10 border border-1 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
                    <option value="0">Peso Colombiano (COP)</option>
                    <option value="1">Peso Mexicano (MXN)</option>
                    <option value="2">Dolar (USD)</option>
                    <option value="3">Euro (EUR)</option>
                    <option value="4">Yen Japonés (JPY)</option>
                    <option value="5">Libra Esterlina (GBP)</option>
                    <option value="6">Yuan Chino (CNY)</option>
                </select>
            </section>
        </div>        
    </section>
</template>