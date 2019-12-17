# KILT Demo Mobile Wallet

## Specifications

[Specs for the S, M and L versions](https://docs.google.com/document/d/14gR8-lnnevRxU5TQ6pHAxvqktfOA6wGutgXmPFcFCTM/edit#)

## Demo setup

If you'd like to demo the attestation part of tehe flow via the demo-client, you'll need to create a new identity in the demo-client **with the following mnemonic**:

`daring able century salute oxygen purse hub boat dry three core opera`

## Stack & Tools

This project is built with react-native and is written in TypeScript.
Utilities such as prettier, eslint and commit linting are set up.

## Dev setup

### Prerequisites

- IMPORTANT: Follow the "Installing dependencies" step at https://facebook.github.io/react-native/docs/getting-started > tab **react-native-cli quickstart**.
- `brew install cocoapods`
- Clone and set up locally the [kilt-cli](https://github.com/KILTprotocol/kilt-cli/blob/master/kilt-cli.ts). This will be used as an attestation service.

### How to run

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

### Run on a physical device (iPhone)

- Prerequisites: follow https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices. Most importantly, you should have a developer account.
- Open XCode and `KILTDemoMobileWallet.xcworkspace` (not the project file but the workspace one, this is important!)
- Connect your phone to your laptop, you should see your device displayed as a target in XCode
- Hit "launch" in XCode

### Debug

- Visit http://localhost:8081/debugger-ui/
- Open the console
- There you can add breakpoints wherever required

<img width="1429" alt="debug" src="https://user-images.githubusercontent.com/9762897/66653699-e8d35b00-ec38-11e9-994b-8219b67cf0a1.png">

- If you need to explore the UI, use your simulator. On an iPhone simulator:
  - Menu > Hardware > Shake gesture
  - Select Toggle inspector
