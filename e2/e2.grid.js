function E2(ip) {
  return {
    recallMultiviewLayout(frame_address, index) {
      // multiviewer grid
      ogscript.debug(
        "Recalling E2 Multiview Layout " +
          index +
          " to " +
          ip +
          ":9876" +
          " for frame " +
          frame_address
      );
      message =
        '<System id="0" OPID="-1"><FrameCollection id="0"><Frame id="' +
        frame_address +
        '"><MultiViewer id="0"><LayoutSelect>' +
        index +
        "</LayoutSelect></MultiViewer></Frame></FrameCollection></System>\r\n";
      ogscript.debug(message);
      rosstalk.sendMessage(ip, 9876, message);
    },
    getFrameAddress(index, callback) {
      function _callback(response) {
        var document = ogscript.parseXML(response);

        const frames = ogscript.runXPath(
          "/System/FrameCollection/Frame",
          document
        );

        callback(
          ogscript
            .runXPath("./@id", frames.item(index))
            .item(0)
            .getTextContent()
        );
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';

      this.sendXml(xml, _callback);
    },
    getPresets(callback) {
      function _callback(response) {
        var document = ogscript.parseXML(response);

        // Get Presets
        const presets = ogscript.runXPath("/System/PresetMgr/Preset", document);
        var presetsOut = [];

        for (i = 0; i < presets.getLength(); i++) {
          var preset = presets.item(i);
          var Name = ogscript
            .runXPath("./Name", preset)
            .item(0)
            .getTextContent();
          var presetSno = ogscript
            .runXPath("./presetSno", preset)
            .item(0)
            .getTextContent();
          var id = ogscript.runXPath("./@id", preset).item(0).getTextContent();
          presetsOut.push({ presetSno: presetSno, Name: Name, id: id });
        }

        callback(presetsOut);
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';
      this.sendXml(xml, _callback);
    },
    recallPreset(id) {
      ogscript.debug("Recalling E2 Preset ID #" + id + " to " + ip + ":9876");
      function _callback(_response) {}
      const xml =
        '<System id="0" OPID="-1"><PresetMgr id="0"><RecallPresetToPgmTrans>' +
        id +
        "</RecallPresetToPgmTrans></PresetMgr></System>";
      this.sendXml(xml, _callback);
    },

    sendXml(xml, callback) {
      function _callback(success, _, response, _) {
        if (success) {
          ogscript.debug("Received response: " + response + ">");
          callback(response + ">");
        }
      }
      ogscript.debug("Sending: " + xml);
      rosstalk.sendMessageWithResponse(ip, 9876, xml, "</System>", _callback);
    }
  };
}
