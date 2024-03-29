[![](https://user-images.githubusercontent.com/39338561/122415864-8d6a7c00-cf88-11eb-846f-a98a936f88da.png)
](https://kilt.io)

# DEPRECATED: KILT Demo Mobile Wallet

## About

This repository is the **deprecated** demo mobile wallet for a KILT Claimer. It was originally planned to be used for claiming KILTs. **Please use the official Sporran Browser extension instead: It is available on [👉 Firefox](https://addons.mozilla.org/de/firefox/addon/sporran/) and [👉 Chrome](https://chrome.google.com/webstore/detail/sporran/djdnajgjcbjhhbdblkegbcgodlkkfhcl))**.

## Disclaimer

⚠️ **This app was designed to demo the core feature set of KILT. We don't recommend using it in production and it is a Work In Progress.
However, feel free to open issues if you note that something is off.**

## Planned demo functionality

<p align="center">
<img width="300" src="https://user-images.githubusercontent.com/9762897/71015282-9d837000-20f3-11ea-88a8-16c39a74f10a.jpg">  
</p>

- Create an identity and store it encrypted on the device;
- Create claims;
- Request attestations for these claims to specific attesters by scanning their public identity QR Code;
- Add contacts by scanning their public identity as a QR Code;
- Transfer KILT Tokens.

## Specifications

- Supported devices: iPhone 8 or later model (tested until iPhone X). Note that on the iPhone X, FaceID is not supported yet so the passcode is used. **Tested on iOS only. Not tested on Android.**
- Prerequisites: A passcode or TouchID should be set up on your device.

## Demo flow

You can demo the mobile wallet as a claimer, and use the demo-client to demo the attester.

[>> Demo flow](https://github.com/KILTprotocol/demo-mobile-wallet/blob/master/docs/Demo%20Flow.md)

## Make it yours!

You can configure the demo wallet to fit your needs and branding in a few minutes!

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

- 🔺IMPORTANT: follow the "Installing dependencies" step at [React Native's getting started](https://reactnative.dev/docs/environment-setup) > tab **react-native-cli quickstart**. The wallet is NOT using Expo, it was ejected.
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
🔺IMPORTANT: make sure that you've shut down any other metro bundler that might be already running (e.g. if you were working on another React Native app).

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
  
## Release on TestFlight

You can release your own version of the wallet by setting up an Apple Developer account an making a TestFlight release.

[>> Doc for KILT internals](https://github.com/KILTprotocol/organizational/wiki/Demo-Mobile-Wallet:-TestFlight-release)

### Troubleshooting

[Troubleshooting](https://github.com/KILTprotocol/demo-mobile-wallet/blob/master/docs/Troubleshooting.md)
