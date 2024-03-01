import {View, Image,  StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import search from '../assets/search.png'





const Menu =  (props) => {
    const handleSearch = () => {
        props.navigation.navigate("Search")
    };
    
    return (
        <View style={styles.menu}>
            <TouchableOpacity onPress={handleSearch}>
                <Image style={styles.search} source={search}></Image>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    menu: {
        width: '100%',
        maxHeight: 70,
        backgroundColor: '#07AB80',
        flex: 1,
        paddingTop: 18,
        paddingLeft: 20,

    }

        

})

export default Menu