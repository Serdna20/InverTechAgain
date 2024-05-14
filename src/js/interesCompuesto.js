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

export { capital, tasa, inicial, final, checkbox };