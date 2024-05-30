<script setup>
    import ArrowRight from '../vueIcons/ArrowRight.vue';
    import { ref } from 'vue'

    const symbolArray = ["$ COP", "$ MXN", "$ USD", "€ EUR", "¥ JPY", "£ GBP", "¥ CNY"]
    const currencyArray = [3858.18, 17.06, 1, 0.93, 157.41, 0.79, 7.27]
    const currencyNames = ["Pesos Colombianos", "Pesos Mexicanos", "Dólares Estadounidenses", "Euros", "Yenes Japoneses", "Libras Esterlinas", "Yuanes Chinos"]

    let initialCurrency = ref(0)
    let initialName = ref(currencyNames[initialCurrency.value])
    let finalCurrency = ref(2)
    let finalName = ref(currencyNames[finalCurrency.value])

    let valueToDisplay = ref()
    let valueToConvert = ref(0)    
    let valueConverted = ref(0)
    

    function validateValue() {
        if (valueToConvert.value < 0) {
            valueToConvert.value = 0
        }
        valueToDisplay.value = valueToConvert.value
        initialName = currencyNames[initialCurrency.value]  
        finalName = currencyNames[finalCurrency.value]  
        valueConverted.value = convertCurrency(valueToConvert)
    }

    function convertCurrency(amount) {
        return (amount.value*currencyArray[finalCurrency.value]/currencyArray[initialCurrency.value])
    }

</script>

<template>
    <section class="w-full flex flex-col justify-center items-center">
        <div class="flex flex-row justify-between items-center w-4/5 mb-10">
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Cantidad</p>
                <input v-model="valueToConvert" @change="validateValue()" type="number" class="h-10 outline-none border border-1 appearance-none pl-2 py-2 w-48">
            </section>
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">De:</p>
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
            <ArrowRight></ArrowRight>
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">A:</p>
                <select v-model="finalCurrency" @change="validateValue()" class="appearance-none h-10 border border-1 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
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
        <div v-if="valueToDisplay" class="pl-2 flex flex-col justify-start items-start w-4/5">
            <h2 class="text-opacity-50">{{ valueToDisplay }} {{ initialName }} =</h2>
            <h1 class="text-xl">{{ valueConverted }} {{ finalName }}</h1>
        </div>
    </section>
</template>