function generateLabel(name) {
  return (
    '<label top="10" left="10" right="10" bottom="10" style="txt-align:center;">' +
    name +
    "</label>"
  );
}

function generateMultiviewerTab() {
  ogscript.debug("Generating Multiviewer Tab");
  ogscript.setXML(
    "e2-multiviewer-tab",
    generateLabel("Loading Multivewer Layouts")
  );

  const layouts = [
    {
      Name: "Layout 1",
      id: 0
    },
    {
      Name: "Layout 2",
      id: 1
    },
    {
      Name: "Layout 3",
      id: 2
    },
    {
      Name: "Layout 4",
      id: 3
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
      '" width="100" fill="both" buttontype="push">;';
    content +=
      '<task>const ip =  params.getValue("e2.ip", 0); E2(ip).recallMultiviewLayout(' +
      layouts[i].id +
      ");></task>";
    content += "</button>";
  }

  content += "</simplegrid>";

  ogscript.debug(content);
  ogscript.setXML("e2-multiviewer-tab", content);
  ogscript.debug("Finished generating Multiviewer Tab");
}

function generatePresetsTab() {
  ogscript.debug("Generating Presets Tab");

  ogscript.setXML("e2-presets-tab", generateLabel("Loading Presets"));
  function callback(presets) {
    const rows = Math.ceil(presets.length / 2);

    var content =
      '<simplegrid id="e2-presets-grid" rows="' +
      rows +
      '" fill="both" left="10" right="10" top="10" bottom="10">';

    for (var i = 0; i < presets.length; i++) {
      content +=
        '<button  name="' +
        presets[i].Name +
        '" width="100" fill="both" buttontype="push">';
      content +=
        '<task>const ip =  params.getValue("e2.ip", 0); E2(ip).recallPreset(' +
        presets[i].id +
        ")</task>";
      content += "</button>";
    }

    content += "</simplegrid>";
    ogscript.setXML("e2-presets-tab", content);
    ogscript.debug("Finished generating Presets Tab");
  }

  const ip = params.getValue("e2.ip", 0);
  E2(ip).getPresets(callback);
}
