import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet , Button, Alert} from 'react-native';
import * as Location from 'expo-location';


const CatImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [location, setLocation] = useState(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchLocation = () => {
    if (location) {
      Alert.alert('Current Location',`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
    } else {
      Alert.alert('Location not available');
    }
  };


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