import * as BCI2K from "./bci2k.js/dist/index.js";
  let bciSourceConnection = new BCI2K.BCI2K_DataConnection();
  bciSourceConnection.connect("ws://127.0.0.1:20100").then((x) => {
    bciSourceConnection.onGenericSignal = (x) => {
      console.log(x);
    };
  });