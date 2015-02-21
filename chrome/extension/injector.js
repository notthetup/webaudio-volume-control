console.log("injecting....")

function sendCustomEvent(type, data, payload) {
  var greeting = {};
  greeting[data] = payload;
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
        sendCustomEvent("mastervolume", "gainValue", request.mastervolume)
      });
};


(document.head||document.documentElement).appendChild(s);

