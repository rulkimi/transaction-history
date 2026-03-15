### Assumptions
- **Currency**: All transaction amounts are assumed to be in **Malaysian Ringgit (RM)**.
- **Standards**: Development follows the [Expo App Folder Structure Best Practices](https://expo.dev/blog/expo-app-folder-structure-best-practices) for clarity and scalability.
- **Transaction Direction**: Every transaction is assumed to have a defined "to" and "from" party. The UI for transaction cards and detail views will check for these and display a title based on their presence.

### Prerequisites
- **iOS**: Latest version of **Xcode** installed.
- **Android**: **Android Studio** configured with SDK and Emulators.

## Why Expo?

Following the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guide, this project uses **Expo** as the framework for building a production-ready application.

> "We believe that the best way to experience React Native is through a Framework... most developers benefit from using a React Native Framework like Expo. Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files."

## Inactivity & Biometric Security

After **5 minutes of inactivity**, you will be required to authenticate again with Face ID or biometric authentication. This timeout is configured in [`@constants/auth.ts`](./constants/auth.ts), and the inactivity detection and biometric re-authentication logic is implemented in [`@hooks/use-inactivity.ts`](./hooks/use-inactivity.ts).

---

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

## Core Features
- **Biometric Security**: Face ID/Fingerprint authentication via `expo-local-authentication`.
- **Privacy Masking**: Managed privacy toggle to mask sensitive amounts.
- **Modern UI**: Built with **NativeWind v4** and **Expo Router**.
- **Dark Mode**: Adapts to system light/dark mode settings

## Disclaimer
Note that while **Face ID** has been tested and verified, **Fingerprint** and **Android-specific biometrics** have not been fully validated due to development time constraints. Also, all displayed amounts and totals are arbitrary; no validation or checks have been performed to ensure the accuracy of these values.
