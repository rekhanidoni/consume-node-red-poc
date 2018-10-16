let serviceDef = require("../resources/serviceDefinition.json");
var jsonSchemaGenerator = require('json-schema-generator');
const _ = require("lodash");
module.exports = function(RED) {
    function schemaMapper(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var propNameObj = {};
            var serviceDefForTransformation = serviceDef;
            var schemaObj = jsonSchemaGenerator(serviceDef);
            console.log("schemaObj"+JSON.stringify(schemaObj));
            var schemaMap =getObjectProperties(schemaObj.properties,propNameObj);
             _.forEach(config,function(configval,configkey) {
                //var configkeyList = configkey.split("_");
                configkey = configkey.replace(/_/g,".");
                console.log("attr:"+configkey);
                console.log("val:"+configval);
                 if(configkey in schemaMap)
                 {
                    schemaMap[configkey]=configval;
                 }
            });
            msg.schemaMapping=schemaMap;
            //console.log("msg schema"+JSON.stringify(msg.schemaMapping));
            node.send(msg);
        });
    }
    RED.nodes.registerType("schema-mapper",schemaMapper);
}

let jsonPathAttrStack = new Array();
let getObjectProperties = function(properties,propNameObj) {
    var propLength = Object.keys(properties).length;
    console.log("propLength:"+propLength);
    for( var prop in properties) { 
        var proptype= properties[prop]["type"];
        console.log("proptype:"+proptype);
        propLength = propLength-1;
        console.log("jsonPathAttrStack:"+jsonPathAttrStack.toString());
        console.log("propLength inside for:"+propLength);
        if((proptype !== "object" || _.isEmpty(properties[prop].properties)) &&(proptype !== "array" || _.isEmpty(properties[prop].items.properties))) {
            if(!_.isEmpty(jsonPathAttrStack)) {
                var jsonAttr = _.replace(jsonPathAttrStack.toString(),",",".");
                prop = jsonAttr+"."+prop;
                if(propLength ==0) {
                    var removed =jsonPathAttrStack.pop();
                    console.log("popping propname from arr "+removed);
                }
            }
            console.log("pushing propname to arr "+prop); 
            propNameObj[prop]="";
            
        }  else {
                if(proptype === "array" && !_.isEmpty(properties[prop].items.properties)) {
                    jsonPathAttrStack.push(prop);
                    console.log("pushing "+prop+" to stack");
                    getObjectProperties(properties[prop].items.properties,propNameObj);
                } else if(proptype === "object"  && !_.isEmpty(properties[prop].properties)) {
                    jsonPathAttrStack.push(prop);
                    console.log("pushing "+prop+" to stack");
                    getObjectProperties(properties[prop].properties,propNameObj);
                } 
        }
    }
    return propNameObj;
}