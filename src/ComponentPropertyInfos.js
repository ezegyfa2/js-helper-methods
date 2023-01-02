class ComponentPropertyInfos {
    constructor(componentName, properties) {
        this.componentName = componentName
        if (properties) {
            this.properties = properties
            Object.keys(this.properties).forEach(propertyName => {
                this.properties[propertyName].name = propertyName
            })
        }
        else {
            this.properties = {}
        }
    }
    
    getFormInfos() {
        let formInfos = {}
        Object.keys(this.properties).forEach(propertyName => {
            formInfos[propertyName] = this.getPropertyFormInfos(propertyName)
        })
        return formInfos
    }

    getPropertyFormInfos(propertyName) {
        const property = this.properties[propertyName]
        let formItemSection = {
            data: {
                name: property.name,
                label: property.name
            }
        }
        if (property.value) {
            formItemSection.data.value = property.value
        }
        let formItemType = this.getPropertyFormInfoType(property)
        formItemSection.type = formItemType
        if (formItemType == 'web-designer-array-input') {
            formItemSection.data.item_type = this.getPropertyItemType(property)
        }
        return formItemSection
    }

    getPropertyFormInfoType(property) {
        if (isSectionPropertyName(property.name)) {
            if (property.type && this.getFormInfoType(property.type) == 'web-designer-array-input') {
                return 'web-designer-array-input'
            }
            else if (property.designType && this.getFormInfoType(property.designType) == 'web-designer-array-input') {
                return 'web-designer-array-input'
            }
            else {
                return 'web-designer-section-input'
            }
        }
        else {
            if (property.designType) {
                return this.getFormInfoType(property.designType)
            }
            if (property.type) {
                return this.getFormInfoType(property.type)
            }
        }
    }

    getPropertyItemType(property) {
        if (isSectionPropertyName(property.name)) {
            return 'web-designer-section-input'
        }
        else if (property.itemType) {
            console.log(property)
            return this.getFormInfoType(property.itemType)
        }
        else {
            throw new Error('Item type required')
        }
    }

    getFormInfoType(type) {
        switch (type) {
            case Array:
            case Array.name:
                return 'web-designer-array-input'
            case Object:
            case Object.name:
                return 'web-designer-object-input'
            case Number:
            case Number.name:
                return 'web-designer-number-input'
            case String:
            case String.name:
                return 'web-designer-text-input'
            case Boolean:
            case Boolean.name:
                return 'web-designer-checkbox-input'
            case 'section':
                return 'web-designer-section-input'
            case 'datetime':
                return 'web-designer-datetime-input'
            case 'email':
                return 'web-designer-email-input'
            default:
                throw new Error('Invalid type')
        }
    }
}

module.exports = ComponentPropertyInfos