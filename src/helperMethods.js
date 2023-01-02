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