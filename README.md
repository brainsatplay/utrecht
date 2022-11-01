# utrecht
 BCI Game Design using WASL

## Description
The goal of this project is to develop novel brain-computer interface (BCI) tasks that are engaging to children.

## Getting Started
0. If you're running this example across two computers (e.g. a Mac and a PC), you'll want to run `network.js` to get the local IP address of the computer running BCI2000(Web). 
    - Add this to the object in `computers.js`

1. On your Windows PC, install Node.js, then run `npm install` and `npm start` to start a relay server (`server.js`) and launch a preconfigured instance of BCI2000(Web).

2. Serve the contents of this repository alongside the `index.html` file. We use the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in [Visual Studio Code](https://code.visualstudio.com/). 

3. Open the `index.html` file in any web browser.

4. Selecting the appropriate target computer and press Connect.
    - If everything has run successfully, this will automatically connect to the BCI2000 instance and start passing synthetic data.
    - If this has failed, an error message will pop up describing the issue.

5. If you've successfully connected, you can press the Up / Down / Left / Right buttons to change the reported StimulusCode value in the Developer Console (Ctrl + Click —> Inspect —> Console).

## Next Steps
- [ ] Integrate [bci2k] with device-decoder
- [ ] Emulate the basic P300 task on the browser

## The Details
### Tasks
Each task will have two conditions: feedback and no feedback.

#### Active
The user will try to move their hand / foot, which will trigger some movement on the screen.

#### Evoked
The user will look at flashing objects, which will respond to their glance (e.g. using P300 / SSVEP).

### Acquisition System
We will acquire ECOG and fMRI signals using MicroMed and BlackRock amplifiers.

BCI2000 will receive the data and (1) store it, as well as (2) process it for BCI commands.

### Presentation System
We will develop the games for use on web browsers. They will be able to send/receive WebSocket messages from BCI2000 using the BCI2000Web extension and the [bci2k] library.

## Collaborators
- [Mariana Pedroso Branco](https://www.linkedin.com/in/mariana-pedroso-branco/?originalSubdomain=nl): UMC Utrecht Brain Center
- [Eli Kinney-Lang](https://www.linkedin.com/in/eli-kinney-lang/?originalSubdomain=ca): BCI Games / BCI4Kids Program at the University of Calgary

[bci2k]: https://github.com/cronelab/bci2k.js

