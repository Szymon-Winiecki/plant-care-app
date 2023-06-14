import { Pressable, StyleSheet, Text, View, Image } from 'react-native';

import { commonStyles } from '../styles/common';
import { Colors } from '../constants/colors'
import * as Icons from '../constants/icons';

const PlantListElement = props => {
  return (
    <Pressable
      style={styles.plantContainer}
      onPress={() => props.onClick()}
    >
      <View style={{ flex: 2 }}>
        <Image source={props.img} style={styles.image} />
      </View>
      <View style={{ flex: 5 }}>
        <Text style={styles.listElementText}>{props.name}</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Image source={props.icon} style={styles.icon}></Image>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listElementText: {
    width: '60%',
    fontSize: 14,
    fontWeight: 500,
  },
  plantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,

    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  }
})

export default PlantListElement
