import {View, Image,  StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';






const Menu = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('https:\/\/prod-1.storage.jamendo.com\/?trackid=887202&format=mp31&from=app-devsite'));
      await sound.playAsync();
      // Your sound is playing!
    
      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      await sound.unloadAsync();
    } catch (error) {
      // An error occurred!
    }
    
    return (
        <View  style={styles.menu}>
           <Text>text</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    menu: {
        width: '100%',
        maxHeight: 70,
        backgroundColor: '#07AB80',
        flex: 1,
        paddingTop: 18,
        paddingLeft: 20,

    }

})

export default Menu