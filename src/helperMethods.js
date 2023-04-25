global.executeAfterCondition = function(functionToExecute, conditionFunction) {
    setTimeout(function() {
        if (conditionFunction()) {
            functionToExecute()
        }
        else {
            executeAfterCondition(functionToExecute, conditionFunction)
        }
    }, 100)
}

global.post = function(postParams) {
    switch (typeof postParams) {
        case 'string':
            return $.post({
                url: postParams
            })
        case 'object':
            if ('data' in postParams) {
                postParams.data._token = getCsrfToken()
            }
            return $.post(postParams)
        default:
            throw new Error('Invalid post params')
    }
}

global.getCsrfToken = function() {
    return document.querySelector('meta[name="csrf-token"]').content
}
