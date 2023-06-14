import { Pressable, StyleSheet, Text, View, Image } from 'react-native';

import { commonStyles } from '../styles/common';
import { Colors } from '../constants/colors'

const PlantListElement = props => {
  return (
    <Pressable
      style={styles.plantContainer}
      onPress={() => props.onClick()}
    >
      <Image source={props.img} style={styles.image} />
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
  },
  plantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
})

export default PlantListElement
