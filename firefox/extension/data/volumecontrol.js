var inputslider = document.getElementById('inputSlider');
var sliderlabel = document.getElementById('sliderLabel');
inputslider.addEventListener('input', function(){
	//console.log("input...");
	sliderlabel.innerHTML = parseInt(inputslider.value);
	self.port.emit("mastervolume", parseFloat(inputslider.value)/100.0);
})
