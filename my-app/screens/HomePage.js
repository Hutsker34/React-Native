import {View, FlatList, Image,  StyleSheet, Button} from 'react-native';
import React  from 'react';
import Player from '../components/Player'
import Menu from '../components/Menu'



const HomePage = ({ navigation }) => {
    
    return (
        <View style={styles.HomePageWrap}>
            <Player/>
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