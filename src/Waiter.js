global.Waiter = class Waiter {
	constructor(millisecForWait) {
		checkVariableType(millisecForWait, 'millisecForWait', 'number')
		this.millisecForWait = millisecForWait
		this.timeout = null
	}

	resetAndExecute(functionToExecute) {
		clearTimeout(this.timeout)
		this.timeout = setTimeout(() => {
			functionToExecute()
		}, this.millisecForWait)
	}
}
