import * as bci2k from "./bci2k/index.esm.js";
// import * as bci2k from "./bci2k/index.js";

// import * as bci2k from "https://cdn.jsdelivr.net/npm/bci2k/dist/index.js";

let operator = new bci2k.BCI2K_OperatorConnection();
let device = new bci2k.BCI2K_DataConnection();
const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));



const connect = document.getElementById('connect')
const select = document.querySelector('select')

connect.onclick = async () => {

  const baseURI = `ws://${select.value}`
  const uri = `${baseURI}:20100`


  const p = document.createElement('p')
  p.innerText = 'Trying to connect...'
  document.body.appendChild(p)

  const paragraphs = {}

  try{

    // Test Script from Chris (node.js)
    try{
      await operator.connect(`${baseURI}:80`)
      let response = await operator.execute("GET SYSTEM STATE")
      console.log(`BCI2000 Status: ${response}`);
      operator.resetSystem();
      let script = ``;
      script += `Reset System; `;
      script += `Startup System localhost; `;
      script += `Start executable SignalGenerator; `
      script += `Start executable DummySignalProcessing; `
      script += `Start executable DummyApplication; `
      script += `Set Parameter WSSourceServer *:20100; `
      script += 'Wait for Connected; ';
      script += 'Set Config; ';
      script += 'Start; ';
      operator.execute(script);
      await sleep(4000); //Replace with a check to see if BCI2000 is running
      await device.connect(`${baseURI}:20100`)

      device.onGenericSignal = signal => {
          // console.log(signal);
      }
      operator.execute('SET STATE StimulusCode 1') //Set the state StimulusCode to 1, indicating an application did something
      device.onStateVector = stateVector => {
          if(stateVector['StimulusCode'] == 1) {  
              console.log('Got!', stateVector)
              // doSomethingInResponseToATaskBeingPresentedToAUser();
          }
      }
      device.onSignalProperties = signalProperties => {
          console.log(signalProperties)
      }
      device.onStateFormat = stateFormat => {
          console.log(stateFormat)
      }
  }
  catch(e){
      console.log(e)
  }
    // // ORIGINAL TEST SCRIPT
      // let script = ``;
      // script += `Reset System; `;
      // script += `Startup System localhost; `;
      // script += `Add State StimulusCode 4 0; `;
      // script += `Add State BrainClick 1 0; `;
      // script += `Add State Baseline 1 0; `;
      // script += `Add State TrialStart 1 0; `;
      // script += `Start executable SignalGenerator; `;
      // script += `Start executable DummyApplication; `;
      // script += `Start executable DummySignalProcessing; `;
      // script += `Set Parameter WSSourceServer *:20100; `;
      // script += `Wait for connected; `
      // script += `Set Config; `
      // script += `Start; `


      // const states = {}
      // let properties = {}

      //     const gotOperator = await operator.connect(uri).then(() => true).catch(e =>  p.innerText = e);
      //     if(!gotOperator) return;

      //     console.log("Connected to Operator layer through NodeJS server");
      //     operator.execute(script);


      //     const gotDevice = await device.connect(uri).then(() => true).catch(e =>  p.innerText = e);
      //     if(!gotDevice) return;


      //     let v = await operator.getVersion()
      //     const version = document.createElement('p')
      //     version.innerText = `Version: ${v}`
      //     document.body.insertAdjacentElement('afterbegin', version)

      //     p.innerText = 'Connected!'

      //       // Create Event Handlers
      //       device.onGenericSignal = (raw) => {

      //           // Update Monitored States
      //           let monitoredStates = Object.keys(states)
      //           monitoredStates.forEach(k => {
      //               if(device.states[k] != null) {

      //                   // LIMITATIONS
      //                   // BCI2000 only supports (1) exclusive and (2) binary switches for now. 
      //                   // The framework itself supports values from 0-1 for any particular state.

      //                   let value = device.states[k][0] // Exclusive (only first index)
      //                   console.log('State', k, value)
      //               //     // if (Object.keys(this.states[k].length == 1) || value != 0){
      //               //     if (this.states[k][value].data != true){
      //               //     this.states[k].forEach((state,i) => { // Exclusive (resets states not chosen)
      //               //         if (i === value) {
      //               //             this.states[k][value].data = true // Binary
      //               //         }
      //               //         else {
      //               //             if (this.states[k][i].data != false) {
      //               //                 this.states[k][i].data = false // Binary
      //               //             }
      //               //         }
      //               //     })
      //               // // }
      //               // }
      //             }
      //           })
               
      //           // Raw Data
      //           raw.forEach((arr,i) => {
      //             if (!paragraphs[i]) {
      //               paragraphs[i] = document.createElement('p')
      //               document.body.appendChild(paragraphs[i])
      //             }
      //             paragraphs[i].innerHTML = `<b>${properties.channels[i]}:</b> ${arr.join(', ')}`
      //           })
      //       };

      //       // Initialize Possible Device States
      //       device.onStateFormat = (data) => {
      //           let defaults = ['Recording', 'Running', 'SourceTime', 'StimulusTime','__pad0', 'TrialStart', 'Baseline']
      //           let keys = Object.keys(data)

      //           console.log('data'. data)
      //           keys = keys.filter(k => !defaults.includes(k))

      //           keys.forEach(stateId => {
      //               // Determine Possible Keys
      //               let possibilities = Math.pow(data[stateId].bitWidth,2)

      //               // Split ID to Derive Additional Specifiers
      //               // Create States Based on Possibilities
      //               let id = ''
      //               states[stateId] = Array.from({length: possibilities}, (e,i) => {
      //                   if (possibilities > 1) id = `${stateId}_${i}` // Create unique ID
      //                   else id = stateId
      //                   return {data: false, meta: {id}} // Set with expected (boolean) value
      //               })
      //           })
      //       }

      //       device.onSignalProperties = (data) => properties = data // Catch signal properties as a global variable

      // //   document.body.appendChild(version)

      // // bci.showWindow()
      // // bci.execute("GET SYSTEM STATE")
      // // await bci.startExecutable("SignalGenerator")
      // // await bci.resetSystem();
      // // await bci.startDummyRun();
      // // let name = await bci.execute("Stop");


  } catch(e){
    p.innerText = e
  }
}