<script setup>

    import { ref } from 'vue'

    const symbolArray = ["$ COP", "$ MXN", "$ USD", "€ EUR", "¥ JPY", "£ GBP", "¥ CNY"]

    let pickedIndex = ref( document.querySelector("#inicial").value )
    let peopleAmount = ref( document.querySelector("#cantidadPersonas").value )
    let moneyArray = ref([])
    let arraySize = ref(0)
    let finalValue = ref(0)
    let showingResults = ref(false)
    let maxValue = ref(0)
    let indexMaxValue = ref(0)
    let nameMaxValue = ref("")
    
    const props = defineProps({
        title: String,
        idText: String,
        informationText: String,
        hasName: Boolean,
        aporteGasto: String,
        multiplicador: Number
    })

    function addMoney() {
        moneyArray.value.push( "#"+props.idText.concat('-', arraySize.value+1) )
        arraySize.value = arraySize.value + 1
    }

    function removeMoney() {
        moneyArray.value.pop()
        if (!arraySize.value == 0) {
            arraySize.value = arraySize.value - 1
        }        
    }

    function showArray() {
        showingResults.value = true
        finalValue.value = 0
        maxValue.value = 0
        indexMaxValue.value = 0
        nameMaxValue.value = ""
        for (let index = 0; index < moneyArray.value.length; index++) {
            // alert( document.querySelector(moneyArray.value[index]).value  )
            let aporteMonetario = parseFloat(document.querySelector(moneyArray.value[index]).value)
            if (isNaN(aporteMonetario) || aporteMonetario.length == 0 || aporteMonetario == NaN) {
                aporteMonetario = 0
            }
            if (parseFloat(document.querySelector(moneyArray.value[index]).value) > maxValue.value) {
                maxValue.value = parseFloat(document.querySelector(moneyArray.value[index]).value)
                indexMaxValue.value = index
                if (props.hasName) {
                    nameMaxValue.value = document.querySelector("#"+props.idText.concat('-name-', index+1)).value
                }                
            }

            finalValue.value = finalValue.value + aporteMonetario
        }

        if (props.hasName) {
            if (nameMaxValue.value == "") {
                nameMaxValue.value = props.informationText.concat(" #", indexMaxValue.value+1)
            }
        }        

        pickedIndex.value = document.querySelector("#inicial").value
        peopleAmount.value = document.querySelector("#cantidadPersonas").value

        if (peopleAmount.value == 0) {
            peopleAmount.value = 1
        }
        
    }

</script>

<template>
    <section class="border w-[32%] p-2 flex flex-col justify-center items-center gap-5">
        <h1 class="text-center font-semibold">{{  title.toUpperCase() }}</h1>
        <div class="flex flex-row w-full justify-around items-center">
            <button @click="addMoney" class="shadow-md bg-[color:var(--custom-orange)] active:bg-orange-600 text-white w-2/5 border-1 border-t-0 border outline-none rounded">Agregar</button>
            <button @click="removeMoney" class="shadow-md bg-[color:var(--custom-orange)] active:bg-orange-600 text-white w-2/5 border-1 border-t-0 border outline-none rounded">Remover</button>
        </div>
        <div v-for="(moneySections, index) in moneyArray" class="w-full flex justify-around gap-5 flex-row items-center">
            <div>
                <p class="text-center font-semibold">{{ informationText }} #{{ index+1 }}</p>
                <input autocomplete="off" type="number" placeholder="En blanco para cero" :id="props.idText.concat('-', index+1)" class="w-full outline-none border px-2 py-1">
            </div>
            <div v-if="props.hasName">
                <p class="text-center font-semibold">Nombre #{{ index+1 }}</p>
                <input autocomplete="off" type="text" placeholder="Nombre su gasto" :id="props.idText.concat('-name-', index+1)" class="w-full outline-none border px-2 py-1">
            </div>            
        </div>
        <div v-if="arraySize>0" class="w-full flex justify-around gap-1 flex-col items-center">
            <button @click="showArray" class="shadow-md bg-[color:var(--custom-orange)] active:bg-orange-600 text-white w-4/5 border-1 border-t-0 border outline-none rounded">Mostrar/Refrescar Resultados</button>
            <div v-if="showingResults">
                <p v-if="props.idText != 'diario'">
                    {{  props.aporteGasto }} <span :id="props.idText.concat('-', 'total')">{{ finalValue*props.multiplicador }}</span> {{ symbolArray[pickedIndex] }}
                </p>
                <p v-if="props.idText == 'diario'">
                    {{  props.aporteGasto }} <span :id="props.idText.concat('-', 'total')">{{ finalValue*props.multiplicador*peopleAmount }}</span> {{ symbolArray[pickedIndex] }}
                </p>
                <p v-if="props.hasName">Mayor de los {{ props.aporteGasto.toLowerCase() }} {{ nameMaxValue }}</p>
            </div>
        </div>
    </section>
</template>