import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { commonStyles } from '../styles/common';

const PlantProperty = props => {

    return (
        <View style={styles.propertyContainer}>
            <Text style={commonStyles.label}>{props.label}:</Text>
            <Text style={commonStyles.property}>{props.property}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    propertyContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 10,
        marginVertical: 10,
    },
});

export default PlantProperty;
