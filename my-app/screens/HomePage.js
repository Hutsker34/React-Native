import {Text, View,FlatList,  StyleSheet,Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import Sound from '../components/Sound';




const sounds = require.context('../assets/music', true, /\.mp3$/);

const imageSources = sounds.keys().map((key) => sounds(key));

const names = sounds.keys().map((key) => {
    const start = key.indexOf('/')
    const end = key.indexOf('.mp3')
    return key.slice(start + 1, end)
})

const HomePage =  () => {

    const [hasChanged, setHasChanged] = useState(false)
    const [currentSoundIndex , setCurrentSoundIndex] = useState(null)

    function changeCurrentSound(index){
        setHasChanged(currentSoundIndex !== index)
        setCurrentSoundIndex(index)
    }



    return (
        <View style={styles.HomePageWrap}>
            <FlatList
                
                data={imageSources}
                keyExtractor={(item) => item}
                renderItem={({item , index}) => <Sound hasChanged={hasChanged} isActive={index === currentSoundIndex} setCurrentSoundIndex={changeCurrentSound} currentSoundIndex={currentSoundIndex} name={names[index]} path={item} index={index}  />}
            />
            
        </View>
    );
};
const styles = StyleSheet.create({
    HomePageWrap: {
            width:'100%',
            height: '100%',
            backgroundColor: '#01CD98',
            flex: 1,
            alignItems: 'center',
            paddingTop: 40,
        },
        

})

export default HomePage