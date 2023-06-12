import { StyleSheet, Text, View , StatusBar } from 'react-native';

import { Colors } from '../constants/colors';

const LoadingScreen = props => {

  return (
    <View style={styles.container}>
        <Text style={styles.loadingText}>{props.action}</Text>
        
        {props.message ? <Text style={styles.loadingMessage}>{props.message}</Text> : ''}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  loadingText: {
    color: Colors.info,
    fontSize: 20,
  },
  loadingMessage: {
    color: Colors.info,
    fontWeight: 500
  },
});

export default LoadingScreen;
