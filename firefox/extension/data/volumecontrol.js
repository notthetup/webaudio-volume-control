///var a = new AudioContext(); osc = a.createOscillator(); osc.connect(a.destination); osc.start();

if (AudioContext.prototype.createOscillator){
	var origAudioContext = AudioContext;
	function newAudioContext (){
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

	console.log("Hijacking...");
	unsafeWindow.AudioContext = cloneInto(unsafeWindow,newAudioContext);
	console.log("Hijacked");
}
