import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface PostFormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  isDisabled?: boolean;
}

export const CustomInput: React.FC<PostFormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  isDisabled,
}) => {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}:</Text>}
      <TextInput
        editable={!isDisabled}
        style={[
          styles.input,
          isDisabled && styles.disabledInput,
          multiline && styles.inputBody,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        placeholderTextColor={'#8e8e8e'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    color: '#000',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: '#fff',
  },
  inputBody: {
    height: 120,
    textAlignVertical: 'top',
  },
});
