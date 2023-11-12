import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import pause from '../assets/pause.png'
import play from '../assets/play.png'
const Sound = (props) => {

    const [isPause, setisPause] = useState(false);
    const [sound , setSound] = useState(null)
    // const [newTrack , setNewTrack] = useState(true)

    // useEffect(() => {
    //   // setNewTrack(true)
    // }, [props.path])

    useEffect(() => {
      
      const loadAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
          // Загружаем аудио
          
          await soundObject.loadAsync(props.path);
          await soundObject.setVolumeAsync(0.7);
          
        } catch (error) {
          console.log("Ошибка при загрузке или воспроизведении аудио:", error);
        }
        return soundObject;
      };
      if (!sound) {
        loadAudio().then(setSound);
      }

      return sound ? () => {
        sound.unloadAsync();
      } : undefined;
    }, [props.path]);


    


    useEffect(() => {
      
      const pauseAudio = async () => {
        
        console.log('pause')
        if (sound) {
          await sound.pauseAsync();
          console.log('Воспроизведение на паузе');
        }
        };

      const resumeAudio = async () => {
        
        if (sound) {
          await sound.playAsync();
          console.log('Воспроизведение возобновлено');
        }
      };
      if (isPause) { // если трек должен играть
       resumeAudio()
      }else{
        pauseAudio()
      }
      // setNewTrack(false) 
    }, [isPause]);


    const handlePlayPause = () => {
      
      setisPause(!isPause);
      
    };
  

  return (
    <View style={styles.track__wrap}>
      <Text style={styles.track__wrapName}>{props.name}</Text>
      <TouchableOpacity onPress={handlePlayPause} style={styles.pauseBtn}>
        {isPause &&
            <Image
                style={styles.pauseBtn__Img}
                source={pause}
            />
        }
        {isPause == false &&
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
        maxHeight: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#07AB80',
        marginTop: 40,
        marginLeft: 10,
        paddingVertical: 5,
        borderRadius: 20,
  },
});

export default Sound;