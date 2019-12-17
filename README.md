<p align="center">
<img width="220" src="https://user-images.githubusercontent.com/9762897/67468312-9176b700-f64a-11e9-8d88-1441380a71f6.jpg">  
  <div align="center"><sup><a href="https://kilt.io">kilt.io</a></sup></div> 
</p>

# KILT Demo Mobile Wallet (Sporran)

_The sporran (/ˈspɒrən/; Scottish Gaelic for "purse"), a traditional part of Scottish Highland dress, is a pouch that performs the same function as pockets on the pocketless kilt. Made of leather or fur, the sporran serves as a **wallet** for any other necessary personal items._ (Source: https://en.wikipedia.org/wiki/Sporran)

## Specifications
- Supported devices: iPhone 8 or later model (tested until iPhone X). Note that on the iPhone X, FaceID is not supported yet so the passcode is used. **Not tested on Android.** 
- Prerequisites: A passcode or TouchID should be set up on your device.

## Disclaimer

This app was designed to demo the core feature set of KILT. We don't recommend using it in production and it is a Work In Progress. 
However feel free to open issues if you note that something is off.

## Demo flow

If you'd like to demo the attestation part of the flow via the demo-client, you'll need to create a new identity in the demo-client **with the following mnemonic**:
`daring able century salute oxygen purse hub boat dry three core opera`

## Stack & Tools

This project is built with react-native and is written in TypeScript.

Utilities such as prettier, eslint and commit linting are set up.

## Dev setup

### Prerequisites

- IMPORTANT: Follow the "Installing dependencies" step at https://facebook.github.io/react-native/docs/getting-started > tab **react-native-cli quickstart**.
- `brew install cocoapods`

### Run on an iPhone (recommended dev setup)

- Prerequisites: follow https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices. Most importantly, you should have a developer account.
- Open XCode and `KILTDemoMobileWallet.xcworkspace` (not the project file but the workspace one, this is important!)
- Connect your phone to your laptop, you should see your device displayed as a target in XCode
- Hit "launch" in XCode

### Run on a simulator

- Clone the project
- `yarn install` or `yarn` (please do use yarn)
- In the `iOS` folder, run `pod install`
- Open two terminal windows:
  - In one terminal run `yarn start`
  - You should see `Loading dependency graph, done.` at some point
  - In the second terminal, run `react-native run-ios`
  - The iPhone simulator should open automatically and your app should run
- Start the automatic attestation service (kilt-cli):
  `npx ts-node kilt-cli.ts --ctype "0x4edaa5b8eea2e071dfe48724f6789d6741c1ce0e0f4466079a1d78ef0c02aea2" --seed "snake rabbit relief hotel naive quiz chicken square office identify obscure tired" --timeout 1`

### Debug

- Visit http://localhost:8081/debugger-ui/
- Open the console
- There you can add breakpoints wherever required

<img width="1429" alt="debug" src="https://user-images.githubusercontent.com/9762897/66653699-e8d35b00-ec38-11e9-994b-8219b67cf0a1.png">

- If you need to explore the UI, use your simulator. On an iPhone simulator:
  - Menu > Hardware > Shake gesture
  - Select Toggle inspector
