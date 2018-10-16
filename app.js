var http = require('http');
var express = require("express");
var RED = require("node-red");
var settings = require("./settings.js");
const bodyParser = require('body-parser');

// Create an Express app
var app = express();


// Create a server
var server = http.createServer(app);


// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8000);


console.log("RED.settings.httpNodeRoot:"+RED.settings.httpNodeRoot);

app.use(bodyParser.json())

let pullContent = async function(req,res) {
    //res.json({'msg':"pulling content"});
    // var flows = RED.nodes.getFlows();
    var reqmsg = req.body;
    //console.log(req.providerCode);
    var providerCode = reqmsg.providerCode.toUpperCase();
    console.log("REdiecting to "+settings.httpNodeRoot+"/"+providerCode);
    res.redirect(307,settings.httpNodeRoot+"/"+providerCode);
}

app.route('/pullContent').post(pullContent);
// Start the runtime
RED.start();
