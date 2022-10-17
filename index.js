import * as bci2k from "./bci2k/index.esm.js";
// import * as bci2k from "https://cdn.jsdelivr.net/npm/bci2k/dist/index.js";
let bci = new bci2k.BCI2K_OperatorConnection();

const localhost = '127.0.0.1'
const garrettPC = '192.168.0.11'
const uri = `ws://${localhost}:20100`

const p = document.createElement('p')
p.innerText = 'Trying to connect...'
document.body.appendChild(p)

// // NOTE: This has some broken message-passing
try{

//     await bci.connect(uri)    
//     p.innerText = 'Connected!'

//     // let v = await bci.getVersion()
//     //   const version = document.createElement('p')
//     //   version.innerText = `Version: ${v}`
//     //   document.body.appendChild(version)

//     // bci.showWindow()
//     // bci.execute("GET SYSTEM STATE")
//     // await bci.startExecutable("SignalGenerator")
//     // await bci.resetSystem();
//     // await bci.startDummyRun();
//     // let name = await bci.execute("Stop");
// }


  let bciSourceConnection = new bci2k.BCI2K_DataConnection();
  bciSourceConnection.connect(uri).then((x) => {
    bciSourceConnection.onGenericSignal = (x) => {
      console.log(x);
      // const p = document.createElement('p')
      p.innerText = `Signal: ${x}`
      // document.body.appendChild(p)
    };
  }).catch(e => {
    p.innerText = e
  });
} catch(e){
  p.innerText = e
}