<script setup>

    import FlagColombia from "../vueIcons/Flags/FlagColombia.vue";
    import FlagMexico from "../vueIcons/Flags/FlagMexico.vue";
    import FlagUnitedStates from "../vueIcons/Flags/FlagUnitedStates.vue";
    import FlagEuropean from "../vueIcons/Flags/FlagEuropean.vue";
    import FlagJapan from "../vueIcons/Flags/FlagJapan.vue";
    import FlagUnitedKingdom from "../vueIcons/Flags/FlagUnitedKingdom.vue";
    import FlagChina from "../vueIcons/Flags/FlagChina.vue";
    import { ref } from 'vue'

    let initialAmount = ref(0)

    const symbolArray = ["$ COP", "$ MXN", "$ USD", "€ EUR", "¥ JPY", "£ GBP", "¥ CNY"]
    const currencyArray = [3858.18, 17.06, 1, 0.93, 157.41, 0.79, 7.27]
    const currencyNames = ["Pesos Colombianos", "Pesos Mexicanos", "Dólares Estadounidenses", "Euros", "Yenes Japoneses", "Libras Esterlinas", "Yuanes Chinos"]

    let initialCurrency = ref(0)
    let interest = ref(0)
    let periods = ref(1)

    function validateValues() {
        if (interest.value < 0 || interest.value > 99) {interest.value = 0}
        if (initialAmount.value < 0) {initialAmount.value = 0}
        if (periods.value < 1) {periods.value = 1}
    }

</script>

<template>
    <section class="w-full flex flex-col justify-center items-center">
        <p>Datos principales</p>
        <div class="flex flex-row justify-between items-center w-4/5 mb-10">
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Cantidad</p>
                <input v-model="initialAmount" @change="validateValues()" type="number" class="h-10 outline-none border border-1 appearance-none px-2 py-2 w-48">
            </section>
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Moneda a usar:</p>
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
                    <select v-model="initialCurrency" @change="" class="appearance-none h-10 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
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
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Interés (%)</p>
                <div class="border border-1 flex flex-row justify-center items-center w-48 gap-1">
                    <input v-model="interest" @change="validateValues()" type="number" class="h-10 outline-none appearance-none pl-2 py-2 w-40">
                    <p class="text-left">%</p>
                </div>                
            </section>
            <section class="flex font-semibold flex-col justify-start items-start">
                <p class="pl-2">Periodos</p>
                <input v-model="periods" @change="validateValues()" type="number" class="h-10 outline-none border border-1 appearance-none px-2 py-2 w-48">
            </section>
        </div>        
    </section>
</template>