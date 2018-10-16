var jsonSchemaGenerator = require('json-schema-generator');
const _ = require("lodash");
module.exports = function(RED) {
    function schemaGenerator(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var schemaObj = jsonSchemaGenerator(msg.payload);
            if(Array.isArray(msg.payload))
                schemaObj = jsonSchemaGenerator(msg.payload[0]);
            
            console.log("schemaObj:"+JSON.stringify(schemaObj));
            var properties = schemaObj.properties;
            var propNameArr = new Array();
            propNameArr = getObjectProperties(properties,propNameArr);
            msg.payload = propNameArr;
            node.send(msg);
        });
    }
    RED.nodes.registerType("schema-generator",schemaGenerator);
}
let jsonPathAttrStack = new Array();
let getObjectProperties = function(properties,propNameArr) {
    var propLength = Object.keys(properties).length;
    console.log("propLength:"+propLength);
    for( var prop in properties) { 
        var proptype= properties[prop]["type"];
        //console.log("proptype:"+proptype);
        propLength = propLength-1;
        // console.log("jsonPathAttrStack:"+jsonPathAttrStack.toString());
        // console.log("propLength inside forr:"+propLength);
        if(proptype != "object") {
            if(!_.isEmpty(jsonPathAttrStack)) {
                var jsonAttr = _.replace(jsonPathAttrStack.toString(),",",".");
                prop = jsonAttr+"."+prop;
                if(propLength ==0) {
                    var removed =jsonPathAttrStack.pop();
                    //console.log("popping propname from arr "+removed);
                }
            }
                //console.log("pushing propname to arr "+prop); 
                propNameArr.push(prop);
            
        }  else {
                jsonPathAttrStack.push(prop);
                getObjectProperties(properties[prop].properties,propNameArr);
        }
    }
    return propNameArr;
}
