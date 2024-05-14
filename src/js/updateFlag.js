
function updateFlag(magicId, extraId) {
    for (let index = 0; index < 7; index++) {
        var elementId = "#flag"+extraId+index
        if (index == magicId) {
            document.querySelector(elementId).style.display = "block"
            continue
        }
        document.querySelector(elementId).style.display = "none"
    }
}

export { updateFlag };