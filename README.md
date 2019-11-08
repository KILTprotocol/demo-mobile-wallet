# KILT Demo Mobile Wallet

## Specifications

[Specs for the MVP version](http://docs.google.com/document/d/1NrqXnTXXCEe8IzIW-tE-jmZrYmqdzunqOVl1oShjUk8/edit#heading=h.skza63p9awqs)

## Stack & Tools

This project is built with react-native and is written in TypeScript.
Utilities such as prettier, eslint and commit linting are set up.

## Dev setup

### Prerequisites

* IMPORTANT: Follow the "Installing dependencies" step at https://facebook.github.io/react-native/docs/getting-started > tab **react-native-cli quickstart**.
* `brew install cocoapods`
* Clone and set up locally the [kilt-cli](https://github.com/KILTprotocol/kilt-cli/blob/master/kilt-cli.ts). This will be used as an attestation service.

### How to run

* Clone the project
* `yarn install` or `yarn` (please do use yarn)
* In the `iOS` folder, run `pod install`
* Open two terminal windows:
  * In one terminal run `yarn start`
  * You should see `Loading dependency graph, done.` at some point
  * In the second terminal, run `react-native run-ios`
  * The iPhone simulator should open automatically and your app should run
* Start the automatic attestation service (kilt-cli):
`npx ts-node kilt-cli.ts --ctype "0x4edaa5b8eea2e071dfe48724f6789d6741c1ce0e0f4466079a1d78ef0c02aea2" --seed "snake rabbit relief hotel naive quiz chicken square office identify obscure tired" --timeout 1`
  
### Run on a physical device (iPhone)

* Prerequisites: follow https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices. Most importantly, you should have a developer account.
* Open XCode and `KILTDemoMobileWallet.xcworkspace` (not the project file but the workspace one, this is important!)
* Connect your phone to your laptop, you should see your device displayed as a target in XCode
* Hit "launch" in XCode

### How to debug

* Visit http://localhost:8081/debugger-ui/
* Open the console
* There you can add breakpoints wherever required

<img width="1429" alt="debug" src="https://user-images.githubusercontent.com/9762897/66653699-e8d35b00-ec38-11e9-994b-8219b67cf0a1.png">

* If you need to explore the UI, use your simulator. On an iPhone simulator:
  * Menu > Hardware > Shake gesture
  * Select Toggle inspector

## Dev troubleshooting

### Troubles to run

Experiencing issues with your redux store not updating?

Keep in mind that we're using redux-persist and that some of the state is persisted to the async storage, aka the local device storage.
To truly reset the store, you mind need to temporarily comment out the `whitelist` attribute in `store.ts` (or change the key to `blacklist`) and refresh the app.

### Troubles to setup

* Ran `react-native init`.
* Added the built KILT sdk-js as a folder (`kiltsdk`) in the root level of the app.
* Ran the app, following the "How to run" instructions above.
* Imported the KILT sdk-js in `App.js` to test it out (e.g. `import * as Kilt from './kiltsdk';`).
* `❌ ERR Bundling failed` *Unable to resolve module `@polkadot/keyring` from `kiltsdk/identity/Identity.js`: @polkadot/keyring could not be found within the project.*
* Added "@polkadot/api" to `package.json` and ran `yarn`. **Must be the same version as in the SDK** (^0.51.1").
* `❌ ERR Bundling failed` *Unable to resolve module `jsonabc` from `kiltsdk/crypto/Crypto.js`: jsonabc could not be found within the project.*
* Added "jsonabc" to `package.json` and ran `yarn`. **Must be the same version as in the SDK**.
* `❌ ERR Bundling failed` *While trying to resolve module `jsonabc` from file `/Users/maudnals/Code/KILTDemoMobileWallet/kiltsdk/crypto/Crypto.js`, the package `/Users/maudnals/Code/KILTDemoMobileWallet/node_modules/jsonabc/package.json` was successfully found. However, this package itself specifies a `main` module field that could not be resolved.*
* True, the file is missing. In `./node_modules/jsonabc`, ran `mkdir dist && npm run build`.
* `❌ ERR Bundling failed` *Unable to resolve module `typescript-logging` from `kiltsdk/config/ConfigLog.js`: typescript-logging could not be found within the project.*
* Added `typescript-logging` to `package.json` and ran `yarn`. **Must be the same version as in the SDK**.
* `❌ ERR Bundling failed` *Error: Unable to resolve module `crypto` from `node_modules/@polkadot/wasm-crypto/crypto-polyfill.js`: crypto could not be found within the project.*
* OK, that's the know issue with native node libraries (see). Ran `rn-nodeify --install --yarn`.
* `shim.js` file created succesfully.
  * Uncommented `require crypto` in `shim.js`;
  * Imported `shim.js` at the top of `index.js` to make it available.
* Added `rn-nodeify --install --yarn` as a postinstall step for convenience.
* `❌ ERR Bundling failed` *TypeError: null is not an object (evaluating RNRandomBytes.seed)*.
* Some libraries were not linked.
  * Ran `react-native link` (https://github.com/tradle/rn-nodeify/issues/16).
  * In `ios` folder ran `pod install` (https://github.com/react-native-community/react-native-device-info/issues/353). `Installing react-native-randombytes` logged on the terminal.
  * Might need to remove `node_modules` and rerun `yarn` plus the two steps right above.
* `❌ ERR Bundling failed` *TypeError: window.removeEventListener is not a function. (In 'window.removeEventListener("message", listener)', 'window.removeEventListener' is undefined) in ExtensionHelper.js:24:43*.
* ... Not sure what this is.
  * Issue created at https://github.com/mreuvers/typescript-logging/issues/43
  * Temp fix: commented lines 24, 25 and 215 at `node_modules/typescript-logging/dist/commonjs/extension/ExtensionHelper.js`:

  ```javascript
    // window.removeEventListener("message", listener);
    // window.addEventListener("message", listener);
  ```
  
* ✅ OK, now runs properly.
* Migrated to TypeScript by following the steps at https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native#migrating-to-typescript

### More troubleshooting

⚠⚠⚠ These are hacks, only do this if you do encounter the errors mentioned below.

Getting `error - Could not find iPhone X simulator`:
--> Try https://stackoverflow.com/questions/58060484/xcode-11-upgrade-could-not-find-iphone-x-simulator-xrpackagemodel-9-0-omo 

Getting `Unknown argument type 'attribute' in method -[RCTAppState getCurrentAppState:error:]. Extend RCTConvert to support this type.`:
--> Try replacing the code in `node_modules/react-native/React/Base/RCTModuleMethod.mm` as mentioned in https://github.com/facebook/react-native/pull/25146/files#diff-263fc157dfce55895cdc16495b55d190
