node-red-contrib-carwings
========================

[![NPM](https://nodei.co/npm/node-red-contrib-carwings.png)](https://nodei.co/npm/node-red-contrib-carwings/)

[Node-Red][1] nodes for communicating with a Nissan Leaf via the CARWINGS™ API.  

Based on the [CarwingsJS node module][2] utilizing the unofficially documented [CARWINGS™ API][3].

#Install

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-carwings


#Requirements

To access the CARWINGS™ API via these nodes, you will require a [Nissan Owner Portal Account][4] and you must have an active CARWINGS™ subscription to use any of the CARWINGS™ services or remote features.

For detailed information on how to register and configure your Nissan Leaf refer to this [video][5]. 

#Example

After installing this package import the following JSON into your Node-RED instance to test.  Remember to fill in your CARWINGS™ login info in the Login node.

    [{"id":"c65bcfe9.1b3ef","type":"Login","name":"","x":340,"y":217,"z":"24123a18.16444e","wires":[["eda39392.baad08"]]},{"id":"eda39392.baad08","type":"RequestUpdate","name":"","x":517,"y":217,"z":"24123a18.16444e","wires":[["173cf0be.7d414f"]]},{"id":"173cf0be.7d414f","type":"VehicleStatus","name":"","x":715,"y":217,"z":"24123a18.16444e","wires":[["214eb98d.adef5e"]]},{"id":"1ce60bb5.66b364","type":"inject","name":"","topic":"","payload":"","payloadType":"none","repeat":"","crontab":"","once":false,"x":178,"y":217,"z":"24123a18.16444e","wires":[["c65bcfe9.1b3ef"]]},{"id":"214eb98d.adef5e","type":"debug","name":"","active":true,"console":"false","complete":"false","x":913,"y":216,"z":"24123a18.16444e","wires":[]}]

#Author

[Jason D. Harper][6]


[1]:http://nodered.org
[2]:https://github.com/crtr0/carwingsjs
[3]:http://www.electricvehiclewiki.com/?title=Carwings_protocol
[4]:http://www.nissanusa.com/nowners/
[5]:https://youtu.be/KQEvGBf3laE
[6]:https://github.com/jayharper

