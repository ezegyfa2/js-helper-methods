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
        if (propertyName in property) {
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