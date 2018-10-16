const _ = require("lodash");
module.exports.handleTransformRequest = function(msg) {
    //console.log("Received content:"+JSON.stringify(msg));
    var catalogItems = msg.payload;
    var schemaMap = msg.schemaMapping;
    //Create jobs for bunch of catalogItems and process them in separate threads.
    //TODO

    // _.forEach(catalogItems, function (catalogItem) {
    //     if (catalogItem.name) {
    //         if (!_.isEmpty(catalogItem.fields)) {
    //             let serviceDefinition = formServiceDefinition(catalogItem,schemaMap)
    //             listOfServices.push(serviceDefinition.serviceDefinition)
    //             _.forEach(serviceDefinition.configValueDomain, function (iterate) {
    //                 configValueDomain.push(iterate)
    //             })
    //         }
    //         else {
    //             console.log(`-----------The service with Id ${services.id} will be ignored as this doesnt have any fields`);
    //         }
    //     }
    // })
}

let formServiceDefinition = function (service) {
    console.info('Forming service definition ')
    let serviceDefinition = {
    }
}