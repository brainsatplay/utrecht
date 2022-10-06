# utrecht
 BCI Game Design using WASL

## Description
The goal of this project is to develop novel brain-computer interface (BCI) tasks that are engaging to children.

## Running the Example
1. Using a Windows PC, run the `bci2000/startme.bat` file. This will start a preconfigured instance of BCI2000(Web).
2. Drag the `index.html` file into any web browser
- If everything has run successfully, this will automatically connect to the BCI2000 instance and start passing synthetic data.
- If this has failed, an error message will pop up describing the issue.

## Next Steps
- [x] Setup BCI2000Web on a PC
- [x] Receive messages in a basic HTML file
- [ ] Integrate [bci2k] with device-decoder
- [ ] Emulate the basic P300 task on the browser
- [ ] Meet for further discussion with Mariana and Eli

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

