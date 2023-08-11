import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface HeaderRightButtonProps {
  onPress: () => void;
  title: string;
  isDisabled?: boolean;
}
export const HeaderRightButton = ({
  onPress,
  title,
  isDisabled,
}: HeaderRightButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.addButton, isDisabled && styles.addButtonDisabled]}>
      <Text
        style={[
          styles.addButtonLabel,
          isDisabled && styles.addButtonLabelDisabled,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 16,
  },
  addButtonDisabled: {
    backgroundColor: '#f2f2f2',
  },
  addButtonLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  addButtonLabelDisabled: {
    color: '#000',
  },
});
