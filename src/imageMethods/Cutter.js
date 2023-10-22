const CutterResizer = require('./CutterResizer')

class Cutter extends CutterResizer {
    constructor(options) {
        super(options)
        this.options.resize = false
        this.options.extract = true
    }
}

module.exports = Cutter;
