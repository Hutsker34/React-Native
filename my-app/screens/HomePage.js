import { View,  StyleSheet , TouchableOpacity, Modal,TextInput, Button, Alert, Text,Pressable, ImageBackground} from 'react-native';
import React, { useState, useEffect } from 'react';
import Track from '../components/Track'

const HomePage =  () => {

    return (
        <View style={styles.HomePageWrap}>
           <Track/>
        </View>
    );
};
const styles = StyleSheet.create({
    HomePageWrap: {
            width:'100%',
            height: '100%',
            backgroundColor: '#01CD98',
            flex: 1,
            alignItems: 'center',
            paddingTop: 40,
        }

})

export default HomePage