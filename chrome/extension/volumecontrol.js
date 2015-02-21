window.onload = function (){
	var inputslider = document.getElementById('inputSlider');
	var sliderlabel = document.getElementById('sliderLabel');
	var storage = chrome.storage.local;

	storage.get("mastervolume",function(result){
		if (result && result.mastervolume){
			console.log("old value found", result);
			inputslider.value = result.mastervolume;
			sliderlabel.innerHTML = result.mastervolume;
			updateVolume(result.mastervolume);
		}else{
			console.log("creating new storage", parseFloat(inputslider.value));
			storage.set({"mastervolume":parseFloat(inputslider.value)});
		}
	});

	inputslider.addEventListener('input', function(){
		//console.log("input...");
		sliderlabel.innerHTML = parseInt(inputslider.value);
		var volume = parseFloat(inputslider.value)/100.0;

		storage.set({"mastervolume":parseFloat(inputslider.value)});
		updateVolume(volume);

		// self.port.emit("mastervolume",);
	})
}

function updateVolume(volume){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {mastervolume: volume});
	});
}
