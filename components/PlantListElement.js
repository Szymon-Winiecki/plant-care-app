import { Pressable, StyleSheet, Text, View } from 'react-native';

import { commonStyles } from '../styles/common';
import { Colors } from '../constants/colors'

  const PlantListElement = props => {
  return (
    <Pressable
      onPress={() => props.onClick()}
    >
      <View style={styles.listElement}>
          <Text>{props.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    listElement: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkGrey,
    }
})

export default PlantListElement
