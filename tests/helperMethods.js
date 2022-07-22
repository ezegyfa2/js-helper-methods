const fs = require("fs")
require('./../src/objectMethods')

global.resourceTest = function(testResource, expectedResultResource, changeFunction) {
    let resultObject = changeFunction(JSON.parse(fs.readFileSync(testResource)))
    let expectedObject = JSON.parse(fs.readFileSync(expectedResultResource))
    compareValues(resultObject, expectedObject)
}

global.compareValues = function(objectToTest, expectedObject) {
    let differences = getObjectDifferences(objectToTest, expectedObject)
    if (differences.length == 0) {
        console.log('Test passed')
    }
    else {
        console.log('Test failed')
        console.log(differences)
        console.log('Result object')
        console.log(JSON.stringify(objectToTest))
        console.log('Expected object')
        console.log(JSON.stringify(expectedObject))
    }
}

global.testFolderPath = __dirname
