require('../objectMethods')
const fs = require('fs')

let objectToConvert = JSON.parse(fs.readFileSync('coTemplate.json'))
let convertedObject = convertToPHPObject(objectToConvert)
fs.writeFileSync('coPHP.txt', convertedObject)
