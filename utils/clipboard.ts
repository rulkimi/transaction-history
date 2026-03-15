import * as Clipboard from "expo-clipboard";
import { Alert, Platform, ToastAndroid } from "react-native";

export async function copyToClipboard(text: string, message: string = "Copied to clipboard!") {
  if (!text) return;
  
  await Clipboard.setStringAsync(text);
  
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
}
