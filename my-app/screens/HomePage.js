import {View,FlatList,  StyleSheet} from 'react-native';
import React from 'react';
import Player from '../components/Player'






const HomePage =  () => {
    
   
    
    return (
        <View style={styles.HomePageWrap}>
            <Player/>
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