var buttons = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
// Import the tabs API
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
// Import the self API
var self = require("sdk/self");

var workers = [];

function detachWorker(worker, workerArray) {
  var index = workerArray.indexOf(worker);
  if(index != -1) {
    workerArray.splice(index, 1);
  }
}

pageMod.PageMod({
  include: "*",
  attachTo: ["top", "frame"],
  contentScriptFile: self.data.url("injector.js"),
  contentScriptWhen: "start",
  contentScriptOptions: {
    scripturl: self.data.url("mastervolume.js")
  },
  onAttach: function(worker) {
     workers.push(worker);
     worker.on('detach', function () {
       detachWorker(this, workers);
     });
   }
});


var button = buttons.ToggleButton({
  id: "webaudio-volume-control",
  label: "WebAudio Volume Control",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleChange
});

var panel = panels.Panel({
  width: 50,
  height: 250,
  contentURL: self.data.url("volumecontrol.html"),
  contentScriptFile: self.data.url("volumecontrol.js"),
  onHide: handleHide
});

function handleChange(state) {
  //console.log("Button Click");
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

panel.port.on("mastervolume", function(payload){
  // console.log("received mastervolume", payload, " sending to ", workers.length);
  workers.forEach(function(thisWorker, index){
    if (thisWorker.tab.id === tabs.activeTab.id){
      // console.log("sending to",thisWorker.tab.url)
      thisWorker.port.emit("mastervolume", payload);
    }
  });
});
