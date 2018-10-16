var str ="config";
console.log(str.replace(/_/g,"."));
var _ = require("lodash");

var configkeyList = str.split("_");
var input = require("./test.json");
var content = input.content;
//console.log(facets.filter(i => i.id === "id1").length);

console.log(content.filter(i => i.catalogItem.catalogItemTypeRef.label !== 'XaaS Blueprint').length);
console.log(_.find(input,{"facets.id" :"id1"}));
console.log(Array.isArray(input["facets"]))
console.log(configkeyList)

