import {View, FlatList, Image,  StyleSheet, Button, Text} from 'react-native';
import React  from 'react';
import Player from '../components/Player'
import Menu from '../components/Menu'
import { useSelector } from 'react-redux';
import { storeTestData } from '../storage';


const HomePage = ({ navigation }) => {
    
    storeTestData()
    const tracks = useSelector(state => state.album.savedTracks)
    return (
        <View style={styles.HomePageWrap}>
            <Player tracks={tracks}/>
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

        

})

export default HomePage