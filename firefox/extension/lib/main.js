var buttons = require('sdk/ui/button/action');
// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");

pageMod.PageMod({
  include: "*",
  attachTo: ["existing", "top"],
  contentScriptWhen: "start",
  contentScriptFile: self.data.url("injector.js"),
  contentScriptOptions: {
    scripturl: self.data.url("volumecontrol.js")
  }
});

var button = buttons.ActionButton({
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
  contentURL: self.data.url("volumecontrol.js"),
  onHide: handleHide
});

function handleChange(state) {
  console.log("Button Click");
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

