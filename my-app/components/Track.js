import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import pause from '../assets/pause.png'
import play from '../assets/play.png'
const Track = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
  
    useEffect(() => {
      const loadAndPlayAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
          // Загружаем аудио
          await soundObject.loadAsync(require('../audio/test2.mp3'));
          await soundObject.setVolumeAsync(0.7);
          if (isPlaying) {
            // Если трек должен играть, устанавливаем позицию и запускаем воспроизведение
            await soundObject.setPositionAsync(position);
            await soundObject.playAsync();
          }
        } catch (error) {
          console.log("Ошибка при загрузке или воспроизведении аудио:", error);
        }
        return soundObject;
      };
      
      let soundObject = null; // объявляем переменную для хранения объекта Audio
  
      if (isPlaying) { // если трек должен играть
        loadAndPlayAudio().then((result) => {
          soundObject = result; // сохраняем объект Audio в переменной
        });
      } else if (soundObject) { // если трек должен быть на паузе и объект Audio уже был создан
        setPosition(soundObject._lastKnownPosition); // сохраняем текущую позицию трека в переменную
        soundObject.pauseAsync(); // ставим трек на паузу
      }
  
      return () => { // функция очистки для useEffect
        if (soundObject) {
          soundObject.unloadAsync(); // выгружаем аудио из памяти при завершении компонента
        }
      };
    }, [isPlaying]);
  
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
    };
  

  return (
    <View style={styles.track__wrap}>
      <Text style={styles.track__wrapName}>track Name</Text>
      <TouchableOpacity onPress={handlePlayPause} style={styles.pauseBtn}>
        {isPlaying &&
            <Image
                style={styles.pauseBtn__Img}
                source={pause}
            />
        }
        {isPlaying == false &&
            <Image
                style={styles.pauseBtn__Img}
                source={play}
            />
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    track__wrapName : {
        color: 'white',
        fontSize: 16
    },
    pauseBtn: {
        borderRadius: 50,
        padding: 10,
        backgroundColor: 'white'
    },
    pauseBtn__Img: {
        maxWidth: 16,
        maxHeight: 16

    },
    track__wrap: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 30,
        backgroundColor: '#07AB80',
        marginTop: 30,
        paddingVertical: 5,
        borderRadius: 20,
  },
});

export default Track;