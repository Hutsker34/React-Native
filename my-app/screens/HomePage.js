import {View, FlatList, Image,  StyleSheet, Button, Text} from 'react-native';
import React  from 'react';
import Player from '../components/Player'
import Menu from '../components/Menu'
import { useEffect , useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { removeTrack } from './albumTracks/AlbumTracksSlice';

const HomePage = ({ navigation }) => {
    const dispatch = useDispatch()
    const tracks = useSelector(state => state.album.savedTracks)
  
    const deleteTrack = async (track) => {
        console.log('DELETE')
        dispatch(removeTrack(track))
        showToast()
        
    };
    const showToast = (status) => {
        Toast.show(status);
    }
    return (
        <View style={styles.HomePageWrap}>
            <View style={styles.player__wrap}>
                <Player deleteTrack={deleteTrack} showAddButton={false} showRemoveButton={true} tracks={tracks}/>
            </View>
            <Menu navigation={navigation}/>
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
    player__wrap: {
        width: '100%'
    },
        

})

export default HomePage