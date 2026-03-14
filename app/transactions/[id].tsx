import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TransactionDetail() {
  const { id } = useLocalSearchParams();

  return (
    <Text>{`Transaction ID: ${id}`}</Text>
  )
}