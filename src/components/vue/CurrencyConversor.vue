<script setup>
    import ArrowRight from '../vueIcons/ArrowRight.vue';
    import FlagColombia from "../vueIcons/Flags/FlagColombia.vue";
    import FlagMexico from "../vueIcons/Flags/FlagMexico.vue";
    import FlagUnitedStates from "../vueIcons/Flags/FlagUnitedStates.vue";
    import FlagEuropean from "../vueIcons/Flags/FlagEuropean.vue";
    import FlagJapan from "../vueIcons/Flags/FlagJapan.vue";
    import FlagUnitedKingdom from "../vueIcons/Flags/FlagUnitedKingdom.vue";
    import FlagChina from "../vueIcons/Flags/FlagChina.vue";

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
    
    let initial1Final = ref(0)
    let final1Initial = ref(0)
    let stored1 = ref(1)

    let initialSymbol = ref('')
    let finalSymbol = ref('')

    function validateValue() {
        if (valueToConvert.value < 0) {
            valueToConvert.value = 0
        }

        valueToDisplay.value = valueToConvert.value
        valueConverted.value = convertCurrency(valueToConvert).toFixed(3)

        initialName.value = currencyNames[initialCurrency.value]
        finalName.value = currencyNames[finalCurrency.value]
        initialSymbol.value = symbolArray[initialCurrency.value]
        finalSymbol.value = symbolArray[finalCurrency.value]
        
        initial1Final.value = convertCurrency(stored1)
        final1Initial.value = convertCurrency11(stored1)
    }

    function convertCurrency(amount) {
        return (amount.value*currencyArray[finalCurrency.value]/currencyArray[initialCurrency.value])
    }

    function convertCurrency11(amount) {
        return (amount.value*currencyArray[initialCurrency.value]/currencyArray[finalCurrency.value])
    }

</script>

<template>
    <section class="w-full flex flex-col justify-center items-center">
        <div class="flex flex-row justify-between items-center w-4/5 mb-10">
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
                <p class="pl-2">Cantidad</p>
                <input v-model="valueToConvert" @change="validateValue()" type="number" class="h-10 outline-none border border-1 appearance-none pl-2 py-2 w-48">
            </section>
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
                <p class="pl-2">De:</p>
                <div class="flex flex-row border border-1">
                    <section>
                        <FlagColombia v-if="initialCurrency==0"></FlagColombia>
                        <FlagMexico v-if="initialCurrency==1"></FlagMexico>
                        <FlagUnitedStates v-if="initialCurrency==2"></FlagUnitedStates>
                        <FlagEuropean v-if="initialCurrency==3"></FlagEuropean>
                        <FlagJapan v-if="initialCurrency==4"></FlagJapan>
                        <FlagUnitedKingdom v-if="initialCurrency==5"></FlagUnitedKingdom>
                        <FlagChina v-if="initialCurrency==6"></FlagChina>
                    </section>
                    <select v-model="initialCurrency" @change="validateValue()" class="appearance-none h-10 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
                        <option value="0">Peso Colombiano (COP)</option>
                        <option value="1">Peso Mexicano (MXN)</option>
                        <option value="2">Dolar (USD)</option>
                        <option value="3">Euro (EUR)</option>
                        <option value="4">Yen Japonés (JPY)</option>
                        <option value="5">Libra Esterlina (GBP)</option>
                        <option value="6">Yuan Chino (CNY)</option>
                    </select>
                </div>                
            </section>
            <ArrowRight></ArrowRight>
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
                <p class="pl-2">A:</p>
                <div class="flex flex-row border border-1">
                    <section>
                        <FlagColombia v-if="finalCurrency==0"></FlagColombia>
                        <FlagMexico v-if="finalCurrency==1"></FlagMexico>
                        <FlagUnitedStates v-if="finalCurrency==2"></FlagUnitedStates>
                        <FlagEuropean v-if="finalCurrency==3"></FlagEuropean>
                        <FlagJapan v-if="finalCurrency==4"></FlagJapan>
                        <FlagUnitedKingdom v-if="finalCurrency==5"></FlagUnitedKingdom>
                        <FlagChina v-if="finalCurrency==6"></FlagChina>
                    </section>
                    <select v-model="finalCurrency" @change="validateValue()" class="appearance-none h-10 border border-1 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
                        <option value="0">Peso Colombiano (COP)</option>
                        <option value="1">Peso Mexicano (MXN)</option>
                        <option value="2">Dolar (USD)</option>
                        <option value="3">Euro (EUR)</option>
                        <option value="4">Yen Japonés (JPY)</option>
                        <option value="5">Libra Esterlina (GBP)</option>
                        <option value="6">Yuan Chino (CNY)</option>
                    </select>
                </div>                
            </section>
        </div>
        <div v-if="valueToDisplay" class="pl-2 flex flex-col justify-start items-start w-4/5 gap-2">
            <h2 class="">{{ valueToDisplay }} {{ initialName }} =</h2>
            <h1 class="text-2xl font-bold font-sans">{{ valueConverted }} {{ finalName }}</h1>
            <h1 v-if="finalSymbol != initialSymbol" class="text-sm text-slate-500">1 {{ initialSymbol }} = {{ initial1Final }} {{ finalSymbol }}</h1>
            <h1 v-if="finalSymbol != initialSymbol" class="text-sm text-slate-500">1 {{ finalSymbol }} = {{ final1Initial }} {{ initialSymbol }}</h1>
        </div>
    </section>
</template>