import { View,  StyleSheet , TouchableOpacity, Modal,TextInput, Button, Alert, Text,Pressable, ImageBackground} from 'react-native';
import { Audio } from 'expo-av';
import React, { useState, useEffect } from 'react';
import Track from '../components/Track'

const HomePage =  (props) => {
    




     useEffect(() => {
         // Создаем асинхронную функцию внутри useEffect
         const loadAndPlayAudio = async () => {
             const soundObject = new Audio.Sound();
             try {
                 // Загружаем аудио
                 await soundObject.loadAsync(require('../audio/test2.mp3'));
                 await soundObject.setVolumeAsync(0.7, 0)
                 // Воспроизводим аудио
                 await soundObject.playAsync();
             } catch (error) {
                 console.log("Ошибка при загрузке или воспроизведении аудио:", error);
             }
         };

         // Вызываем созданную асинхронную функцию
         loadAndPlayAudio
     }, []);  // Пустой массив зависимостей означает, что этот эффект будет выполнен только один раз при монтировании компонента

    return (
        <View style={styles.HomePageWrap}>
           
        </View>
    );
};
const styles = StyleSheet.create({
    HomePageWrap: {
            width:'100%',
            height: '100%',
            backgroundColor: '#01CD98',
        }

})

export default HomePage