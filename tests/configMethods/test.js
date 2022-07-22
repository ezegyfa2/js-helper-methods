require('../../src/configMethods')
require('../helperMethods')
const fs = require("fs")
const path = require('path');
replaceConfigFileTemplates(path.join(testFolderPath, 'configMethods', 'resources', 'welcome.json'))
/*
let resourcePath = path.join(testFolderPath, 'configMethods', 'resources', 'replaceTemplates')
let templatesWithoutParamsResourcePath = path.join(resourcePath, 'templatesWithoutParams')
let templatesWithParamsResourcePath = path.join(resourcePath, 'templatesWithParams')

function replaceConfigResourceTest(resourceFolderPath) {
    replaceConfigTest(path.join(resourceFolderPath, 'objectToTest.json'), path.join(resourceFolderPath, 'expectedObject.json'))
}

function replaceConfigTest(testResourcePath, expectedResultResourcePath) {
    let resultObject = replaceConfigTemplates(JSON.parse(fs.readFileSync(testResourcePath)), path.dirname(testResourcePath))
    let expectedObject = JSON.parse(fs.readFileSync(expectedResultResourcePath))
    compareValues(resultObject, expectedObject)
}


replaceConfigResourceTest(path.join(templatesWithoutParamsResourcePath, 'simpleTemplate'))
replaceConfigResourceTest(path.join(templatesWithoutParamsResourcePath, 'multipleTemplate', '1'))
replaceConfigResourceTest(path.join(templatesWithoutParamsResourcePath, 'multipleTemplate', '2'))
replaceConfigResourceTest(path.join(templatesWithoutParamsResourcePath, 'multiLevelTemplate'))

replaceConfigResourceTest(path.join(templatesWithParamsResourcePath, 'simpleTemplate', '1'))
replaceConfigResourceTest(path.join(templatesWithParamsResourcePath, 'simpleTemplate', '2'))
replaceConfigResourceTest(path.join(templatesWithParamsResourcePath, 'multipleTemplate'))
replaceConfigResourceTest(path.join(templatesWithParamsResourcePath, 'multiLevelTemplate'))
replaceConfigResourceTest(path.join(templatesWithParamsResourcePath, 'templateWithArrayParams', 'simpleTemplate', '1'))
replaceConfigResourceTest(path.join(templatesWithParamsResourcePath, 'templateWithArrayParams', 'simpleTemplate', '2'))
*/