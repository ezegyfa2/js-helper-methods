require('./objectMethods')

global.addIdToConfigArrays = function(config) {
    for (const [key, value] of Object.entries(config)) {
        if (typeof(value) == 'object') {
            if (Array.isArray(value)) {
                //value
            }
            else {
                addIdToConfigArrays(value)
            }
        }
    }
}

global.replaceConfigTemplates = function(config) {
    do {
        global.configChanged = false
        config = replaceUpperConfigTemplates(config)
    }
    while (configChanged)
    return config
}

global.replaceUpperConfigTemplates = function(config) {
    if (Array.isArray(config)) {
        return config.map(function(configValue) {
            return replaceUpperConfigTemplates(configValue)
        })
    }
    else if (typeof(config) == 'object') {
        if ('template_path' in config) {
            return replaceTemplate(config)
        }
        else {
            return replaceObjectTemplateProperties(config)
        }
    }
    else {
        return config
    }
}

function replaceObjectTemplateProperties(config) {
    for (const [key, value] of Object.entries(config)) {
        if (value == null) {
            config[key] = null
        }
        else if (Array.isArray(value)) {
            config[key] = value.map(function(configValue) {
                return replaceUpperConfigTemplates(configValue)
            })
        }
        else if (typeof(value) == 'object') {
            if ('template_path' in value) {
                config[key] = replaceTemplate(value)
            }
            else {
                config[key] = replaceUpperConfigTemplates(value)
            }
        }
    }
    return config
}

function replaceTemplate(config) {
    console.log(global.templates)
    console.log(config.template_path)
    let templateConfig = getObjectSubProperty(global.templates, config.template_path)
    if ('params' in config) {
        do {
            paramChanged = false
            templateConfig = replaceTemplateParams(templateConfig, config.params)
        } while (paramChanged)
    }
    global.configChanged = true
    return templateConfig
}

function replaceTemplateParams(templateConfig, params) {
    if (Array.isArray(templateConfig)) {
        let arrayConfigValue = []
        templateConfig.forEach(function(configValue) {
            if (Array.isArray(configValue)) {
                arrayConfigValue.push(replaceTemplateParams(configValue, params))
            }
            else if (typeof configValue == 'object') {
                if ('array_data' in configValue) {
                    let mergeToParent = configValue.merge_to_parent
                    let arrayData = createArrayConfig(configValue, params[configValue.array_data], configValue.array_data)
                    if (mergeToParent) {
                        arrayConfigValue = arrayConfigValue.concat(arrayData)
                    }
                    else {
                        arrayConfigValue.push(arrayData)
                    }
                }
                else {
                    arrayConfigValue.push(replaceTemplateParams(configValue, params))
                }
            }
            else {
                arrayConfigValue.push(configValue)
            }
        })
        return arrayConfigValue
    }
    else if (typeof(templateConfig) == 'object') {
        for (const [key, value] of Object.entries(templateConfig)) {
            if (Array.isArray(value)) {
                templateConfig[key] = replaceTemplateParams(value, params)
            }
            else if (typeof(value) == 'object') {
                if (value == null) {
                    templateConfig[key] = null
                }
                else if ('array_data' in value) {
                    templateConfig[key] = createArrayConfig(value, params[value.array_data], value.array_data)
                }
                else {
                    templateConfig[key] = getConfigValue(value, params)
                }
            }
            else {
                templateConfig[key] = getConfigValue(value, params)
            }
        }
        return templateConfig
    }
    else {
        return templateConfig
    }
}

function createArrayConfig(config, arrayParam, arrayParamName) {
    delete config.array_data
    delete config.merge_to_parent
    return arrayParam.map(function(param) {
        let configParam = {}
        configParam[arrayParamName] = param
        return replaceTemplateParams(JSON.parse(JSON.stringify(config)), configParam)
    })
}

function getConfigValue(value, params) {
    if (typeof value == 'string') {
        if (value.indexOf('++') == 0) {
            let valueToCheck = value.substring(2)
            let replacedValue = getObjectSubProperty(params, valueToCheck, value)
            if (replacedValue != value) {
                paramChanged = true
            }
            return replacedValue
        }
        else {
            return value
        }
    }
    else {
        return replaceTemplateParams(value, params)
    }
}

global.changeConfig = function(config, newValues) {
    if ('type' in config && 'data' in config && Object.entries(config).length == 2) {
        changeConfig(config.data, newValues)
    }
    else {
        for (const [key, newValue] of Object.entries(newValues)) {
            if (key in config && !Array.isArray(newValues[key])) {
                if (Array.isArray(config[key])) {
                    for (let i = 0; i < config[key].length; ++i) {
                        changeConfigValue(config[key], i, newValue)
                    }
                }
                else {
                    changeConfigValue(config, key, newValue)
                }
            }
            else {
                config[key] = newValue
            }
        }
    }
}

function changeConfigValue(objectToChange, propertyName, newValue) {
    if (typeof(newValue) == 'object') {
        changeConfig(objectToChange[propertyName], newValue)
    }
    else {
        objectToChange[propertyName] = newValue
    }
}

global.createConfig = function(aliases, newValues, template) {
    for (const [keyToChange, newValue] of Object.entries(newValues)) {
        if (keyToChange in aliases) {
            changeTemplateValue(template, aliases[keyToChange], newValue)
        }
        else {
            throw new InvalidConfigAliasError(key, aliases)
        }
    }
}

function changeTemplateValue(template, alias, newValue) {
    let propertyNames = alias.split('.')
    let propertyToChange = template
    for (let i = 0; i < propertyNames.length - 1; ++i) {
        if (propertyNames[i] in propertyToChange) {
            propertyToChange = propertyToChange[propertyNames[i]]
        }
        else {
            throw new InvalidConfigTemplateError(template, alias)
        }
    }
    propertyToChange[propertyNames[propertyNames.length - 1]] = newValue
}
