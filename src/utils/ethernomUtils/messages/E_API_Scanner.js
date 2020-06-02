import {EthernomAPI} from "@ethernom/ethernom-api";

const Helper = require('./Helper.js');
const HelperFunction = new Helper();

module.exports = class E_API_Scanner {
	GENERIC_SERIVCE_PORT = 0x16;
	MAIN_GENERIC_DISCOVERY = null;
	device_list = [];

	constructor(){
		this.device_list = [];
		this.MAIN_GENERIC_DISCOVERY = null;
	}
	
	//----------------------------------------------------
	//---------------------- PUBLIC ----------------------
	//----------------------------------------------------
	subscribe_discovery_event = (callback) => {
		if(this.discovery_event != null) this.discovery_event = null;
		this.discovery_event = callback;
	}
	
	start_discovery = () => {
		this.device_list = [];
		this._init_discovery_scanner();
	}
	
	stop_discovery =() => {
		this.device_list = [];
		if(this.MAIN_GENERIC_DISCOVERY != null){
			this.MAIN_GENERIC_DISCOVERY.StopDiscovery();
			this.MAIN_GENERIC_DISCOVERY.DisconnectListeners();
			this.MAIN_GENERIC_DISCOVERY = null;
		}
	}
	
	//----------------------------------------------------
	//------------------- GENERIC_API --------------------
	//----------------------------------------------------
	_init_discovery_scanner = async () => {
		if(this.MAIN_GENERIC_DISCOVERY != null){
			this.MAIN_GENERIC_DISCOVERY.StopDiscovery();
			this.MAIN_GENERIC_DISCOVERY.DisconnectListeners();
			this.MAIN_GENERIC_DISCOVERY = null;
		}
		
		var TEMP_E_API = await new EthernomAPI("BLE", this.GENERIC_SERIVCE_PORT, -1, true, true, async (resultCode) =>{
			if (resultCode == ETH_SUCCESS){
				this.MAIN_GENERIC_DISCOVERY = await TEMP_E_API;
				this.MAIN_GENERIC_DISCOVERY.DiscoverDevices(this._device_discovery_callback);
			}
		});
	}

	_device_discovery_callback = (resultCode, deviceID, deviceName, deviceSN) => {	
		var display_sn = HelperFunction.convert_sn(deviceSN);
		var obj = [{id: deviceID, name: deviceName, sn: deviceSN, d_sn: display_sn}];

    	if(this.device_list.length > 0){
			for(var i=0; i<this.device_list.length; i++){
				if(this.device_list[i].id == deviceID && this.device_list[i].sn == deviceSN && this.device_list[i].name == deviceName){
					return;

				}else if(this.device_list[i].id == deviceID && (this.device_list[i].sn != deviceSN || this.device_list[i].name != deviceName)){
					var update_list = false;
					if(this.device_list[i].name != deviceName){
						update_list = true;
						this.device_list[i].name = deviceName;
					}

					if(this.device_list[i].sn != deviceSN){
						update_list = true;
						this.device_list[i].sn = deviceSN;
					}

					if(update_list == true){
						if(this.discovery_event != null) this.discovery_event(this.device_list);
					}
					return;
				}
			}
		}

		this.device_list = this.device_list.concat(obj);
		if(this.discovery_event != null) this.discovery_event(this.device_list);
	}
}