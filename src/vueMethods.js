global.refreshVueComponents = () => { 
    window.App.$children.forEach(children => { 
        if (children.refresh) { 
            children.refresh() 
        } 
    })
}
