///var a = new AudioContext(); osc = a.createOscillator(); osc.connect(a.destination); osc.start();

if (typeof origAudioContext == 'undefined'){
	console.log("Hijacking...");
	window.origAudioContext = AudioContext;
	window.AudioContext = function (){
		console.log("Running Hijacked Context");
		var newAudioContextInstance = {};
		var origACInstance = new origAudioContext();
		var masterGain = origACInstance.createGain();
		masterGain.connect(origACInstance.destination);

		for (var property in origACInstance) {
			(function(){
				var thisProp = property;
				if (typeof(origACInstance[property]) === 'function'){
					newAudioContextInstance[thisProp] = function (arguments) {
						return origACInstance[thisProp].apply(origACInstance, arguments);
					}
				}else if(property !== "destination"){
					Object.defineProperty(newAudioContextInstance, property, {
						get : function (){
							return origACInstance[thisProp]
						}
					});
				}
			})();
		}

		newAudioContextInstance.destination = masterGain;
		newAudioContextInstance.gain = masterGain.gain;

		return newAudioContextInstance;
	}
	console.log("Hijacked");
}
