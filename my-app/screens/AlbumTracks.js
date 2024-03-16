import React, { useState} from 'react';
import { View, Text, StyleSheet, FlatList, } from 'react-native';
import fetch from 'node-fetch';
import Menu from '../components/Menu'

import AlbumComponent from '../components/AlbumComponent';

const AlbumTracks =  () => {
    // const apikey = 'd9dcb351'

    // const GetTracksUrl =`https://api.jamendo.com/v3.0/artists/tracks/?client_id=${apikey}&format=jsonpretty&order=track_name_desc&name=`
    // const [albums, setAlbums] = useState([])
    


    // const getArtistsData = () => {
    //     const artistName = inputValue.toLowerCase().replaceAll(' ', '+')
        
    //     fetch(GetTracksUrl+artistName).then((data) => {
    //         return data.json()
            
    //       }).then((data) => {
    //         console.log('dataTracks',data.results[0].tracks.length)
    //       })


    // }


    return (
        <View style={styles.HomePageWrap}>
                {/* <FlatList
                    data={albums}
                    keyExtractor={(item, index) => index}
                    renderItem={({item , index}) => <AlbumComponent albumImage={item.image}  index={index}/>}
                /> */}
            <Menu/>
        </View>
    );
};

const styles = StyleSheet.create({
    HomePageWrap: {
        width:'100%',
        height: '100%',
        backgroundColor: '#111',
        flex: 1,
        alignItems: 'start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 40,
    },

});

export default AlbumTracks;