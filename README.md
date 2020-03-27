<p align="center">
<img width="220" src="https://user-images.githubusercontent.com/9762897/67468312-9176b700-f64a-11e9-8d88-1441380a71f6.jpg">  
  <div align="center"><sup><a href="https://kilt.io">kilt.io</a></sup></div> 
</p>

# KILT Demo Mobile Wallet (Sporran)

## About

_The sporran (/ˈspɒrən/; Scottish Gaelic for "purse"), a traditional part of Scottish Highland dress, is a pouch that performs the same function as pockets on the pocketless kilt. Made of leather or fur, the sporran serves as a **wallet** for any other necessary personal items._ ([Source](https://en.wikipedia.org/wiki/Sporran))

**Sporran** is the demo mobile wallet for a KILT Claimer. A claimer can use Sporran to:

- Create an identity and store it encrypted on the device;
- Create claims;
- Request attestations for these claims to specific attesters by scanning their public identity QR Code;
- Add contacts by scanning their public identity as a QR Code;
- Transfer KILT Tokens.

<p align="center">
<img width="300" src="https://user-images.githubusercontent.com/9762897/71015282-9d837000-20f3-11ea-88a8-16c39a74f10a.jpg">  
</p>

## Disclaimer

⚠️ This app was designed to demo the core feature set of KILT. We don't recommend using it in production and it is a Work In Progress.
However, feel free to open issues if you note that something is off.

## Specifications

- Supported devices: iPhone 8 or later model (tested until iPhone X). Note that on the iPhone X, FaceID is not supported yet so the passcode is used. **Tested on iOS only. Not tested on Android.**
- Prerequisites: A passcode or TouchID should be set up on your device.

## Demo flow

You can demo the mobile wallet as a claimer, and use the demo-client to demo the attester.
[Here's an example of a demo flow.](https://github.com/KILTprotocol/demo-mobile-wallet/blob/master/docs/Demo%20Flow.md)

Alternatively, if you don't want to use the demo-client and if you do have access to the [KILT CLI](https://github.com/KILTprotocol/kilt-cli) (internal use only), you can run the automatic attestation service:
`npx ts-node kilt-cli.ts --ctype "0x4edaa5b8eea2e071dfe48724f6789d6741c1ce0e0f4466079a1d78ef0c02aea2" --seed <mnemonic> --timeout 1`

## Make it yours!

You can configure Sporran to fit your needs and branding in a few minutes!

You can customize the logos and theme, endpoints, and most importantly the business logic (credential type = claim type = CTYPE) super easily.

Check out how in the table below:

| What you can customize   | How to customize it                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branding: colors         | Change the theme colors in `src/config.ts`                                                                                                                                                                                                                                                                                                |
| Branding: logo           | Replace the logos in the `src/assets/imgs/logos` folder with your logo and specify the logo dimensions in `src/config.ts`                                                                                                                                                                                                                 |
| Endpoints and blockchain | Change these in `src/config.ts`. Note that when a request for attestation is sent, the destination (`serviceAddress`) is specified in the attester QR Code the user scans; otherwise a fallback destination is used (see `src/config.ts`).                                                                                                |
| CTYPE                    | Create a CTYPE and replace `ctype.json` in `src/data` with your CTYPE as json. The form will update automatically in the UI! Right now the supported types for claim properties are: **strings, strings formatted as dates, booleans and integers**. Make sure the CTYPE hash is saved on the same chain instance as the chain specified in `config/ts`. |

export default CONFIG
export const CONFIG_THEME = CONFIG.THEME
export const CONFIG_CONNECT = CONFIG.CONNECT
export const CONFIG_CLAIM = CONFIG.CLAIM

NB: to customize then run the app, look at the `## Dev setup` section in this document.

## Stack & Tools

This project is built with react-native and is written in **TypeScript**; it's detached from Expo.
Utilities such as prettier, eslint and commit linting are set up.

For **storage and state management**, we combine [redux-persist](https://github.com/rt2zz/redux-persist) with [react-native-keychain](https://github.com/oblador/react-native-keychain) (for encrypted data).

The wallet uses the [KILT SDK](https://github.com/KILTprotocol/sdk-js).

Note that we're also using [rn-nodeify](https://www.npmjs.com/package/rn-nodeify) (see `postinstall` step in `package.json`) in order to be able to use Crypto features as secondary dependencies of the KILT SDK.

## Dev setup

### Prerequisites

- 🔺IMPORTANT: Follow the "Installing dependencies" step at https://facebook.github.io/react-native/docs/getting-started > tab **react-native-cli quickstart**.
- `brew install cocoapods` (and maybe `brew reinstall cocoapods` if any issue there with your rb path)
- Clone this repo
- In the root folder, run `yarn install` or `yarn` (please do use **yarn**)
- (`npm install -g browserify`)
- In the `iOS` folder, run `pod install`
- Run with `NODE_OPTIONS=--max_old_space_size=8192 npm start`

Note: you might need to adapt `src/config.ts` if you're runnning some services or the chain locally

### Run on an iPhone (recommended dev setup)

- Prerequisites: follow [React Native's doc setup steps](https://facebook.github.io/react-native/docs/running-on-device#running-your-app-on-ios-devices). Most importantly, you should have a developer account.
- In XCode, open your `KILTDemoMobileWallet.xcworkspace` which is located in your `demo-mobile-wallet/ios` folder. 🔺IMPORTANT: make sure to open the `.xcworkspace` file and not the `.xcodeproj` file);
- Connect your phone to your laptop, you should see your device displayed as a target in XCode (on the top left);
- In XCode, change the dev team if you haven't already;
- In XCode, hit "launch" (= "▶️" button).

🔺IMPORTANT: your phone and laptop should be connected to the same network, otherwise you might encounter issues.
🔺IMPORTANT: Make sure that you've shut down any other metro bundler that might be already running (e.g. if you were working on another React Native app).

### Run on a simulator

Not recommended, since the app makes use of native capabilities such as the Camera and Keychain, that **won't** be available on a simulator.

### Debug

- Visit http://localhost:8081/debugger-ui/
- Open the console
- There you can add breakpoints wherever required

<img width="1429" alt="debug" src="https://user-images.githubusercontent.com/9762897/66653699-e8d35b00-ec38-11e9-994b-8219b67cf0a1.png">

- If you need to explore the UI, use your simulator. On an iPhone simulator:

  - Menu > Hardware > Shake gesture
  - Select Toggle inspector

### Troubleshooting

[Troubleshooting](https://github.com/KILTprotocol/demo-mobile-wallet/blob/master/docs/Troubleshooting.md)
