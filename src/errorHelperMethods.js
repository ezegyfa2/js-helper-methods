function checkVariableType(variable, variableName, expectedTypeName) {
	if (typeof expectedTypeName != 'string')
		throw new Error('Invalid expectedTypeName ' + JSON.stringify(expectedTypeName))
	else if (typeof variable !== expectedTypeName)
		throw invalidVariableTypeError(variable, variableName, expectedTypeName)
}

function invalidVariableTypeError(variable, variableName, expectedTypeName) {
	if (typeof variableName != 'string')
		if (typeof expectedTypeName != 'string')
			return new Error(
				'Invalid type for variable. The current type is ' + typeof variable + 
				' (invalid error parameters: variableName, expectedTypeName).'
			)
		else
			return new Error(
				'Invalid type for variable ' + 
				'. The expected type is ' + expectedTypeName + 
				' and the current type is ' + typeof variable + 
				' (invalid error parameters: variableName).'
			)
	else
		return new Error(
			'Invalid type for variable ' + variableName + 
			'. The expected type is ' + expectedTypeName + 
			' and the current type is ' + typeof variable + '.'
		)
}