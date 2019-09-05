checkGlobalNameIsOccupied('invalidVariableTypeError')

global.invalidVariableTypeError = function(variableToCheck, variableName, expectedTypeName) {
	if (typeof variableName != 'string')
		if (typeof expectedTypeName != 'string')
			return new Error(
				'Invalid type for variable. The current type is ' + typeof variableToCheck + 
				' (invalid error parameters: variableName, expectedTypeName).'
			)
		else
			return new Error(
				'Invalid type for variable ' + 
				'. The expected type is ' + expectedTypeName + 
				' and the current type is ' + typeof variableToCheck + 
				' (invalid error parameters: variableName).'
			)
	else
		return new Error(
			'Invalid type for variable ' + variableName + 
			'. The expected type is ' + expectedTypeName + 
			' and the current type is ' + typeof variableToCheck + '.'
		)
}