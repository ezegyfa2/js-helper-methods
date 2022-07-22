const fs = require("fs");
require('./../src/checkingMethods')

function compareObjects(objectToCheck, expectedObject, expectedDifferencies) {
    let differences = getObjectDifferences(objectToCheck, expectedObject)
    if (isSameDifferences(differences, expectedDifferencies)) {
        console.log('Test passed')
    }
    else {
        console.log('Test failed')
        console.log('Result object')
        console.log(differences)
        console.log('Expected object')
        console.log(expectedDifferencies)
    }
}

function isSameDifferences(differencies, expectedDifferencies) {
    if (differencies.length == expectedDifferencies.length) {
        for (let i = 0; i < differencies.length; ++i) {
            if (differencies[i] != expectedDifferencies[i]) {
                return false
            }
        }
    }
    else {
        return false
    }
    return true
}

function compareWithClonedObjectTest(objectToCheck) {
    sameValuesTest(objectToCheck, Object.assign({}, objectToCheck))
}

function sameValuesTest(objectToCheck, expectedObject) {
    let differencies = getObjectDifferences(objectToCheck, expectedObject)
    if (differencies.length == 0) {
        console.log('Test passed')
    }
    else {
        console.log('Test failed')
        console.log('Result object')
        console.log(differencies)
        console.log('Expected object')
        console.log([])
    }
}


let objectToCheck = {}

sameValuesTest(null, null)
sameValuesTest(null, null)
sameValuesTest(3, 3)
sameValuesTest('', '')
sameValuesTest('text', 'text')
sameValuesTest(objectToCheck.undefinedProperty, objectToCheck.undefinedProperty2)

compareWithClonedObjectTest({})
compareWithClonedObjectTest({
    a: 1
})
compareWithClonedObjectTest({
    a: 1,
    b: 2,
    c: 'text',
    d: null,
    e: objectToCheck.undefinedProperty
})
compareWithClonedObjectTest({
    a: {},
    b: 2,
    c: 'text',
    d: null,
    e: objectToCheck.undefinedProperty
})
compareWithClonedObjectTest({
    a: {},
    b: {
        a1: 2,
        b1: 'text',
        c1: null
    },
    c: 'text',
    d: null,
    e: objectToCheck.undefinedProperty
})
compareWithClonedObjectTest({
    a: {},
    b: {
        a1: 2,
        b1: 'text',
        c1: null,
        d1: {
            a2: 3,
            b2: 'text',
            c2: null
        }
    },
    c: 'text',
    d: null,
    e: objectToCheck.undefinedProperty
})
compareWithClonedObjectTest({
    a: {},
    b: {
        a1: 2,
        b1: 'text',
        c1: null,
        d1: {
            a2: 3,
            b2: 'text',
            c2: null
        }
    },
    c: {
        a1: 2,
        b1: 'text',
        c1: null,
        d1: {
            a2: 3,
            b2: 'text',
            c2: null,
            d2: {
                a3: 2,
                b3: 'text',
                c3: null,
                d3: {
                    a4: 3,
                    b4: 'text',
                    c4: null
                }
            },
        }
    },
    d: null,
    e: objectToCheck.undefinedProperty
})

compareObjects({}, {a: 3}, ['Variable'])
compareObjects({a: 4}, {a: 3}, ['Variable.a'])
compareObjects({a: null}, {a: 3}, ['Variable.a'])
compareObjects({a: 3}, {a: null}, ['Variable.a'])
compareObjects({a: null, b: 4}, {a: null, b: 3}, ['Variable.b'])
compareObjects({b: 4}, {a: 3}, ['Variable.b'])
compareObjects({b: 4}, {b: 4, a: 3}, ['Variable'])
compareObjects({b: 4}, {b: {}}, ['Variable.b'])
compareObjects({b: { a: 4}}, {b: { a: 5}}, ['Variable.b.a'])
