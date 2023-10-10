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

Object.defineProperty(String.prototype, 'splitToFullParts', {
	value: function(splitter, partCount) {
		if (partCount > 0) {
			const textParts = this.split(splitter)
			if (textParts.length <= partCount) {
				return textParts
			}
			else {
				let result = []
				for (let i = 0; i < partCount - 1; ++i) {
					result.push(textParts[i])
				}
				const lastPart = textParts.slice(partCount - 1).join(splitter)
				result.push(lastPart)
				return result
			}
		}
		else {
			throw new Error('Invalid part count: ' + partCount)
		}
	},
	enumerable: false
})

global.shortString = (text, maxLength) => {
	if (!maxLength) {
		maxLength = 50
	}
	if (text.length > maxLength) {
		return text.substr(0, maxLength, 'UTF-8') + '...'
	}
	else {
		return text
	}
}