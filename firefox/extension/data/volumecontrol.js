///var a = new AudioContext(); osc = a.createOscillator(); osc.connect(a.destination); osc.start();

if (AudioContext.prototype.createOscillator){
	var origAudioContext = AudioContext;
	var newAudioContext = function (){
		var newAudioContext = {};
		var origACInstance = new origAudioContext();
		var masterGain = origACInstance.createGain();
		masterGain.connect(origACInstance.destination);

		for (var property in origACInstance) {
			(function(){
				var thisProp = property;
				if (typeof(origACInstance[property]) === 'function'){
					newAudioContext[thisProp] = function (arguments) {
						return origACInstance[thisProp].apply(origACInstance, arguments);
					}
				}else if(property !== "destination"){
					Object.defineProperty(newAudioContext, property, {
						get : function (){
							return origACInstance[thisProp]
						}
					});
				}
			})();
		}

		newAudioContext.destination = masterGain;
		newAudioContext.gain = masterGain.gain;

		return newAudioContext;
	}

	exportFunction(newAudioContext, unsafeWindow, {defineAs: "randomFunction"});
	console.log("Hijacked");
}
