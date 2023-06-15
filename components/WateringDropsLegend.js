import { StyleSheet, Text, View, Image } from 'react-native';
import { commonStyles } from '../styles/common';

import { Colors } from '../constants/colors';
import * as Icons from '../constants/icons';

const WateringDropsLegend = props => {

  return (
    <View style={styles.fullWidthColumn}>
      <View style={styles.fullWidthRow}>
        <Image source={Icons.green_check} style={styles.icon}></Image>
        <Text> - roślina podlana</Text>
      </View>
      <View style={styles.fullWidthRow}>
        <Image source={Icons.water_drop_ok} style={styles.icon}></Image>
        <Text> - podlej dzisiaj</Text>
      </View>
      <View style={styles.fullWidthRow}>
        <Image source={Icons.water_drop_warning} style={styles.icon}></Image>
        <Text> - podlej jak najszybciej</Text>
      </View>
      <View style={styles.fullWidthRow}>
        <Image source={Icons.water_drop_error} style={styles.icon}></Image>
        <Text> - podlej natychmiast</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullWidthColumn: {
    width: '100%',
  },
  fullWidthRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default WateringDropsLegend;
