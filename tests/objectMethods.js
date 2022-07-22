require('./helperMethods')
require('../src/objectMethods')

function getObjectSubPropertyTest(objectToTest, subPropertyPath, expectedValue) {
    let result = getObjectSubProperty(objectToTest, subPropertyPath)
    compareValues(result, expectedValue)
}


getObjectSubPropertyTest({a: 3}, 'a', 3)
getObjectSubPropertyTest({a: {b:{c:3}}}, 'a.b.c', 3)
getObjectSubPropertyTest({a: 3,a1: {b:{c:3}},a2: {b:{c:3}},a3: {b:{c:3}}}, 'a3.b.c', 3)
getObjectSubPropertyTest({a: 3,a1: {b:{c:3}},a2: {b:{c:3}},a3: {b:{c:3}}}, 'a3.b', {c:3})
