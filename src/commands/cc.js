require('../configFileMethods_old')
const fs = require('fs')
const path = require('path')

//import asd from '../../../Vue/gurulo-lofasz-vue-components/src/Templates/Welcome/templates.js'

console.log(require('../../../Vue/gurulo-lofasz-vue-components/src/Templates/Welcome/templates.js'))
//replaceConfigFileTemplates('D:\\Projektek\\laragon\\www\\dynamic-web\\resources\\views\\configs\\welcome.json')
//compileTemplate('D:\\Projektek\\laragon\\www\\gurulo-lofasz', 'gurulo-lofasz-vue-components', 'Templates\\Welcome\\welcome.js')

function compileTemplate(projectPath, nodeModuleName, templateRelativePath) {
    let templateName = path.basename(templateRelativePath)
    let compiledTemplateName = path.basename(templateName, path.extname(templateName)) + '_compiled' + path.extname(templateName)
    let templateFolderPath = path.join(projectPath, 'node_modules', nodeModuleName, 'src', path.dirname(templateRelativePath))
    let subTemplates = {
        
    }
    replaceConfigFileTemplates(path.join(templateFolderPath, templateName), subtemplates)
    fs.copyFile(
        path.join(templateFolderPath, compiledTemplateName),
        path.join(projectPath, 'app', 'Templates', compiledTemplateName),
        (err) => {
            if (err) throw err;
            console.log('welcome was copied')
        }
    )
}
