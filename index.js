
import * as bci2k from "./bci2k/index.esm.js";
import computers from './computers.js'
// import * as bci2k from "./bci2k/index.js";

// import * as bci2k from "https://cdn.jsdelivr.net/npm/bci2k/dist/index.js";

for (let ip in computers) {
    let option = document.createElement('option');
    option.value = ip;
    option.innerText = computers[ip];
    document.querySelector('select').appendChild(option);
}

let operator = new bci2k.BCI2K_OperatorConnection();
let device = new bci2k.BCI2K_DataConnection();
const sleep = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));


const connect = document.getElementById('connect')
const select = document.querySelector('select')

connect.onclick = async () => {

  const baseURI = `ws://${select.value}`

  const p = document.createElement('p')
  p.innerText = 'Trying to connect...'
  document.body.appendChild(p)

  const paragraphs = {}

  try{
    
      let script = ``;
      script += `Startup System localhost; `;
      script += `Add State StimulusCode 4 0; `;
      script += `Add State BrainClick 1 0; `;
      script += `Add State Baseline 1 0; `;
      script += `Add State TrialStart 1 0; `;
      script += `Start executable SignalGenerator; `;
      script += `Start executable DummyApplication; `;
      script += `Start executable DummySignalProcessing; `;
      script += `Set Parameter WSSourceServer *:20100; `;
      script += `Wait for connected; `
      script += `Set Config; `
      script += `Start; `


      const states = {}
      let properties = null

          const gotOperator = await operator.connect(`${baseURI}:80`).then(() => true).catch(e =>  p.innerText = e);
          let response = await operator.execute("GET SYSTEM STATE")
          console.log(`BCI2000 Status: ${response}`);
          operator.resetSystem();

          if(!gotOperator) return;

          console.log("Connected to Operator layer through NodeJS server");
          operator.execute(script);
          await sleep(4000); //Replace with a check to see if BCI2000 is running
          


          let latest = {}
            // Create Event Handlers
            device.onGenericSignal = (raw) => {

                // Update Monitored States
                let monitoredStates = Object.keys(states)
                monitoredStates.forEach(k => {
                    if(device.states[k] != null) {
                        let value = device.states[k][0] // Exclusive (only first index)
                        if (!(k in states)) {
                            states[k] = value
                            console.log('Latest State', k, value)
                        } else if (states[k] != value) {
                            states[k] = value
                            console.log('Latest State', k, value)
                        }
                  }
                })
               
                // Raw Data
                // if (properties) {
                  raw.forEach((arr,i) => {
                    if (!paragraphs[i]) {
                      paragraphs[i] = document.createElement('p')
                      document.body.appendChild(paragraphs[i])
                    }
                    paragraphs[i].innerHTML = `<b>${properties ? properties.channels[i] : i }:</b> ${arr.join(', ')}`
                  })
                // }
            };

            // Initialize Possible Device States
            device.onStateFormat = (data) => {
                let defaults = ['Recording', 'Running', 'SourceTime', 'StimulusTime','__pad0', 'TrialStart', 'Baseline']
                let keys = Object.keys(data)

                keys = keys.filter(k => !defaults.includes(k))

                keys.forEach(stateId => {

                    // Determine Possible Keys
                    let possibilities = Math.pow(data[stateId].bitWidth,2)

                    // Split ID to Derive Additional Specifiers
                    // Create States Based on Possibilities
                    let id = ''
                    states[stateId] = Array.from({length: possibilities}, (e,i) => {
                        if (possibilities > 1) id = `${stateId}_${i}` // Create unique ID
                        else id = stateId
                        return {data: false, meta: {id}} // Set with expected (boolean) value
                    })
                })
            }

            device.onSignalProperties = (data) => {
              console.log('signalProperties', data)
              properties = data
            } // Catch signal properties as a global variable


            const gotDevice = await device.connect(`${baseURI}:20100`).then(() => true).catch(e =>  p.innerText = e);
            if(!gotDevice) return;
  
            p.innerText = 'Connected!'
      //   document.body.appendChild(version)

      // bci.showWindow()
      // bci.execute("GET SYSTEM STATE")
      // await bci.startExecutable("SignalGenerator")
      // await bci.resetSystem();
      // await bci.startDummyRun();
      // let name = await bci.execute("Stop");


  } catch(e){
    p.innerText = e
  }
}
