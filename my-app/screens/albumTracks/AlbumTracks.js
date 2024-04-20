import React, { useState} from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import fetch from 'node-fetch';
import Menu from '../../components/Menu'
import Player from '../../components/Player';
import { useSelector } from 'react-redux';
import AlbumComponent from '../../components/AlbumComponent';
import { ColorSpace } from 'react-native-reanimated';

const AlbumTracks =  () => {
    const data = useSelector(state => {
        return state.album.tracks
    });
    
    return (
        <View style={styles.HomePageWrap}>
            <Player tracks={data}/>
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