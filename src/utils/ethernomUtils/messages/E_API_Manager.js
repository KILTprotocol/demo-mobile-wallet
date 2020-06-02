import {EthernomAPI} from "@ethernom/ethernom-api";
const Define_CM = require('./messages/Define_CM.js');
const Define_Kilt = require('./messages/Define_Kilt.js');
const CM = new Define_CM();
const Kilt = new Define_Kilt();

const ERR = {
	SUCCESS: 			0x00,
	FAILS:				0x01,
	DISCONNECTED: 		0x02,
	CONNECTION_TIMEOUT: 0x03, 
	CONNECTION_FAILS: 	0x04,
	NOT_CONNECTED:		0x05,
	WRITE_SUCCESS: 		0x06,
	WRITE_FAILS: 		0x07,
	READ_SUCCESS: 		0x08,
	READ_FAILS: 		0x09,
	INVALID_COMMAND:	0x0A,
	INVALID_STATE:		0x0B,
 };

module.exports = class E_API_Scanner {
	constructor(){
		this.connecting = false;
		this.CURR_E_API = null;
		this.ERR = ERR;
	}

	get_device_info = () => {
		if(this.CURR_E_API != null){
			return {code: ERR.SUCCESS, device: {id: this.CURR_E_API.currID, name: this.CURR_E_API.currName, sn: this.CURR_E_API.currSN}};
		}else{
			return {code: ERR.FAILS};
		}
	}
	
	request_connect_device = async (periheral, callback) => {
		if(this.connecting == true) return;
		this.connecting = true;

		console.log("Request connect: ", periheral);
		if(this.connect_callback != null) this.connect_callback = null;
		this.connect_callback = callback;

		var E_API = await new EthernomAPI('BLE', Kilt.AO_ID, 0, false, true, async resultCode => {
			if (resultCode === ETH_SUCCESS) {
				this.CURR_E_API = await E_API;
				device_select(this, periheral);
			}
		});
	}

	request_launch_app = (periheral, callback) => {
		if(this.CURR_E_API == null){
			callback({code: ERR.NOT_CONNECTED})
			return;
		}

		this.CURR_E_API.LaunchApp(CM.APP_ID, (resultCode) => {
			if(resultCode == ETH_SUCCESS){
				callback({code: ERR.SUCCESS, device: periheral});
			}else if(resultCode === 1){
				if(this.launch_callback != null) this.launch_callback = null;
				this.launch_callback = callback;

				this.request_connect_device(periheral, callback = (json_obj) => {
					if(json_obj.code != 0){
						this.launch_callback({code: ERR.INVALID_STATE})
						return;
					}

					global.E_API.request_launch_app(json_obj.device, callback = (json_obj) => {
						this.launch_callback(json_obj);
					});
				})
			}else{
				callback({code: ERR.INVALID_STATE});
			}
		});
	}

	request_suspend_app = (callback) => {
		if(this.CURR_E_API == null){
			callback({code: ERR.NOT_CONNECTED})
			return;
		}

		this.CURR_E_API.DisconnectApp((resultCode) => {
			if(resultCode == ETH_SUCCESS){
				callback({code: ERR.SUCCESS});
			}else{
				callback({code: ERR.FAILS});
			}
		})
	}

	request_disconnect_device = (callback) => {
		if(this.CURR_E_API == null){
			callback({code: ERR.NOT_CONNECTED})
			return;
		}

		this.CURR_E_API.CardClose(callback = (resultCode) => {
			if(this.CURR_E_API != null){
				this.CURR_E_API.UnSubscribeToUnsolictedEvents();
				this.CURR_E_API.DisconnectListeners();
			}
			this.CURR_E_API = null;

			callback({code: ERR.DISCONNECTED});
		});
	}

	request_write = (out_msg, in_msg, callback) => {
		if(this.CURR_E_API == null){
			callback({code: ERR.NOT_CONNECTED})
			return;
		}
		
		this.CURR_E_API.WriteJSON(out_msg, in_msg, (resultCode, msg) => {
			if (resultCode === ETH_SUCCESS) {
				var msg_obj = JSON.parse(msg);
				if(msg_obj.hasOwnProperty("payload")){
					var start = msg_obj.payload.length - msg_obj.len
					msg_obj.payload = msg_obj.payload.slice(start, msg_obj.payload.length);
				}
				callback({code: ERR.READ_SUCCESS, msg: msg_obj});
			}else{
				callback({code: ERR.READ_FAILS})
			}
		});
	}
}

