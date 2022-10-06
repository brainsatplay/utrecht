import * as bci2k from "./bci2k/index.esm.js";
// import * as bci2k from "https://cdn.jsdelivr.net/npm/bci2k/dist/index.js";
let bci = new bci2k.BCI2K_OperatorConnection();

const uri = 'ws://127.0.0.1:20100'

try{
    await bci.connect(uri)
    console.log('connected')
    // bci.showWindow()
    // bci.execute("GET SYSTEM STATE")
    // await bci.startExecutable("SignalGenerator")
    // await bci.resetSystem();
    // await bci.startDummyRun();
    let v = bci.getVersion()
    // let name = await bci.execute("Stop");
    console.log('Version', v)
}
catch(e){
    console.log(e)
}

let bciSourceConnection = new bci2k.BCI2K_DataConnection();
bciSourceConnection.connect(uri).then((x) => {
  bciSourceConnection.onGenericSignal = (x) => {
    console.log(x);
  };
});