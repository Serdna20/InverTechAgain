<script setup>

    import FlagColombia from "../vueIcons/Flags/FlagColombia.vue";
    import FlagMexico from "../vueIcons/Flags/FlagMexico.vue";
    import FlagUnitedStates from "../vueIcons/Flags/FlagUnitedStates.vue";
    import FlagEuropean from "../vueIcons/Flags/FlagEuropean.vue";
    import FlagJapan from "../vueIcons/Flags/FlagJapan.vue";
    import FlagUnitedKingdom from "../vueIcons/Flags/FlagUnitedKingdom.vue";
    import FlagChina from "../vueIcons/Flags/FlagChina.vue";
    import { ref } from 'vue'

    let initialAmount = ref(1)

    const symbolArray = ["$ COP", "$ MXN", "$ USD", "€ EUR", "¥ JPY", "£ GBP", "¥ CNY"]
    const currencyArray = [3858.18, 17.06, 1, 0.93, 157.41, 0.79, 7.27]
    const currencyNames = ["Pesos Colombianos", "Pesos Mexicanos", "Dólares Estadounidenses", "Euros", "Yenes Japoneses", "Libras Esterlinas", "Yuanes Chinos"]

    let initialCurrency = ref(0)
    let finalCurrency = ref(7)
    let interest = ref(0)
    let periods = ref(1)
    let periodName = ref('')
    let full = ref(0)

    let periodsInfo = ref([])
    let displayingResults = ref(false)

    function validateValues() {
        if (interest.value < 0 || interest.value > 99) {interest.value = 0}
        if (initialAmount.value <= 0) {initialAmount.value = 1}
        if (periods.value < 1) {periods.value = 1}

        if (displayingResults.value == true) {
            displayResults()
        }
    }

    function convertCurrency(amount) {
        return (amount*currencyArray[finalCurrency.value]/currencyArray[initialCurrency.value])
    }

    function displayResults() {
        displayingResults.value = true
        periodsInfo.value = []

        if (periodName.value == "") {
            periodName.value = "Periodo"
        }

        for (let number = 0; number < periods.value; number++) {
            var valueToPush = (initialAmount.value)*Math.pow((1 + (interest.value/100)), (number+1))
            if (finalCurrency.value < 7) {valueToPush = convertCurrency(valueToPush)}
            periodsInfo.value.push(valueToPush.toFixed(2))   
        }
               
    }

</script>

