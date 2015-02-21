console.log("injecting....")

function sendCustomEvent(type, data, payload) {
  var greeting = {};
  greeting[data] = payload;
  // var cloned = cloneInto(greeting, document.defaultView);
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, true, true, greeting);
  document.documentElement.dispatchEvent(event);
}

var s = document.createElement('script');
s.src = chrome.extension.getURL("mastervolume.js");;
s.onload = function() {
    this.parentNode.removeChild(this);
    chrome.runtime.onMessage.addListener(
      function(request, sender) {
        // console.log(request.mastervolume);
        sendCustomEvent("mastervolume", "gainValue", request.mastervolume)
      });
    // self.port.on("mastervolume", function(payload){
    // 	sendCustomEvent("mastervolume", "gainValue", payload)
    // })
};


(document.head||document.documentElement).appendChild(s);

