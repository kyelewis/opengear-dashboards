function E2(ip) {
  return {
    getXPathTextContentOrUndefined(path, document) {
      var value = ogscript.runXPath(path, document);
      if (value.getLength() < 1) return;
      return value.item(0).getTextContent();
    },

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

    nameForCardType(type) {
      switch (type) {
        case "1":
          return "SDI Input";
        case "2":
          return "HDMI/DP Input";
        case "4":
          return "HDMI 2.0 Input";
        case "5":
          return "DP 1.2 Input";
        case "21":
          return "SDI Output";
        case "22":
          return "HDMI 1.4 Output";
        case "26":
          return "HDMI 2.0 Output";
        case "40":
          return "MVR Output";
        case "50":
          return "VPU";
        case "70":
          return "Expansion";
        default:
          return "Type " + type;
      }
    },

    getCards(frame_address, callback) {
      var parent = this;

      function _callback(response) {
        const document = ogscript.parseXML(response);

        const slots = ogscript.runXPath(
          "/System/FrameCollection[@id=0]/Frame[@id='" +
            frame_address +
            "']/Slot",
          document
        );

        const result = [];

        for (i = 0; i < slots.getLength(); i++) {
          var slot = slots.item(i);

          var card = ogscript.runXPath("Card", slot).item(0);

          var type = ogscript
            .runXPath("./CardType", card)
            .item(0)
            .getTextContent();

          if (type === "255") continue;

          var id = ogscript.runXPath("./CardID", card).item(0).getTextContent();

          result.push({ id: id, type: parent.nameForCardType(type) });
        }

        callback(result);
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';
      this.sendXml(xml, _callback);
    },

    nameForVideoInputType(type) {
      switch (type) {
        case "0":
          return "Input";
        case "1":
          return "Background";
        default:
          return "Type " + type;
      }
    },
    nameForVideoInputStatus(status) {
      switch (status) {
        case "1":
          return "Active";
        case "4":
          return "No Signal";
        default:
          return "Status " + status;
      }
    },
    getInputs(callback) {
      var parent = this;

      function _callback(response) {
        const document = ogscript.parseXML(response);

        const sources = ogscript.runXPath(
          "/System/SrcMgr[@id=0]/InputCfgCol[@id=0]/InputCfg",
          document
        );

        const result = [];

        for (i = 0; i < sources.getLength(); i++) {
          var source = sources.item(i);

          var name = ogscript
            .runXPath("./Name", source)
            .item(0)
            .getTextContent();

          var type = parent.getXPathTextContentOrUndefined(
            "./InputCfgType",
            source
          );

          var id = parent.getXPathTextContentOrUndefined("./@id", source);

          var videoStatus = parent.getXPathTextContentOrUndefined(
            "./InputCfgVideoStatus",
            source
          );

          var captureStatus = parent.getXPathTextContentOrUndefined(
            "./CaptureStatus",
            source
          );

          result.push({
            id: id,
            name: name,
            type: parent.nameForVideoInputType(type),
            videoStatus: parent.nameForVideoInputStatus(videoStatus),
            captureStatus: captureStatus
          });
        }

        callback(result);
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';
      this.sendXml(xml, _callback);
    },

    getStills(callback) {
      var parent = this;

      function _callback(response) {
        const document = ogscript.parseXML(response);

        const stills = ogscript.runXPath(
          "/System/StillMgr[@id=0]/Still",
          document
        );

        const result = [];

        for (i = 0; i < stills.getLength(); i++) {
          var still = stills.item(i);

          var name = parent.getXPathTextContentOrUndefined("./Name", still);
          var id = parent.getXPathTextContentOrUndefined("./@id", still);
          var width = parent.getXPathTextContentOrUndefined("./HSize", still);
          var height = parent.getXPathTextContentOrUndefined("./VSize", still);

          result.push({
            id: id,
            name: name,
            width: width,
            height: height
          });
        }

        callback(result);
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';
      this.sendXml(xml, _callback);
    },

    getDestinations(callback) {
      var parent = this;

      function _callback(response) {
        const document = ogscript.parseXML(response);

        const screenDestinations = ogscript.runXPath(
          "/System/DestMgr[@id=0]/ScreenDestCol[@id=0]/ScreenDest",
          document
        );

        const auxDestinations = ogscript.runXPath(
          "/System/DestMgr[@id=0]/AuxDestCol[@id=0]/AuxDest",
          document
        );

        const linkDestinations = ogscript.runXPath(
          "/System/DestMgr[@id=0]/LinkDestCol[@id=0]/LinkDest",
          document
        );

        const result = [];

        for (i = 0; i < screenDestinations.getLength(); i++) {
          var dest = screenDestinations.item(i);

          var name = ogscript.runXPath("./Name", dest).item(0).getTextContent();
          var width = ogscript
            .runXPath("./HSize", dest)
            .item(0)
            .getTextContent();

          var height = ogscript
            .runXPath("./VSize", dest)
            .item(0)
            .getTextContent();

          result.push({
            name: name,
            type: "Screen",
            width: width,
            height: height
          });
        }

        for (i = 0; i < auxDestinations.getLength(); i++) {
          var dest = auxDestinations.item(i);

          var name = ogscript.runXPath("./Name", dest).item(0).getTextContent();

          result.push({
            name: name,
            type: "AUX",
            width: "",
            height: ""
          });
        }

        for (i = 0; i < linkDestinations.getLength(); i++) {
          var dest = linkDestinations.item(i);

          var name = ogscript.runXPath("./Name", dest).item(0).getTextContent();
          var width = ogscript
            .runXPath("./HSize", dest)
            .item(0)
            .getTextContent();

          var height = ogscript
            .runXPath("./VSize", dest)
            .item(0)
            .getTextContent();

          result.push({
            name: name,
            type: "Super",
            width: width,
            height: height
          });
        }

        callback(result);
      }

      xml =
        '<System id="0"><XMLType>3</XMLType><Query>3</Query><Recursive>1</Recursive></System>';
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
