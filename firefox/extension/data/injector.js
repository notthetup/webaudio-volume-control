console.log("injecting....")
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = self.options.scripturl
s.onload = function() {
    this.parentNode.removeChild(this);
    self.port.on("mastervolume", function(payload){
    	console.log("content:",payload);
    	var ev = new Event("mastervolume");
    	ev.gainValue = payload;
    	document.dispatchEvent(ev);
    })
};
(document.head||document.documentElement).appendChild(s);

