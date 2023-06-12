import { StyleSheet, Text, View , StatusBar } from 'react-native';

import { Colors } from '../constants/colors';

const ErrorScreen = props => {

  return (
    <View style={styles.container}>
        <Text style={styles.errorText}>{props.error}</Text>

        {props.message ? <Text style={styles.errorMessage}>{props.message}</Text> : ''}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  errorText: {
    color: Colors.error,
    fontSize: 20,
  },
  errorMessage: {
    color: Colors.error,
    fontWeight: 500
  },
});

export default ErrorScreen;
