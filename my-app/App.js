import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet , Button, Alert, Text, ImageBackground} from 'react-native';
import * as Location from 'expo-location';
import Slick from 'react-native-slick'
import firstSlide from './assets/firstSlide.png'


const CatImage = () => {


  return (

    <Slick style={styles.wrapper} loop={false}>
        <ImageBackground source={firstSlide} testID="Hello" style={styles.slide1}>
          <Text style={styles.Title}>Sleep soundly</Text>
          <Text style={styles.text}>Sleep better with our ambient sound playlist</Text>
        </ImageBackground>
        <View testID="Beautiful" style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
    </Slick>
  );
};

const styles = StyleSheet.create({


  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',


  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  Title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    position: 'relative',
    top: 50,
    
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    position: 'relative',
    top: 60,
  }
  
});

export default CatImage;