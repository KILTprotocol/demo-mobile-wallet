# KILT Demo mobile wallet

## Specifications

[Specs for the MVP version](http://docs.google.com/document/d/1NrqXnTXXCEe8IzIW-tE-jmZrYmqdzunqOVl1oShjUk8/edit#heading=h.skza63p9awqs)

## Dev setup

### Prerequisites

Follow the "Installing dependencies" step at https://facebook.github.io/react-native/docs/getting-started > tab **react-native-cli quickstart**.

### How to run

* Clone the project
* `yarn install` or `yarn` (please do use yarn)
* Open two terminal windows:
  * In one terminal run `yarn start`
  * You should see `Loading dependency graph, done.` at some point
  * In the second terminal, run `react-native run-ios`
  * The iPhone simulator should open automatically and your app should run

### How to debug

* Visit http://localhost:8081/debugger-ui/
* Open the console
* There you can add breakpoints wherever required

<img width="1429" alt="debug" src="https://user-images.githubusercontent.com/9762897/66653699-e8d35b00-ec38-11e9-994b-8219b67cf0a1.png">

* If you need to explore the UI, use your simulator. On an iPhone simulator:
  * Menu > Hardware > Shake gesture
  * Select Toggle inspector

### Troubleshooting

### More troubleshooting

⚠⚠⚠ These are hacks, only do this if you do encounter the errors mentioned below.

Getting `error - Could not find iPhone X simulator`:
--> Try https://stackoverflow.com/questions/58060484/xcode-11-upgrade-could-not-find-iphone-x-simulator-xrpackagemodel-9-0-omo 

Getting `Unknown argument type 'attribute' in method -[RCTAppState getCurrentAppState:error:]. Extend RCTConvert to support this type.`:
--> Try replacing the code in `node_modules/react-native/React/Base/RCTModuleMethod.mm` as mentioned in https://github.com/facebook/react-native/pull/25146/files#diff-263fc157dfce55895cdc16495b55d190