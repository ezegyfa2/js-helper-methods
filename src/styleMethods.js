checkGlobalNameIsOccupied('alignHeights')

global.alignHeightsBySelector = function(selector) {
    alignHeights(Array.from(document.querySelectorAll(selector)))
}

global.alignHeights = function(itemsToAlign) {
    let maxHeight = Math.max(...itemsToAlign.map(function(item) {
        return item.clientHeight
    }))
    itemsToAlign.forEach(function(item) {
        if (item.clientHeight < maxHeight) {
            item.style.height = maxHeight + 'px'
        }
    })
}
