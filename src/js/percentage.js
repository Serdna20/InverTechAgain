function inputPercentage(elementPercentage) {

    let amount = document.getElementById(elementPercentage)

    const n = amount.value.replace('%','');
    if ( n >= 0 && n <= 100 ) {
        amount.value = amount.value.replace('%','') + '%'     
    } else {
        amount.value = n.slice(0, -1) + '%'  
    }

}

export { inputPercentage }  