var connection_timeout_occur = false;
function device_select(parent, p){
	connection_timeout_occur = false;
	var connection_timeout = setTimeout(function () {
		connection_timeout_occur = true;
		parent.connecting = false;
		
		if(parent.CURR_E_API != null){
			parent.CURR_E_API.CardClose(callback = (resultCode) => {
				parent.CURR_E_API.UnSubscribeToUnsolictedEvents();
				parent.CURR_E_API.DisconnectListeners();
				parent.CURR_E_API = null;
				parent.connect_callback({code: ERR.CONNECTION_TIMEOUT});
			});
		}
	}, 5000);

	parent.CURR_E_API.Select(p.id, p.sn, p.name, async (resultCode) => {
		if(connection_timeout_occur == true) return;
		clearTimeout(connection_timeout);

		if(resultCode === ETH_SUCCESS) {
			console.log("Successfully connected: ", p);
			parent.connecting = false;
			parent.CURR_E_API.OnCardDisconnected((resultCode) => {
				if (resultCode === ETH_SUCCESS) {
					console.log("Device disconnected...");
					parent.CURR_E_API = null;
				};
			});
			init_app_auth(parent, p);
		}else{
			parent.connect_callback({code: ERR.CONNECTION_FAILS});
		}
	});
}

function init_app_auth(parent, p){
	if(parent.CURR_E_API == null){
		parent.connect_callback({code: ERR.NOT_CONNECTED});
		return;
	}

	parent.CURR_E_API.WriteJSON_Generic(CM.outMsg_reqAppAuth, CM.inMsg_respGeneric, (resultCode, msg) => {
		if(resultCode === ETH_SUCCESS){
			var msg_obj = JSON.parse(msg);
			msg_obj.payload = msg_obj.payload.slice(4, msg_obj.payload.length);
			switch(msg_obj.command){
				case CM.CM_AUTHENTICATE:
					generate_auth_rsp(parent, p);
					break;

				default:
					parent.connect_callback({code: ERR.INVALID_COMMAND});
					break;
			}
		}else{
			parent.connect_callback({code: ERR.READ_FAILS});
		}
	});
}

function generate_auth_rsp(parent, p){
	if(parent.CURR_E_API == null){
		parent.connect_callback({code: ERR.NOT_CONNECTED});
		return;
	}

	var temp_array = new Array(64).fill(0);
	var msg = CM.outMsg_reqAppAuthResp;
		msg[2].len.value = temp_array.length;
		msg[3].array.value = temp_array;
		
	parent.CURR_E_API.WriteJSON_Generic(msg, CM.inMsg_respGeneric, (resultCode, msg) => {
		if(resultCode === ETH_SUCCESS){
			var msg_obj = JSON.parse(msg);
			msg_obj.payload = msg_obj.payload.slice(4, msg_obj.payload.length);
			switch(msg_obj.command){
				case CM.CM_RSP:
					if(msg_obj.payload[0] == CM.CM_ERR_SUCCESS){
						parent.connect_callback({code: ERR.SUCCESS, device: p});
					}else{
						parent.connect_callback({code: ERR.INVALID_COMMAND});
					}
					break;

				default:
					parent.connect_callback({code: ERR.INVALID_COMMAND});
					break;
			}
		}else{
			parent.connect_callback({code: ERR.READ_FAILS});
		}
	});
};