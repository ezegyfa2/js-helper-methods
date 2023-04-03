global.checkGlobalNameIsOccupied = function(...namesToCheck) {
	for (var i = 0; i < namesToCheck.length; i++)
		if (namesToCheck[i] in global)
			throw new Error('global ' + namesToCheck[i] + ' is ocupied')
}

checkGlobalNameIsOccupied('checkIsEmptyString', 'checkObjectHasProperty', 'checkVariableType')

global.checkIsEmptyString = function(variableToCheck, variableName) {
    checkVariableType(variableName, 'variableName', 'string')
    checkVariableType(variableToCheck, variableName, 'string')
    if (isEmptyString(variableToCheck))
        throw new Error(variableName + ' is empty.')
}

global.checkObjectHasProperty = function(objectToCheck, propertyName) {
	checkVariableType(propertyName, 'propertyName', 'string')
	checkVariableType(objectToCheck, 'objectToCheck', 'object')
	if (!(propertyName in objectToCheck))
        throw new Error(propertyName + ' is undefined')
}

global.checkVariableType = function(variableToCheck, variableName, expectedTypeName) {
	if (typeof expectedTypeName != 'string')
		throw new Error('Invalid expectedTypeName ' + JSON.stringify(expectedTypeName))
	else if (expectedTypeName == 'array') {
		if (!Array.isArray(variableToCheck)) {
			throw invalidVariableTypeError(variableToCheck, variableName, expectedTypeName)
		}
	}
	else if (typeof variableToCheck !== expectedTypeName)
		throw invalidVariableTypeError(variableToCheck, variableName, expectedTypeName)
}

