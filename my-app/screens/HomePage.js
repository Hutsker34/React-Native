import {Text, View,FlatList,  StyleSheet,Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Audio } from 'expo-av';

import Sound from '../components/Sound';




const sounds = require.context('../assets/music', true, /\.mp3$/);

const imageSources = sounds.keys().map((key) => sounds(key));

const names = sounds.keys().map((key) => {
    const start = key.indexOf('/')
    const end = key.indexOf('.mp3')
    return key.slice(start + 1, end)
})

const HomePage =  () => {

 
    const [currentSoundIndex , setCurrentSoundIndex] = useState(-1)
    const [ lastSound, setLastSound] = useState(null)
    const [currentQueueSound, setCurrentQueueSound] = useState(null)
   

    async function playSoundsSequentially(sounds) {
        for (const soundFile of sounds) {
          const { sound } = await Audio.Sound.createAsync(soundFile);

          setCurrentQueueSound(sound)
          if(currentSoundIndex < 0){
            return
          }else{
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


    const soundFiles = sounds.keys().map(sounds);
    
    

    useEffect( () => {
        const currentSoundsQueue = soundFiles.slice(currentSoundIndex)
        async function unloadSound(){
            if(currentQueueSound){
                await currentQueueSound.unloadAsync();
            }
        }
        unloadSound();
        playSoundsSequentially(currentSoundsQueue)
        

    }, [currentSoundIndex])

    function changeCurrentSound(index){
       if(index !== currentSoundIndex){
        
        setCurrentSoundIndex(index)
       }
        
        
    }
   
    function playNext(){
        if(currentSoundIndex < soundFiles.length -1){
            setCurrentSoundIndex(currentSoundIndex +1)
            
        }
       
    }
   
    
    return (
        <View style={styles.HomePageWrap}>
             
             <FlatList
                data={imageSources}
                keyExtractor={(item, index) => index}
                renderItem={({item , index}) => <Sound playNext={playNext}  currentSound={currentQueueSound}   isActive={currentSoundIndex == index} setCurrentSoundIndex={changeCurrentSound} currentSoundIndex={currentSoundIndex} name={names[index]}  index={index}  />}
            />
           
        </View>
    );
};
const styles = StyleSheet.create({
    HomePageWrap: {
            
            width:'100%',
            height: '100%',
            backgroundColor: '#111',
            flex: 1,
            alignItems: 'center',
            paddingTop: 40,
        },
        

})

export default HomePage