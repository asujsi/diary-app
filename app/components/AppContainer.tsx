import React from 'react';
import { View, StyleSheet } from 'react-native';

const AppContainer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default AppContainer;
