import React, { useState} from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import fetch from 'node-fetch';
import Menu from '../../components/Menu'
import Player from '../../components/Player';
import { useSelector } from 'react-redux';
import AlbumComponent from '../../components/AlbumComponent';
import { ColorSpace } from 'react-native-reanimated';
import { storeTracks } from '../../storage';
import Toast from 'react-native-toast-message';


const AlbumTracks =  () => {
    const data = useSelector(state => {
        return state.album.tracks
    });

   
    const addTrack = async (track) => {
        const status = await storeTracks(track);
        showToast(status)
    };
        
    const showToast = (status) => {
        Toast.show(status);
      }
    
    return (
        <View style={styles.HomePageWrap}>
            <Player showAddButton={true} addTrack={addTrack} tracks={data}/>
            <Menu/>
        </View>
    );
};

const styles = StyleSheet.create({
    HomePageWrap: {
        width:'100%',
        height: 'calc(100vh - 70px)',
        backgroundColor: '#111',
        flex: 1,
        alignItems: 'start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 40,
    },
    text: {
        color: 'white',
        fontSize: 26
    }

});

export default AlbumTracks;