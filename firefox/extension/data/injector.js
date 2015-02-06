console.log("injecting....")

function sendCustomEvent(type, data, payload) {
  var greeting = {};
  greeting[data] = payload;
  var cloned = cloneInto(greeting, document.defaultView);
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, true, true, cloned);
  document.documentElement.dispatchEvent(event);
}

var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.onload = function() {
    this.parentNode.removeChild(this);
    self.port.on("mastervolume", function(payload){
    	sendCustomEvent("mastervolume", "gainValue", payload)
    })
};

s.src = self.options.scripturl;

(document.head||document.documentElement).appendChild(s);

