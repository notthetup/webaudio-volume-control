window.onload = function (){
	var inputslider = document.getElementById('inputSlider');
	var sliderlabel = document.getElementById('sliderLabel');
	inputslider.addEventListener('input', function(){
		//console.log("input...");
		sliderlabel.innerHTML = parseInt(inputslider.value);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		  chrome.tabs.sendMessage(tabs[0].id, {mastervolume:  parseFloat(inputslider.value)/100.0});
		});
		// self.port.emit("mastervolume",);
	})
}
