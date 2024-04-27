import {View, FlatList, Image,  StyleSheet, Button, Text} from 'react-native';
import React  from 'react';
import Player from '../components/Player'
import Menu from '../components/Menu'
import { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import { getTracks } from '../storage'; 



const HomePage = ({ navigation }) => {
    const [TrackArray, setTracksArray] = useState([])
    
    useEffect(() => {
        const getTracksArray = async () => {
            let storedData = await getTracks();
            setTracksArray(storedData)
        };
        getTracksArray()
    },[])
    return (
        <View style={styles.HomePageWrap}>
            <Player showAddButton={false} tracks={TrackArray}/>
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