
const symbolArray = ["$ COP", "$ MXN", "$ USD", "€ EUR", "¥ JPY", "£ GBP", "¥ CNY"]
const currencyArray = [3914, 17, 1, 0.9399, 156.22, 0.7986, 7.2411]

var monedaInicial = document.querySelector("#monedaInicial")
var monedaFinal = document.querySelector("#monedaFinal")

function convertCurrency(amount) {
    
    // amount: money amount
    // initial: index that indicates the conversion
    // final: index that indiciates the output

    // needs to import the array    

    return (amount*currencyArray[monedaFinal.value]/currencyArray[monedaInicial.value]).toFixed(2)
}

// You always need to export those 
//  |
//  v

export { convertCurrency, monedaInicial, monedaFinal, symbolArray };