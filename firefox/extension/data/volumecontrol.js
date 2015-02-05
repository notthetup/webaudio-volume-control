var inputslider = document.getElementById('inputSlider');
var sliderlabel = document.getElementById('sliderLabel');
console.log("Running inline");
inputslider.addEventListener('input', function(){
	console.log("input...");
	sliderlabel.innerHTML = parseInt(inputslider.value);
	self.port.emit("mastervolume", parseInt(inputslider.value));
})
