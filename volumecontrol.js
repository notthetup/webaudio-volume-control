if (typeof chrome === "undefined" && (typeof self === "undefined" || typeof self.port === "undefined")){
	// console.log("neither in chrome nor FF");
}else{
		window.onload = function (){
		console.log("controlling volume");
		var storage;
		var inputslider = document.getElementById('inputSlider');
		var sliderlabel = document.getElementById('sliderLabel');

		if (typeof chrome !== "undefined" && chrome.storage){
			storage = chrome.storage.local;
			storage.get("mastervolume",function(result){
				if (result && result.mastervolume){
					console.log("old value found", result);
					inputslider.value = result.mastervolume;
					sliderlabel.innerHTML = result.mastervolume;
					updateVolume(result.mastervolume/100.0);
				}else{
					console.log("creating new storage", parseFloat(inputslider.value));
					storage.set({"mastervolume":parseFloat(inputslider.value)});
				}
			});
		}

		inputslider.addEventListener('input', function(){
			sliderlabel.innerHTML = parseInt(inputslider.value);
			var volume = parseFloat(inputslider.value)/100.0;

			if(typeof chrome !== "undefined"){
				storage.set({"mastervolume":parseFloat(inputslider.value)});
			}

			updateVolume(volume);
		})
	}
}

function updateVolume(volume){
	if (typeof chrome !== "undefined"){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {mastervolume: volume});
		});
	}else if (typeof self !== "undefined" && self.port){
		// console.log("emiting..", volume);
		self.port.emit("mastervolume",volume);
	}
}


