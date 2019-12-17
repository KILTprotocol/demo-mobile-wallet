# Dev setup troubleshooting

## Trouble running the app

### Issues with the redux store not updating
Keep in mind that we're using redux-persist and that some of the state is persisted to the async storage, aka the local device storage.
To truly reset the store as you're developing, you mind need to temporarily comment out the `whitelist` attribute in `store.ts` (or change the key to `blacklist`) and refresh the app.

### Missing package or metro bundler error
Run `pod install` and `yarn`.
If the issue persists, remove the `./build` folder.

## Trouble setting the app up

- Ran `react-native init`.
- Added the built KILT sdk-js as a folder (`kiltsdk`) in the root level of the app.
- Ran the app, following the "How to run" instructions above.
- Imported the KILT sdk-js in `App.js` to test it out (e.g. `import * as Kilt from './kiltsdk';`).
- `❌ ERR Bundling failed` _Unable to resolve module `@polkadot/keyring` from `kiltsdk/identity/Identity.js`: @polkadot/keyring could not be found within the project._
- Added "@polkadot/api" to `package.json` and ran `yarn`. **Must be the same version as in the SDK** (^0.51.1").
- `❌ ERR Bundling failed` _Unable to resolve module `jsonabc` from `kiltsdk/crypto/Crypto.js`: jsonabc could not be found within the project._
- Added "jsonabc" to `package.json` and ran `yarn`. **Must be the same version as in the SDK**.
- `❌ ERR Bundling failed` _While trying to resolve module `jsonabc` from file `/Users/maudnals/Code/KILTDemoMobileWallet/kiltsdk/crypto/Crypto.js`, the package `/Users/maudnals/Code/KILTDemoMobileWallet/node_modules/jsonabc/package.json` was successfully found. However, this package itself specifies a `main` module field that could not be resolved._
- True, the file is missing. In `./node_modules/jsonabc`, ran `mkdir dist && npm run build`.
- `❌ ERR Bundling failed` _Unable to resolve module `typescript-logging` from `kiltsdk/config/ConfigLog.js`: typescript-logging could not be found within the project._
- Added `typescript-logging` to `package.json` and ran `yarn`. **Must be the same version as in the SDK**.
- `❌ ERR Bundling failed` _Error: Unable to resolve module `crypto` from `node_modules/@polkadot/wasm-crypto/crypto-polyfill.js`: crypto could not be found within the project._
- OK, that's the know issue with native node libraries (see). Ran `rn-nodeify --install --yarn`.
- `shim.js` file created succesfully.
  - Uncommented `require crypto` in `shim.js`;
  - Imported `shim.js` at the top of `index.js` to make it available.
- Added `rn-nodeify --install --yarn` as a postinstall step for convenience.
- `❌ ERR Bundling failed` _TypeError: null is not an object (evaluating RNRandomBytes.seed)_.
- Some libraries were not linked.
  - Ran `react-native link` (https://github.com/tradle/rn-nodeify/issues/16).
  - In `ios` folder ran `pod install` (https://github.com/react-native-community/react-native-device-info/issues/353). `Installing react-native-randombytes` logged on the terminal.
  - Might need to remove `node_modules` and rerun `yarn` plus the two steps right above.
- `❌ ERR Bundling failed` _TypeError: window.removeEventListener is not a function. (In 'window.removeEventListener("message", listener)', 'window.removeEventListener' is undefined) in ExtensionHelper.js:24:43_.
- ... Not sure what this is.

  - Issue created at https://github.com/mreuvers/typescript-logging/issues/43
  - Temp fix: commented lines 24, 25 and 215 at `node_modules/typescript-logging/dist/commonjs/extension/ExtensionHelper.js`:

  ```javascript
  // window.removeEventListener("message", listener);
  // window.addEventListener("message", listener);
  ```

- ✅ OK, now runs properly.
- Migrated to TypeScript by following the steps at https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native#migrating-to-typescript

## More troubleshooting

⚠⚠⚠ These are hacks, only do this if you do encounter the errors mentioned below.

Getting `error - Could not find iPhone X simulator`:
--> Try https://stackoverflow.com/questions/58060484/xcode-11-upgrade-could-not-find-iphone-x-simulator-xrpackagemodel-9-0-omo

Getting `Unknown argument type 'attribute' in method -[RCTAppState getCurrentAppState:error:]. Extend RCTConvert to support this type.`:
--> Try replacing the code in `node_modules/react-native/React/Base/RCTModuleMethod.mm` as mentioned in https://github.com/facebook/react-native/pull/25146/files#diff-263fc157dfce55895cdc16495b55d190
