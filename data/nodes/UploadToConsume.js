const _ = require("lodash");
const transformContent = require('../../transformContent');
module.exports = function(RED) {
    function schemaGenerator(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            transformContent.handleTransformRequest(msg);
            var output = {"status":200,msg:"success"};
            node.send(output);
        });
    }
    RED.nodes.registerType("UploadToConsume",schemaGenerator);
}