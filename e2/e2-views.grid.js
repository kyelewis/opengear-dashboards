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
      // @todo use presetSno for gpi
      content +=
        '<button name="' +
        presets[i].Name +
        " (" +
        presets[i].presetSno +
        ')" gpi="preset_' +
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
