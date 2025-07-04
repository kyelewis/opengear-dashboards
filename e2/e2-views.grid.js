function generateLabel(name) {
  return (
    '<label top="10" left="10" right="10" bottom="10" style="txt-align:center;">' +
    name +
    "</label>"
  );
}

function generateMultiviewerTab() {
  ogscript.setXML("e2-tab-1", generateLabel("Loading Multivewer Layouts"));

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
      '" width="100" fill="both" buttontype="push">';
    content += "<task>";
    content +=
      'const ip =  params.getValue("e2.ip", 0); E2(ip).recallMultiviewLayout(' +
      layouts[i].id +
      ");";
    content += "</task>";
    content += "</button>";
  }

  content += "</simplegrid>";

  ogscript.setXML("e2-tab-1", content);
}

function generatePresetsTab() {
  ogscript.setXML("e2-tab-2", generateLabel("Loading Presets"));
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
      content += "<task>";
      content +=
        'const ip =  params.getValue("e2.ip", 0); E2(ip).recallPreset(' +
        presets[i].id +
        ");";
      content += "</task>";
      content += "</button>";
    }

    content += "</simplegrid>";
    ogscript.setXML("e2-tab-2", content);
  }

  const ip = params.getValue("e2.ip", 0);
  E2(ip).getPresets(callback);
}
