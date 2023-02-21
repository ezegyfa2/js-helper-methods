global.refreshVueComponents = () => { 
    window.App.$children.forEach(children => { 
        if (children.refresh) { 
            children.refresh() 
        } 
    })
}

global.registerVueComponent = (componentName, requiredComponent, Vue) => {
    let properties = Vue.extend(requiredComponent).options.props
    if (properties) {
        window.componentProperties[componentName] = properties
    }
    Vue.component(componentName, requiredComponent)
}
