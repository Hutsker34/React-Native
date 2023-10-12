import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet , Button, Alert} from 'react-native';
import * as Location from 'expo-location';

const CatImage = () => {
  const [imageUrl, setImageUrl] = useState(null);


  function changeCat(){
    fetch('https://api.thecatapi.com/v1/images/search')
    .then((response) => response.json())
    .then((data) => {
      // Устанавливаем URL картинки в состояние компонента
      if (data && data.length > 0) {
        setImageUrl(data[0].url);
      }
    })
    .catch((error) => {
      console.error("Ошибка при запросе картинки:", error);
    });
  }

  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    
    Alert.alert(currentLocation.coords)
  };


  return (
    <View style={styles.container}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Button title='следующий котик!!' onPress={changeCat} />
      <Button title='geo' onPress={fetchLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300, // или другой размер, который вы хотите
    height: 200,
    resizeMode: 'contain',
  },
});

export default CatImage;