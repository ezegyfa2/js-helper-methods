global.getObjectDifferences = function(objectToCheck, expectedObject) {
    let differences = []
    collectObjectDifferences(objectToCheck, expectedObject, 'Variable', differences)
    return differences
}

global.collectObjectDifferences = function(objectToCheck, expectedObject, fieldPath, differences) {
    if (objectToCheck != null || expectedObject != null) {
        if ((objectToCheck == null && expectedObject != null) || (objectToCheck != null && expectedObject == null)) {
            differences.push(fieldPath)
        }
        else if (typeof(objectToCheck) == 'undefined') {
            if (typeof(expectedObject) != 'undefined') {
                differences.push(fieldPath)
            }
        }
        else if (Array.isArray(objectToCheck)) {
            if (!Array.isArray(expectedObject) || objectToCheck.length != expectedObject.length) {
                differences.push(fieldPath)
            }
            else {
                for (let i = 0; i < objectToCheck.length; ++i) {
                    collectObjectDifferences(objectToCheck[i], expectedObject[i], fieldPath + '[' + i + ']', differences)
                }
            }
        }
        else if (typeof(objectToCheck) == 'object') {
            if (typeof(expectedObject) == 'object') {
                objectToCheckProperties = Object.entries(objectToCheck)
                expectedObjectProperties = Object.entries(expectedObject)
                if (objectToCheckProperties.length == expectedObjectProperties.length) {
                    for (const [key, value] of objectToCheckProperties) {
                        collectObjectDifferences(value, expectedObject[key], fieldPath  + '.' + key, differences)
                    }
                }
                else {
                    differences.push(fieldPath)
                }
            }
            else {
                differences.push(fieldPath)
            }
        }
        else {
            if (objectToCheck != expectedObject) {
                differences.push(fieldPath)
            }
        }
    }
}

global.getObjectSubProperty = function(parent, propertyPath, defaultValue) {
    let propertyNames = propertyPath.split('.')
    let property = parent
    for (const propertyName of propertyNames) {
        if (property && typeof(property) == 'object' && propertyName in property) {
            property = property[propertyName]
        }
        else {
            return defaultValue
        }
    }
    return property
}

replaceAll = (target, search, replacement) => {
    return target.split(search).join(replacement)
}

global.convertToPHPObject = function(objectToConvert) {
    let json = JSON.stringify(objectToConvert, null, 4)
    json = replaceAll(json, ':', ' =>')
    json = replaceAll(json,'{', '(object) [')
    json = replaceAll(json,'}', ']')
    return json
}

global.getType = name => {
    switch (name) {
        case 'String':
            return String
        case 'Boolean':
            return Boolean
        case 'Number':
            return Number
        case 'Object':
            return Object
        case 'Function':
            return Function
        default:
            throw new Error('Invalid type name: ' + name)
    }
}

collectObjectValuesRecursively = objectToCheck => {
    if (Array.isArray(objectToCheck)) {
        let collectedValues = [];
        objectToCheck.forEach(objectValue => {
            collectedValues.push(...collectObjectValuesRecursively(objectValue))
        })
        return collectedValues
    }
    else if (objectToCheck && typeof objectToCheck == "object") {
        let collectedValues = []
        for (const [ key, value ] of Object.entries(objectToCheck)) {
            collectedValues.push(...collectObjectValuesRecursively(value))
        }
        return collectedValues
    }
    else {
        return [ objectToCheck ]
    }
}
