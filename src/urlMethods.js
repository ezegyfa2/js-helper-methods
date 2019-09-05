checkGlobalNameIsOccupied('setUrlParameter')

function setUrlParameter(url, parameterName, parameterValue) {
	checkVariableType(url, 'url', 'string')
	checkVariableType(parameterName, 'parameterName', 'string')
    var urlCreator = new URL(url)
    urlCreator.searchParams.set(parameterName, parameterValue)
    return urlCreator.toString()
}