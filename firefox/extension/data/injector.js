// console.log("injecting....")

function sendCustomEvent(type, data, payload) {
  var greeting = {};
  greeting[data] = payload;
  var cloned = cloneInto(greeting, document.defaultView);
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, true, true, cloned);
  document.documentElement.dispatchEvent(event);
}

var s = document.createElement('script');
s.src = self.options.scripturl;
s.onload = function() {
    this.parentNode.removeChild(this);
    self.port.on("mastervolume", function(payload){
    	sendCustomEvent("mastervolume", "gainValue", payload)
    })
};


(document.head||document.documentElement).appendChild(s);

