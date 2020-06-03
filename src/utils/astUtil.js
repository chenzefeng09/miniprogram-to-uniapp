const t = require("@babel/types");
const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;

function generateObjectExpression(param) {
    let object_str = ''
    if (typeof param === 'string'){
        object_str = param
    }
    else if (typeof param === 'object'){
        object_str = JSON.stringify(param)
    }
    object_str = object_str.replace(/{|}/g,'')
    let propertyArr = object_str.split(',');
    let propertyArrAst = []
    for (const property of propertyArr) {
        let kv = property.split(':');
        let propertyAst = t.objectProperty(t.identifier(kv[0]),t.identifier(kv[1]));
        propertyArrAst.push(propertyAst);
    }
    return t.objectExpression(propertyArrAst);
}
/**
 *将一个js代码片段解析为ast
 *
 * @param {*} jsCode  js代码片段
 * @returns  ast信息
 */
function parseExpression(jsCode) {
    let ast 
    if (jsCode) {
        ast = parser.parseExpression(jsCode,{
            sourceType:'script'
        })
    }
    return ast;
}

module.exports = {
    parseExpression
};