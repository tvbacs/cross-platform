import { StyleSheet, TextInput, View } from "react-native";

export default function InputForm({ placeholder, value, onChangeText,  secureTextEntry = false, }) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
     flex: 1,
    height: '100%',
    borderWidth: 0,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111'
  },
});

