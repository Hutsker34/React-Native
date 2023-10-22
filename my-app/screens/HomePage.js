import { View,  StyleSheet , TouchableOpacity, Modal,TextInput, Button, Alert, Text,Pressable, ImageBackground} from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';


const HomePage =  (props) => {
    




     useEffect(() => {
         // Создаем асинхронную функцию внутри useEffect
         const loadAndPlayAudio = async () => {
             const soundObject = new Audio.Sound();
             try {
                 // Загружаем аудио
                 await soundObject.loadAsync(require('../assets/test2.mp3'));
                 await soundObject.setVolumeAsync(0.7, 0)
                 // Воспроизводим аудио
                 await soundObject.playAsync();
             } catch (error) {
                 console.log("Ошибка при загрузке или воспроизведении аудио:", error);
             }
         };

         // Вызываем созданную асинхронную функцию
         loadAndPlayAudio();
     }, []);  // Пустой массив зависимостей означает, что этот эффект будет выполнен только один раз при монтировании компонента

    return (
        <View style={styles.HomePageWrap}>
            <Text>HomePAge!!!</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    HomePageWrap: {
            marginTop: 80
        }

})

export default HomePage