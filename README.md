### Prerequisites

- **Node.js**: Requires **Node >= 20.19.4**
- **Terminal or IDE**: Access to a command-line terminal and/or an IDE such as VSCode or Cursor is needed to execute commands and build the app.
- **Java**: A Java Development Kit (JDK) is required for Android builds (Android Studio typically installs a compatible version automatically).
- **iOS**: The latest version of **Xcode** is required for building and running the app on iOS devices or simulators.
- **Android**: **Android Studio** along with the necessary SDKs and Emulators must be set up for Android development.

### Assumptions
- **Currency**: All transaction amounts are denominated in **Malaysian Ringgit (RM)**.
- **Folder Structure**: The project adheres to [Expo App Folder Structure Best Practices](https://expo.dev/blog/expo-app-folder-structure-best-practices) for better organization and scalability.
- **Transaction Parties**: Each transaction should have defined "to" and "from" parties. The transaction cards and details UI inspect these fields and display an appropriate title accordingly.

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

> **Note:** Biometric authentication in the iOS simulator may not work as expected after running `npm run ios`. To resolve this, open the Hardware menu and navigate to **Features → Face ID → Enrolled** (or **Touch ID → Enrolled**). Toggle enrollment off and on, then reload the app (press `r` in the terminal/IDE). This typically resolves simulator enrollment issues.
>
> **Tip:** The app can be tested without Face ID or an iOS/Android simulator by using the **Expo Go** app on a physical device. To do so, run:
> ```bash
> npx expo start
> ```
> Scan the generated QR code in the Expo Go app. This provides access to the app without simulator-specific biometric constraints.

## Why Expo?

The project utilizes **Expo**, following the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) guidelines to streamline development and support building a production-ready React Native application.

> "We believe that the best way to experience React Native is through a Framework... most developers benefit from using a React Native Framework like Expo. Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files."

## Core Features
- **Pull to Refresh**: Instantly refresh the transactions list by pulling down; a demo/mock transaction is added each time to simulate new data.
- **Biometric Security**: Face ID and Fingerprint authentication provided by `expo-local-authentication`.
- **Privacy Masking**: Option to mask sensitive values within the UI.
- **Modern UI**: Built with **NativeWind v4** and **Expo Router**.
- **Dark Mode**: UI appearance adapts to the device's system light/dark mode preference.

## Inactivity & Biometric Security

After **5 minutes of inactivity**, biometric authentication (e.g., Face ID) is required again. The timeout can be configured in [`@/constants/auth.ts`](./constants/auth.ts) and adjusted for testing as needed. Inactivity detection and re-authentication logic are implemented in [`@/hooks/use-inactivity.ts`](./hooks/use-inactivity.ts).

## Pull to Refresh (Mock Data)

Pull-to-refresh on the Transactions screen is demo-only—it adds a mock transaction to the top of the list on each refresh. All transaction data resides in React context (memory) and is neither persisted nor fetched from a backend. Initial transactions are static demo data loaded from [`@/constants/transactions.json`](./constants/transactions.json).

> **Note:** Mock transactions will disappear if the app is reloaded.  
> For production, a real database backend should be used. Replace the mock in the refresh handler of [`useRefresh`](./hooks/use-refresh.ts), and update related context/hooks to fetch and persist data through a backend.

---

## Disclaimer
- **Face ID** functionality has undergone thorough testing and verification. However, **Fingerprint** sensors and **Android-specific biometric features** have not received extensive testing.
- All amounts and totals shown are strictly for demonstration; their accuracy has not been validated.
