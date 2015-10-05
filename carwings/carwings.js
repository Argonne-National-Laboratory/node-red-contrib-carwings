// Carwings Node-RED node file
module.exports = function(RED) {
    //"use strict";
    var RED = require(process.env.NODE_RED_HOME+"/red/red");
    var settings = RED.settings;
    var carwings     = require('carwingsjs');
   
    function Login(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	
	var carwings_username = node.credentials.username;
        var carwings_password = node.credentials.password;       
	 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };	

		node.status({fill:"yellow",shape:"dot",text:"Logging In"});    
	 	carwings.login(carwings_username, carwings_password, function(err, output) {
			if(err) {
			  node.status({fill:"red",shape:"dot",text:"Error"});
			  console.log(err); 
			  node.error('Carwings ' + err);			  
			 }
	 		else if(output)
			 { 		   
			   node.status({fill:"green",shape:"dot",text:"Success"});
			   outmsg.payload = output; 			   
			   node.send(outmsg);
			 }
	   	});
	});          
        
    }

    RED.nodes.registerType("Login",Login,{
        credentials: {
            username: {type:"text"},
            password: {type: "password"}
        }
    });

    function RequestUpdate(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	       
	 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };	   
 
	 	//carwings.requestUpdate(msg.payload.vin);
		carwings.requestUpdate(msg.payload.vin);				
		//console.log('VIN:' + msg.payload.vin);
		outmsg.payload = msg.payload;  				    			   
	   	node.send(outmsg);					 
	   	
	});          
        
    }

    RED.nodes.registerType("RequestUpdate",RequestUpdate);    

    function VehicleStatus(n) {
        RED.nodes.createNode(this,n);        
	var node = this;
	this.name = n.name;	       
	 
	
        node.on("input", function(msg) {
	    var outmsg = {
	        topic: msg.topic
	    };
 		node.status({fill:"yellow",shape:"dot",text:"Querying"}); 
		carwings.vehicleStatus(msg.payload.vin, function(err, output) {
		if(err) {
		  node.status({fill:"red",shape:"dot",text:"Error"});
		  console.log(err); 
		  node.error('Carwings ' + err);			  
		 }
 		else if(output)
		 { 		   
		   node.status({fill:"green",shape:"dot",text:"Success"});
		   outmsg.payload = output; 			   
		   node.send(outmsg);
		 }
	   	});			 
	   	
	});          
        
    }

    RED.nodes.registerType("VehicleStatus",VehicleStatus); 

}
