function E2(ip) {
  return {
    recallMultiviewLayout(number) {
      function _callback(frame_address) {
        ogscript.debug(
          "Recalling E2 Multiview Layout " +
            number +
            " to " +
            ip +
            ":9876" +
            " frame: " +
            frame_address
        );
        message =
          '<System id="0" OPID="-1"><FrameCollection id="0"><Frame id="' +
          frame_address +
          '"><MultiViewer id="0"><LayoutSelect>' +
          number +
          "</LayoutSelect></MultiViewer></Frame></FrameCollection></System>\r\n";
        ogscript.debug(message);
        rosstalk.sendMessage(ip, 9876, message);
      }

      this.getFrameAddress(0, _callback);
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
          ogscript.debug("Preset");
          var preset = presets.item(i);
          var Name = ogscript
            .runXPath("./Name", preset)
            .item(0)
            .getTextContent();
          var id = ogscript.runXPath("./@id", preset).item(0);
          presetsOut.push({ Name: Name, id: id });
        }
        ogscript.debug(
          "Presets loaded:" +
            presetsOut
              .map(function (p) {
                return p.Name;
              })
              .join(",")
        );

        callback(presetsOut);
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';
      this.sendXml(xml, _callback);
    },
    recallPreset(number) {
      ogscript.debug("Recalling E2 Preset " + number + " to " + ip + ":9876");
      const message =
        '<System id="0" OPID="-1"><PresetMgr id="0"><RecallPresetToPgmTrans>' +
        number +
        "</RecallPresetToPgmTrans></PresetMgr></System>";
      rosstalk.sendMessage(ip, 9876, message);
    },

    sendXml(xml, callback) {
      function _callback(success, _, response, _) {
        if (success) {
          callback(response + ">");
        }
      }
      rosstalk.sendMessageWithResponse(ip, 9876, xml, "</System>", _callback);
    }
  };
}
