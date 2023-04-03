checkGlobalNameIsOccupied('invalidVariableTypeError')

global.invalidVariableTypeError = function(variableToCheck, variableName, expectedTypeName) {
	let variableNameMessage = ''
	let variableTypeMessage = ''
	let invalidParameterNames = []
	if (typeof variableName == 'string') {
		variableNameMessage = ' ' + variableName
		variableTypeMessage = ', current type: ' + typeof variableToCheck
	}
	else {
		invalidParameterNames.push('variableName')
	}
	let expectedTypeNameMessage = ''
	if (typeof expectedTypeName == 'string') {
		expectedTypeNameMessage = ', expected type: ' + expectedTypeName
	}
	else {
		invalidParameterNames.push('expectedTypeName')
	}
	let invalidParametersMessage = ''
	if (invalidParameterNames.length > 0) {
		invalidParametersMessage = ', invalid error parameters: ' + concatenateStrings(invalidParameterNames, ', ')
	}
	return 'Invalid type for variable' + variableNameMessage + variableTypeMessage + expectedTypeNameMessage + invalidParametersMessage
}