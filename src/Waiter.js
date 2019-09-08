class Waiter {
	constructor(millisecForWait) {
		checkVariableType(millisecForWait, 'millisecForWait', 'number')
		this.millisecForWait = millisecForWait
		this.timeout = null
	}

	resetAndExecute(functionToExecute) {
		checkVariableType(functionToExecute, 'functionToExecute', 'function')
		clearTimeout(this.timeout)
		this.timeout = setTimeout(function() {
			functionToExecute()
		}, this.millisecForWait);
	}
}
module.exports = Waiter