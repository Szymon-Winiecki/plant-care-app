import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AnimationPage = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
        navigation.navigate('Home'); 
      });
    }, [fadeAnim,scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animationContainer, { opacity: fadeAnim }]}>
        <Text style={styles.text}>Plant Care App</Text>
        <Animated.Image
          source={require('../assets/plant.png')}
          style={[styles.icon, { transform: [{ scale: scaleAnim }] }]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightyellow',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default AnimationPage;