function E2(ip) {
  return {
    recallMultiviewLayout(number) {
      // @todo get frame id
      ogscript.debug(
        "Recalling E2 Multiview Layout " + number + " to " + ip + ":9876"
      );
      message =
        '<System id="0" OPID="-1"><FrameCollection id="0"><Frame id="00:13:95:2f:6f:7d"><MultiViewer id="0"><LayoutSelect>' +
        number +
        "</LayoutSelect></MultiViewer></Frame></FrameCollection></System>\r\n";
      rosstalk.sendMessage(ip, 9876, message);
    },
    getPresets(callback) {
      function httpCallback(response) {
        const result = JSON.parse(response);
        callback(result.result.response);
      }

      // @todo handle timeout/error feedback
      ogscript.debug("Getting E2 Presets from " + ip + ":9999");
      url = "http://" + ip + ":9999/";
      data =
        '{"method": "listPresets", "params": { "ScreenDest": -1}, "id": "1234", "jsonrpc": "2.0"}';
      ogscript.asyncHTTP(url, "POST", "application/json", data, httpCallback);
    },
    recallPreset(number) {
      ogscript.debug("Recalling E2 Preset " + number + " to " + ip + ":9876");
      const message =
        '<System id="0" OPID="-1"><PresetMgr id="0"><RecallPresetToPgmTrans>' +
        number +
        "</RecallPresetToPgmTrans></PresetMgr></System>";
      rosstalk.sendMessage(ip, 9876, message);
    }
  };
}