<template>
    <section class="w-full flex flex-col justify-center items-center">
        <div class="w-4/5 flex flex-row justify-between items-center mb-3">
            <div class="w-2/5 h-[1px] bg-slate-300"></div>
            <p class="text-center text-sm">Datos principales</p>
            <div class="w-2/5 h-[1px] bg-slate-300"></div>
        </div>
        <div class="flex flex-row justify-between items-center w-4/5 mb-14 mt-2">
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
                <p class="pl-2">Inversión Inicial</p>
                <input v-model="initialAmount" @change="validateValues()" type="number" class="h-10 outline-none border border-1 appearance-none px-2 py-2 w-48">
            </section>
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
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
                    <select v-model="initialCurrency" @change="validateValues()" class="appearance-none h-10 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
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
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
                <p class="pl-2">Interés (%)</p>
                <div class="border border-1 flex flex-row justify-center items-center w-48 gap-1">
                    <input v-model="interest" @change="validateValues()" type="number" class="h-10 outline-none appearance-none pl-2 py-2 w-40">
                    <p class="text-left">%</p>
                </div>                
            </section>
            <section class="flex font-semibold flex-col justify-start items-start gap-1">
                <p class="pl-2">Periodos</p>
                <input v-model="periods" @change="validateValues()" type="number" class="h-10 outline-none border border-1 appearance-none px-2 py-2 w-48">
            </section>
        </div>

        <div class="w-4/5 flex flex-row justify-between items-center mb-3">
            <div class="w-2/5 h-[1px] bg-slate-300"></div>
            <p class="text-center text-sm">Datos adicionales</p>
            <div class="w-2/5 h-[1px] bg-slate-300"></div>
        </div>
        <div class="flex flex-row justify-between items-center w-4/5 mb-14 mt-2">
            <section class="flex font-semibold flex-col justify-start items-start gap-1 w-56">
                <p class="pl-2">Nombre de Periodo</p>
                <input v-model="periodName" placeholder="En blanco para ninguno" @change="validateValues()" type="text" class="h-10 outline-none border border-1 appearance-none px-2 py-2 w-full">
            </section>
            <section class="flex font-semibold flex-col justify-start items-start gap-1 w-56">
                <p class="pl-2">Convertir a:</p>
                <div class="flex flex-row border border-1">
                    <section>
                        <div class="w-[3.35rem] h-[2.5rem]" v-if="finalCurrency==7"></div>
                        <FlagColombia v-if="finalCurrency==0"></FlagColombia>
                        <FlagMexico v-if="finalCurrency==1"></FlagMexico>
                        <FlagUnitedStates v-if="finalCurrency==2"></FlagUnitedStates>
                        <FlagEuropean v-if="finalCurrency==3"></FlagEuropean>
                        <FlagJapan v-if="finalCurrency==4"></FlagJapan>
                        <FlagUnitedKingdom v-if="finalCurrency==5"></FlagUnitedKingdom>
                        <FlagChina v-if="finalCurrency==6"></FlagChina>
                    </section>
                    <select v-model="finalCurrency" @change="validateValues()" class="appearance-none h-10 border border-1 outline-none pl-2 py-2 w-48" name="currencyList" form="currencyForm">
                        <option value="0">Peso Colombiano (COP)</option>
                        <option value="1">Peso Mexicano (MXN)</option>
                        <option value="2">Dolar (USD)</option>
                        <option value="3">Euro (EUR)</option>
                        <option value="4">Yen Japonés (JPY)</option>
                        <option value="5">Libra Esterlina (GBP)</option>
                        <option value="6">Yuan Chino (CNY)</option>
                        <option value="7">Ninguna Moneda</option>
                    </select>
                </div>                
            </section>
            <section class="flex font-semibold flex-col justify-start items-start gap-1 w-56">
                <p class="pl-2">¿Mostrar valor por periodo?</p>
                <select v-model="full" class="appearance-none h-10 border border-1 outline-none pl-2 py-2 w-full" name="currencyList" form="currencyForm">
                    <option value="0">Si</option>
                    <option value="1">No</option>
                </select>
            </section>
        </div>
        
        <button @click="displayResults()" class="p-2 bg-[color:var(--custom-orange)]
                text-white font-semibold shadow-md 
                active:bg-orange-700 mb-14">
                Mostrar Resultados
        </button>

        <div v-if="displayingResults" class="w-4/5 flex flex-row justify-center items-center">
            <p class="h-10 text-center bg-[color:var(--custom-d-blue)] text-white w-1/4 flex items-center justify-center">
                {{periodName}}
            </p>
            <p class="h-10 text-center bg-[color:var(--custom-d-blue)] text-white w-3/4 flex items-center justify-center">
                Valor
            </p>
        </div>
        <div v-if="full==0" class="w-full flex flex-col justify-center items-center">
            <div v-for="(finalAmount, index) in periodsInfo" class="w-4/5 text-slate-800 flex flex-row justify-center items-center">
                <p :class="[{'bg-slate-50':index%2==0}, {'bg-slate-200':index%2!=0}]" class="h-10 text-center w-1/4 flex items-center justify-center">
                    <p>{{index+1}}</p>
                </p>
                <p :class="[{'bg-slate-50':index%2==0}, {'bg-slate-200':index%2!=0}]" class="h-10 text-center w-3/4 flex items-center justify-center">
                    {{finalAmount}}
                    <p v-if="finalCurrency==7" class="pl-1">{{ symbolArray[initialCurrency] }}</p>
                    <p v-if="finalCurrency!=7" class="pl-1">{{ symbolArray[finalCurrency] }}</p>
                </p>
            </div>            
        </div>
        <div v-if="full==1 && displayingResults" class="w-4/5 text-slate-800 flex flex-row justify-center items-center">
            <p class="h-10 text-center bg-slate-50 w-1/4 flex items-center justify-center">
                <p>{{periodsInfo.length}}</p>
            </p>
            <p class="h-10 text-center bg-slate-50 w-3/4 flex items-center justify-center">
                {{periodsInfo[periodsInfo.length-1]}}
                <p v-if="finalCurrency==7" class="pl-1">{{ symbolArray[initialCurrency] }}</p>
                <p v-if="finalCurrency!=7" class="pl-1">{{ symbolArray[finalCurrency] }}</p>
            </p>
        </div>
        <div class="mb-14"></div>
    </section>
</template>