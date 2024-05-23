<script setup>

    import { ref } from 'vue'
    import MoneyList from './MoneyList.vue';

    const symbolArray = ["$ COP", "$ MXN", "$ USD", "€ EUR", "¥ JPY", "£ GBP", "¥ CNY"]
    const currencyArray = [3914, 17, 1, 0.9399, 156.22, 0.7986, 7.2411]
    let pickedIndex = ref( document.querySelector("#inicial").value )
    let pickedFinalIndex = ref( document.querySelector("#final").value )
    let initial = ref( document.querySelector("#capitalInicial").value )
    let people = ref( document.querySelector("#cantidadPersonas").value )
    let totalEarnings = ref(0)
    let incomings = ref(0)
    let daily = ref(0)
    let monthly = ref(0)
    let spendings = ref(0)
    let displayResults = ref(false)

    function convertCurrency(amount) {
    
    // amount: money amount
    // initial: index that indicates the conversion
    // final: index that indiciates the output

        return (amount*currencyArray[pickedFinalIndex.value]/currencyArray[pickedIndex.value]).toFixed(2)
    }

    function returnCurrencySymbol() {
        if (!(pickedFinalIndex.value == pickedIndex.value)){
            return symbolArray[pickedFinalIndex.value]
        }
        else {
            return symbolArray[pickedIndex.value]
        }
    }

    function updateValues() {
        displayResults.value = true
        initial.value = document.querySelector("#capitalInicial").value 
        incomings.value = document.querySelector("#salario-total").textContent
        daily.value = document.querySelector("#diario-total").textContent
        monthly.value = document.querySelector("#mensual-total").textContent
        pickedIndex.value = document.querySelector("#inicial").value
        pickedFinalIndex.value = document.querySelector("#final").value
        people.value = document.querySelector("#cantidadPersonas").value
        spendings.value = parseFloat(daily.value) + parseFloat(monthly.value)
        totalEarnings.value = parseFloat(parseFloat(parseFloat(initial.value) + parseFloat(spendings.value))+parseFloat(incomings.value))
    }

</script>

<template>
    <section class="border w-4/5 p-2 flex flex-col justify-center items-center gap-5">
        <button @click="updateValues" class="shadow-md bg-[color:var(--custom-orange)] active:bg-orange-600 text-white w-2/5 py-2 border-1 border-t-0 border outline-none rounded">Obtener informe / Refrescar</button>
        <section class="flex flex-row w-full justify-around items-center">
            <div v-if="displayResults">
                <p v-if="displayResults" class="text-center font-bold text-lg">Iniciaste con:</p>
                <p class="text-center font-semibold">{{ convertCurrency(initial) }} {{ returnCurrencySymbol() }}</p>
            </div>
            <div v-if="displayResults">
                <p v-if="displayResults" class="text-center font-bold text-lg">Ganaste:</p>
                <p class="text-center font-semibold">{{ convertCurrency(incomings) }} {{ returnCurrencySymbol() }}</p>
            </div>
            <div v-if="displayResults">
                <p v-if="displayResults" class="text-center font-bold text-lg">Gastaste:</p>
                <p class="text-center font-semibold">{{ convertCurrency(spendings) }} {{ returnCurrencySymbol() }}</p>
            </div>
            <div v-if="displayResults">
                <p v-if="displayResults" class="text-center font-bold text-lg">Terminaste con:</p>
                <p class="text-center font-semibold">{{ convertCurrency(totalEarnings) }} {{ returnCurrencySymbol() }}</p>
            </div>
        </section>       
    </section>
    <section v-if="displayResults">
        <p>¿Iniciar una meta?</p>
    </section>
</template>