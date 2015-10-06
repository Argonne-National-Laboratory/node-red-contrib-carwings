/**
 * Copyright 2015 Argonne National Laboratory.
 *
 * Licensed under the BSD 3-Clause License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
 
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
