require('../configMethods')
const fs = require('fs')
const path = require('path')

//replaceConfigFileTemplates('D:\\Projektek\\laragon\\www\\dynamic-web\\resources\\views\\configs\\welcome.json')
replaceConfigFileTemplates('D:\\Projektek\\Sajat\\Sablonok\\Node modulok\\Vue\\dynamic-web-vue-components\\src\\configTemplates\\welcome.json')
fs.copyFile('D:\\Projektek\\Sajat\\Sablonok\\Node modulok\\Vue\\dynamic-web-vue-components\\src\\configTemplates\\welcome_compiled.json',
    'D:\\Projektek\\laragon\\www\\dynamic-web\\resources\\views\\dynamicPageTemplates\\welcome.json',
    (err) => {
        if (err) throw err;
        console.log('welcome was copied');
    });
