<script setup>

    import { updateFlag } from '../../js/updateFlag';

    const props = defineProps({
        titulo: String,
        separador: String,
        idSelect: String
    })

    function updateFlags() {
        let magicId = document.querySelector("#".concat("", props.idSelect)).value
        updateFlag(magicId, props.separador)
    }

</script>

<template>
    <section class="w-[48%] p-2 items-center gap-5
    rounded flex-row flex justify-around h-[130px]">
        <div class="border-1 border w-8 h-6">
            <slot></slot>  
        </div>
        <section class="flex flex-col justify-center items-center gap-2">
            <h1 class="font-semibold text-center">{{ titulo }}</h1>
            <label for="inicial"></label>
            <div class="flex justify-center items-center bg-white flex-col">
                <select @change="updateFlags()" :id="props.idSelect" class="appearance-none p-1 border border-1 outline-none" name="currencyList" form="currencyForm">
                    <option value="0" selected>Peso Colombiano (COP)</option>
                    <option value="1">Peso Mexicano (MXN)</option>
                    <option value="2">Dolar (USD)</option>
                    <option value="3">Euro (EUR)</option>
                    <option value="4">Yen Japonés (JPY)</option>
                    <option value="5">Libra Esterlina (GBP)</option>
                    <option value="6">Yuan Chino (CNY)</option>
                </select>
            </div>
        </section>
    </section>
</template>