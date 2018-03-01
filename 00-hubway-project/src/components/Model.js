import {csv} from 'd3';

function Model(){

	//Module internal state
	let _url;
	let _parse = d => d;
	let _dataStore;

	function exports(){}

	exports.url = function(_){
		if(typeof _ === 'undefined') return _url;
		_url = _;
		return this;
	}

	exports.parse = function(fn){
		if(typeof fn === 'undefined') return _parse;
		_parse = fn;
		return this;
	}

	exports.fetch = function(){
		if(/.csv$/.test(_url)){
			return _fetchCsv.call(exports);
		}else{
			return _fetch.call(exports); //TODO change this
		}
	}

	function _fetchCsv(){
		_dataStore = new Promise((resolve,reject)=>{
			csv(_url, _parse, (err,data)=>{
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			});
		});

		return _dataStore;
	}

	function _fetch(){
		_dataStore = fetch(_url)
			.then(res => res.json());

		return _dataStore;
	}

	exports.toJSON = function(){

	}

	return exports;
}

export default Model;