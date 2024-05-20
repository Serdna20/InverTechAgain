import { updateFlag } from '../js/updateFlag.js';
import { monedaInicial, monedaFinal } from '../js/currencies.js'

updateFlag(monedaInicial.value, "")
updateFlag(20, "-")

monedaFinal.style.display = "none"

monedaInicial.addEventListener("change", () => {
    updateFlag(monedaInicial.value, "")
})
        
monedaFinal.addEventListener("change", () => {
    updateFlag(monedaFinal.value, "-")
})

var capital = document.querySelector("#capital")

var tasa = document.querySelector("#tasa")
var inicial = document.querySelector("#inicial")
var final = document.querySelector("#final")
var checkbox = document.querySelector("#cbox1")

// Hell starts here

var generator = document.querySelector("#generator")
        var cleaner = document.querySelector("#cleaner")

        var generateIn = document.querySelector("#generateIn")

        cleaner.addEventListener("click", cleanInformation)

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                monedaFinal.style.display = "block"
                updateFlag(monedaFinal.value, "-")
                return
            }
            updateFlag(20, "-")
            monedaFinal.style.display = "none"          
        })

        generator.addEventListener("click", () => {
            validateYears()
            generateInformation()
        })

        function cleanInformation() {
            generateIn.innerHTML = ''
        }

        function generateInformation() {
            cleanInformation()
            for (let index = parseInt(inicial.value)-1; index < final.value; index++) {

                var capitalToAppend = (capital.value * Math.pow(1 + (tasa.value)/100, index)).toFixed(2)
                var interesToAppend = ((capitalToAppend*tasa.value)/100).toFixed(2)
                var capitalFinalToAppend = (capital.value * Math.pow(1 + (tasa.value)/100, parseInt(index)+1)).toFixed(2)
                var currencySymbol = symbolArray[monedaInicial.value]

                if (checkbox.checked) {
                    capitalToAppend         = convertCurrency(capitalToAppend)
                    interesToAppend         = convertCurrency(interesToAppend)
                    capitalFinalToAppend    = convertCurrency(capitalFinalToAppend)
                    currencySymbol = symbolArray[monedaFinal.value]
                }

                var toAppend = document.createElement('div');
                toAppend.innerHTML =  
                `
                    <section class="text-black rounded-md py-2 mb-3 text-lg w-full flex-col flex
                    justify-center items-center border-2 borderbg-[color:var(--custom-orange)]">
                        <h1 class="font-semibold text-black">Año #${parseInt(index)+1}</h1>
                        <div class="w-full flex-row flex justify-center items-center gap-5">
                            <div class="flex justify-center items-center flex-col w-1/3">
                                <h1 class="font-semibold text-black">Capital Inicial</h1>
                                <h2 class="text-black">${capitalToAppend+" "+currencySymbol}</h2>
                            </div>
                            <div class="flex justify-center items-center flex-col w-1/3">
                                <h1 class="font-semibold text-black">Interés</h1>
                                <h2 class="text-black">${interesToAppend+" "+currencySymbol}</h2>
                            </div>
                            <div class="flex justify-center items-center flex-col w-1/3">
                                <h1 class="font-semibold text-black">Capital Final</h1>
                                <h2 class="text-black">${capitalFinalToAppend+" "+currencySymbol}</h2>
                            </div>
                        </div>
                    </section>
                `;
                generateIn.appendChild(toAppend);
            }
            var totalGain = document.createElement('div');
            var moneyYearA = parseFloat((capital.value * Math.pow(1 + (tasa.value)/100, parseInt(inicial.value))))
            var moneyI = parseFloat((capital.value * Math.pow(1 + (tasa.value)/100, 0)))
            var moneyYearB = parseFloat((capital.value * Math.pow(1 + (tasa.value)/100, parseInt(final.value))))

            if (checkbox.checked) {
                moneyYearA = convertCurrency(moneyYearA)
                moneyYearB = convertCurrency(moneyYearB)
                moneyI = convertCurrency(moneyI)
            }

            moneyYearA = parseFloat((moneyYearA))
            moneyYearB = parseFloat((moneyYearB))
            moneyI = parseFloat((moneyI))

            totalGain.innerHTML = 
            `
            <section class="mb-3 flex flex-row justify-around items-center gap-5">
                <div class="w-1/3 bg-[color:var(--custom-orange)] rounded p-3 text-white font-semibold">
                    <p class="text-center">Ganancia desde el año ${inicial.value} al año ${final.value}: ${(moneyYearB-moneyYearA).toFixed(2)+" "+currencySymbol}</p>    
                </div>
                <div class="w-1/3 bg-[color:var(--custom-orange)] rounded p-3 text-white font-semibold">
                    <p class="text-center">Ganancia desde el inicio hasta el año ${final.value}: ${(moneyYearB-moneyI).toFixed(2)+" "+currencySymbol}</p>
                </div>
            </section>
            `
            generateIn.appendChild(totalGain);
        }

        function validateYears() {

            if (isNaN(inicial.value) || inicial.value == 0) {
                inicial.value = 1
            }

            if (isNaN(final.value) || final.value == 0) {
                final.value = 1
            }

            if (parseInt(inicial.value) > parseInt(final.value)) {
                const oldValues = [inicial.value, final.value]
                inicial.value = oldValues[1]
                final.value = oldValues[0]
            }

        }

export { capital, tasa, inicial, final, checkbox };