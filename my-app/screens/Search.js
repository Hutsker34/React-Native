import {View, FlatList, Image,  StyleSheet} from 'react-native';
import React from 'react';
import Menu from '../components/Menu'




const Search =  () => {
    
    return (
        <View style={styles.HomePageWrap}>
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
            alignItems: 'center',
            paddingTop: 40,
        },

        

})

export default Search