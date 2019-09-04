global.isEmptyString = function(text) {
	if (text === null)
		return true
	else if (typeof text != 'string')
		throw new Error('Invalid parameter type for text: ' + typeof text)
	else
		return text == ''
}
