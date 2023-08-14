import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type ProgressHUDProps = {
  isLoading: boolean;
};

const ProgressHUD: React.FC<ProgressHUDProps> = ({isLoading = false}) => {
  return isLoading ? (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <ActivityIndicator color={'#007BFF'} size={48} />
      </View>
    </View>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 1000,
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default ProgressHUD;
