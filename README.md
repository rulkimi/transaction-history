### Prerequisites

- **Node.js**: Requires **Node >= 20.19.4**
- **Terminal or IDE**: A command-line terminal and/or an IDE such as VSCode or Cursor is needed to run commands and build the app.
- **iOS**: The latest version of **Xcode** is required for building and running the app on iOS devices or simulators.
- **Android**: **Android Studio** with the necessary SDKs and Emulators must be set up for Android development.
- **Java**: A Java Development Kit (JDK) is required for Android builds (Android Studio typically installs a compatible version automatically).

### Assumptions
- **Currency**: All transaction amounts are considered to be in **Malaysian Ringgit (RM)**.
- **Folder Structure**: This project follows [Expo App Folder Structure Best Practices](https://expo.dev/blog/expo-app-folder-structure-best-practices) for organizational clarity and scalability.
- **Transaction Parties**: Each transaction is expected to have defined "to" and "from" parties. The transaction cards and details UI check for these fields and display a relevant title based on their values.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run on iOS**
   ```bash
   npm run ios
   ```

3. **Run on Android**
   ```bash
   npm run android
   ```

> **Note:** If biometric authentication does not work in the iOS simulator after running `npm run ios`, open the Hardware menu then go to **Features → Face ID → Enrolled** (or **Touch ID → Enrolled**). If it's already checked, uncheck and recheck it, then reload your app (press `r` in your terminal/IDE). This often clears up simulator glitches with biometric enrollment.

> **Tip:** You can test the app without Face ID or a simulator using the **Expo Go** app on a physical device. Run:
> ```bash
> npx expo start
> ```
> Scan the QR code in Expo Go. This allows you to use the app without simulator biometrics or Face ID.

## Why Expo?

This project adopts **Expo** following the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide to facilitate building a production-ready React Native application.

> "We believe that the best way to experience React Native is through a Framework... most developers benefit from using a React Native Framework like Expo. Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files."

## Core Features
- **Biometric Security**: Face ID/Fingerprint authentication provided by `expo-local-authentication`.
- **Privacy Masking**: Toggle to mask sensitive values in the UI.
- **Modern UI**: Built with **NativeWind v4** and **Expo Router**.
- **Dark Mode**: Adapts to the device's system light/dark mode preference.

## Inactivity & Biometric Security

After **5 minutes of inactivity**, biometric authentication (such as Face ID) is required again. This timeout is configurable in [`@/constants/auth.ts`](./constants/auth.ts) and can be set to a shorter duration for testing purposes. The inactivity detection and re-authentication logic are implemented in [`@/hooks/use-inactivity.ts`](./hooks/use-inactivity.ts).

---

## Disclaimer
- While **Face ID** has been fully tested and verified, **Fingerprint** sensors and **Android-specific biometrics** have not been extensively tested due to time constraints.
- All displayed amounts and totals are for demonstration purposes only; no checks or validations have been performed to confirm their accuracy.
