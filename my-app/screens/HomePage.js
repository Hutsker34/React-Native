import {Text, View,FlatList,  StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import audioFiles from '../assets/music/music.json';

const HomePage =  () => {

    useEffect(() => {
        
        async function listFiles() {
        info = await FileSystem.getInfoAsync(path);  
            const folderUri = `${FileSystem.documentDirectory}assets/music/`;
            try {
            const result = await FileSystem.readDirectoryAsync(folderUri);
            console.log(result); // массив имен файлов
            } catch (error) {
            console.error('Error reading directory', error);
            }
        }
        listFiles()
    }, []);


  


    return (
        <View style={styles.HomePageWrap}>
            <FlatList
                data={audioFiles.files}
                keyExtractor={(item) => item}
                renderItem={({ item }) => <Text>{item}</Text>}
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
        }

})

export default HomePage