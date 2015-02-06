var buttons = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
// Import the tabs API
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
// Import the self API
var self = require("sdk/self");

const { add, remove } = require("sdk/util/array");
const pageWorkers = [];

pageMod.PageMod({
  include: "*",
  attachTo: ["top"],
  contentScriptFile: self.data.url("injector.js"),
  contentScriptWhen: "start",
  contentScriptOptions: {
    scripturl: self.data.url("mastervolume.js")
  },
  onAttach: function(worker) {
    add(pageWorkers, worker);
    //console.log('attached injector on ', worker.tab.url, " : ", pageWorkers.length);
    worker.on('detach', function() {
      remove(pageWorkers, worker);
      //console.log('detached worker : ', pageWorkers.length);
    })
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
  width: 25,
  height: 180,
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
  //console.log("received mastervolume", payload, " sending to ", pageWorkers.length);
  pageWorkers.forEach(function(thisWorker, index){
    if (thisWorker.tab.id === tabs.activeTab.id){
      //console.log("sending to",thisWorker.tab.url)
      thisWorker.port.emit("mastervolume", payload);
    }
  });
});
