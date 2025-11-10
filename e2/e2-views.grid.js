function generateLabel(name) {
  return (
    '<label top="10" left="10" right="10" bottom="10" style="txt-align:center;">' +
    name +
    "</label>"
  );
}

function generateMultiviewerTab() {
  const ip = params.getValue("e2.ip", 0);
  ogscript.setXML("e2-tab-1", generateLabel("Loading Multivewer Layouts"));

  function _callback(frame_address) {
    const layouts = [
      {
        Name: "Layout 1",
        id: 0,
        frame_address: frame_address
      },
      {
        Name: "Layout 2",
        id: 1,
        frame_address: frame_address
      },
      {
        Name: "Layout 3",
        id: 2,
        frame_address: frame_address
      },
      {
        Name: "Layout 4",
        id: 3,
        frame_address: frame_address
      }
    ];

    const rows = Math.ceil(layouts.length / 2);

    var content =
      '<simplegrid id="e2-multiviewer-layouts-grid" rows="' +
      rows +
      '" bottom="10" fill="both" left="10" right="10" top="10">';

    for (var i = 0; i < layouts.length; i++) {
      content +=
        '<button name="' +
        layouts[i].Name +
        '" gpi="mv_' +
        layouts[i].id +
        '" width="100" fill="both" buttontype="push">';
      content += "<task>";
      content +=
        'E2("' +
        ip +
        '").recallMultiviewLayout("' +
        layouts[i].frame_address +
        '", ' +
        layouts[i].id +
        ");";
      content += "</task>";
      content += "</button>";
    }

    content += "</simplegrid>";

    ogscript.setXML("e2-tab-1", content);
  }

  // @todo get all frame addresses for layouts, not just the first
  E2(ip).getFrameAddress(0, _callback);
}

function generatePresetsTab() {
  const ip = params.getValue("e2.ip", 0);
  ogscript.setXML("e2-tab-2", generateLabel("Loading Presets"));

  function _callback(presets) {
    const rows = Math.ceil(presets.length / 2);

    var content =
      '<simplegrid id="e2-presets-grid" rows="' +
      rows +
      '" fill="both" left="10" right="10" top="10" bottom="10">';

    for (var i = 0; i < presets.length; i++) {
      content +=
        '<button name="' +
        presets[i].Name +
        " (" +
        presets[i].presetSno +
        ')" gpi="preset:' +
        presets[i].presetSno +
        '" width="100" fill="both" buttontype="push">';
      content += "<task>";
      content += 'E2("' + ip + '").recallPreset("' + presets[i].id + '");';
      content += "</task>";
      content += "</button>";
    }

    content += "</simplegrid>";
    ogscript.debug(content);
    ogscript.setXML("e2-tab-2", content);
  }

  E2(ip).getPresets(_callback);
}

function generateCardsTab() {
  const ip = params.getValue("e2.ip", 0);
  ogscript.setXML("e2-tab-3", generateLabel("Loading Cards"));

  function _callback(cards) {
    ogscript.debug("Rendering cards");
    const rows = Math.ceil(cards.length / 2);

    var content =
      '<simplegrid id="e2-cards-grid" rows="' +
      rows +
      '" fill="both" left="10" right="10" top="10" bottom="10">';

    for (var i = 0; i < cards.length; i++) {
      content +=
        '<button name="' +
        cards[i].id +
        " (" +
        cards[i].type +
        ')" width="100" fill="both" buttontype="push">';
      content += "<task>";
      // content += 'E2("' + ip + '").recallPreset("' + cards[i].id + '");';
      content += "</task>";
      content += "</button>";
    }

    content += "</simplegrid>";
    ogscript.debug(content);
    ogscript.setXML("e2-tab-3", content);
  }

  function _callback_fa(frame_address) {
    E2(ip).getCards(frame_address, _callback);
  }

  E2(ip).getFrameAddress(0, _callback_fa);
}

function inputStyle(input) {
  var color = "gray";
  var tooltip = input.videoStatus;

  switch (input.videoStatus) {
    case "Active":
      color = "006600";
      break;
    default:
      color = "660000";
  }

  return "bg#" + color + ";tt:" + tooltip;
}

function generateInputsTab() {
  const ip = params.getValue("e2.ip", 0);
  ogscript.setXML("e2-tab-4", generateLabel("Loading Inputs"));

  function _callback(inputs) {
    ogscript.debug("Rendering Inputs");

    const rows = Math.ceil(inputs.length / 2);

    var content =
      '<simplegrid id="e2-inputs-grid" rows="' +
      rows +
      '" fill="both" left="10" right="10" top="10" bottom="10">';

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];

      var title = input.name + " (" + input.type + ")";

      var width = 400;
      var height = 400;

      content +=
        '<popup name="' +
        title +
        '" width="100" fill="both" buttontype="push" style="' +
        inputStyle(input) +
        '">';

      content += '<abs width="400" height="400">';

      if (input.captureStatus) {
        content +=
          '<image width="' +
          width +
          '" height="' +
          height +
          '" src="http://192.168.0.175/uploads/input_' +
          input.id +
          '.png"></image>';
      }

      content += "</abs>";
      content += "</popup>";
    }

    content += "</simplegrid>";
    ogscript.debug(content);
    ogscript.setXML("e2-tab-4", content);
  }

  E2(ip).getInputs(_callback);
}

function generateDestinationsTab() {
  const ip = params.getValue("e2.ip", 0);
  ogscript.setXML("e2-tab-5", generateLabel("Loading Destinations"));

  function _callback(inputs) {
    const rows = Math.ceil(inputs.length / 2);

    var content =
      '<simplegrid id="e2-destinations-grid" rows="' +
      rows +
      '" fill="both" left="10" right="10" top="10" bottom="10">';

    for (var i = 0; i < inputs.length; i++) {
      var name = inputs[i].name;
      var type = inputs[i].type;
      var width = inputs[i].width;
      var height = inputs[i].height;

      content += '<button name="' + name + " (" + type + ") ";

      if (type != "AUX") {
        content += width + "x" + height;
      }

      content += ' " width="100" fill="both" buttontype="push">';

      content += "<task>";
      // content += 'E2("' + ip + '").recallPreset("' + cards[i].id + '");';
      content += "</task>";
      content += "</button>";
    }

    content += "</simplegrid>";
    ogscript.debug(content);
    ogscript.setXML("e2-tab-5", content);
  }

  E2(ip).getDestinations(_callback);
}

function generateStillsTab() {
  const ip = params.getValue("e2.ip", 0);
  ogscript.setXML("e2-tab-6", generateLabel("Loading Stills"));

  function _callback(stills) {
    const rows = Math.ceil(stills.length / 2);

    var content =
      '<simplegrid id="e2-stills-grid" rows="' +
      rows +
      '" fill="both" left="10" right="10" top="10" bottom="10">';

    for (var i = 0; i < stills.length; i++) {
      var still = stills[i];

      var title = still.name;

      var width = 400;
      var height = Math.floor((still.height / still.width) * width);

      content +=
        '<popup name="' +
        title +
        '" width="100" fill="both" buttontype="push">';

      content += '<abs width="400" height="400">';

      content +=
        '<image width="' +
        width +
        '" height="' +
        height +
        '" src="http://192.168.0.175/uploads/still_' +
        still.id +
        '.png"></image>';

      content += "</abs>";

      content += "</popup>";
    }

    content += "</simplegrid>";
    ogscript.debug(content);
    ogscript.setXML("e2-tab-6", content);
  }

  E2(ip).getStills(_callback);
}
