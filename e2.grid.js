function E2(ip) {
  return {
    recallMultiviewLayout(number) {
      ogscript.debug("Recalling E2 Multiview Layout...");
      message =
        '&lt;System id="0" OPID="-1"&gt;&lt;FrameCollection id="0"&gt;&lt;Frame id="00:13:95:2f:6f:7d"&gt;&lt;MultiViewer id="0"&gt;&lt;LayoutSelect&gt;' +
        number +
        "&lt;/LayoutSelect&gt;&lt;/MultiViewer&gt;&lt;/Frame&gt;&lt;/FrameCollection&gt;&lt;/System&gt;\r\n";
      rosstalk.sendMessage(ip, 9876, message);
    },
    getPresets(callback) {
      function httpCallback(response) {
        const result = JSON.parse(response);
        callback(result.result.response);
      }

      // @todo handle timeout/error feedback
      ogscript.debug("Getting E2 Presets...");
      url = "http://" + ip + ":9999/";
      data =
        '{"method": "listPresets", "params": { "ScreenDest": -1}, "id": "1234", "jsonrpc": "2.0"}';
      ogscript.asyncHTTP(url, "POST", "application/json", data, httpCallback);
    },
    recallPreset(number) {
      ogscript.debug("Recalling E2 Preset...");
      const message =
        '&lt;System id="0" OPID="-1"&gt;&lt;PresetMgr id="0"&gt;&lt;RecallPresetToPgmTrans&gt;' +
        number +
        "&lt;/RecallPresetToPgmTrans&gt;&lt;/PresetMgr&gt;&lt;/System&gt;";
      rosstalk.sendMessage(ip, 9876, message);
    }
  };
}
