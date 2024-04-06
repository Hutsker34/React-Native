import {FlatList,Text, View,StyleSheet} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Audio } from 'expo-av';

import Sound from '../components/Sound';


// const sounds = require.context('../assets/music', true, /\.mp3$/);

// const imageSources = sounds.keys().map((key) => sounds(key));

// const names = sounds.keys().map((key) => {
//     const start = key.indexOf('/')
//     const end = key.indexOf('.mp3')
//     return key.slice(start + 1, end)
// })


function Player() {

    const tracks = useSelector(state => state.album.tracks)
    const [currentSoundIndex, setCurrentSoundIndex] = useState(-1)
    // Текущий трек (объект Audio.Sound)
    const [currentSound, setCurrentSound] = useState(null)
    // Его статус
    const [playbackStatus, setPlaybackStatus] = useState(null);

    const [trackMillis, setTrackMillis] = useState(0)

    async function playSoundsSequentially(sounds) {
        for (const soundItem of sounds) {
            let name = soundItem.name
            const { sound } = await Audio.Sound.createAsync(
                { uri:  soundItem.audio}
             );
            setCurrentSound(sound)
            // Если еще не инициализировали
            if (currentSoundIndex < 0) {
                return
            } else {
                await sound.playAsync();
                await new Promise(resolve => {
                    sound.setOnPlaybackStatusUpdate(playbackStatus => {
                        if (playbackStatus.didJustFinish) {
                            resolve();
                        }
                    });
                });
            }
            await sound.unloadAsync();
        }
    }


   

    const onPlaybackStatusUpdate = (status) => {
        setPlaybackStatus(status);
        setTrackMillis(status.positionMillis);
    };

    useEffect(() => {
        const updateStatus = async () => {
            const playbackStatus = await currentSound.getStatusAsync();

            currentSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }

        if (!currentSound) {
            return
        }
        updateStatus();

        return () => currentSound.setOnPlaybackStatusUpdate(null);
    }, [currentSound])

    // Срабатывает на изменение номера трека
    useEffect(() => {
        // Новая очередь треков
        const currentSoundsQueue = tracks.slice(currentSoundIndex)
        // Очистка ресурсов
        async function unloadSound() {
            if (currentSound) {
                await currentSound.unloadAsync();
            }
        }
        unloadSound();
        // Запускаем новую очередь
        playSoundsSequentially(currentSoundsQueue)
    }, [currentSoundIndex])

    function changeCurrentSound(index) {
        if (index !== currentSoundIndex) {
            setCurrentSoundIndex(index)
        }
    }

    function playNext() {
        if (currentSoundIndex < soundFiles.length - 1) {
            setCurrentSoundIndex(currentSoundIndex + 1)
        }
    }
    return (
        <View>
        {tracks.length == 0 &&
            <Text style={styles.noTrack__text}>Скоро тут будут ваши треки</Text>
        }
        {tracks.length > 0 &&
            <FlatList
                data={tracks}
                keyExtractor={(item, index) => index}
                renderItem={({item , index}) => <Sound trackMillis={trackMillis} playNext={playNext}  sound={currentSound} playbackStatus={playbackStatus} isActive={currentSoundIndex == index} setCurrentSoundIndex={changeCurrentSound} currentSoundIndex={currentSoundIndex} name={item.name}  index={index}  />}
            />
        }
       
        </View>
        
    )
   
}
const styles = StyleSheet.create({
    noTrack__text: {
        color: 'white',
        fontSize: 22

    }

        

})
export default Player