window.getCustomClasses = function(bootstrapClasses) {
    let customClasses = []
    let classes = collectClassesWithMultiplePresence()
    classes.forEach(function (collectedClass) {
        if (!bootstrapClasses.includes(collectedClass.name)) {
            customClasses.push(collectedClass)
        }
    })
    return customClasses
}

window.collectClassesWithMultiplePresence = function() {
    let collectedClasses = []
    collectClasses(document, collectedClasses)
    let classObjects = []
    for (var className in collectedClasses) {
        classObjects.push({
            name: className,
            presenceCount: collectedClasses[className]
        })
    }
    classObjects.sort(function(classObject1, classObject2) {
        return classObject2.presenceCount - classObject1.presenceCount
    })
    return classObjects.filter(function (classObject) {
        return classObject.presenceCount > 1
    })
}

window.collectClasses = function(htmlNode, collectedClasses) {
    if ('classList' in htmlNode) {
        htmlNode.classList.forEach(function(className) {
            if (className in collectedClasses) {
                ++collectedClasses[className]
            }
            else {
                collectedClasses[className] = 1
            }
        })
    }
    if ('childNodes' in htmlNode) {
        htmlNode.childNodes.forEach(function(childNode) {
            collectClasses(childNode, collectedClasses)
        })
    }
}
