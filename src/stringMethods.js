checkGlobalNameIsOccupied('isEmptyString')

global.isEmptyString = function(text) {
	if (text === null)
		return true
	else if (typeof text != 'string')
		throw new Error('Invalid parameter type for text: ' + typeof text)
	else
		return text == ''
}

Object.defineProperty(String.prototype, 'toUppercaseFirstLetter', {
	value: function() {
		return this.charAt(0).toUpperCase() + this.slice(1)
	},
	enumerable: false
})

global.concatenateStrings = function(stringsToConcatenate, concatenator) {
	result = ''
	stringsToConcatenate.forEach(stringToConcatenate => {
		result += stringToConcatenate + concatenator
	})
	return result.substr(0, result.length - concatenator.length)
}