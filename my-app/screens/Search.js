import React, { useState, useEffect} from 'react';
import { View, TextInput,  Text, StyleSheet, FlatList } from 'react-native';
import fetch from 'node-fetch';
import Menu from '../components/Menu'
import artist from '../assets/artists.json'
import AutoSuggestComponent from '../components/AutoSuggestComponent'


const Search =  () => {
    const apikey = 'd9dcb351'

    const initialUrl =`https://api.jamendo.com/v3.0/artists/tracks/?client_id=${apikey}&format=jsonpretty&order=track_name_desc&name=`

    const [artistsArray , setArtistArray] = useState([])
    const [inputValue , setInputValue] = useState('')


    function getArtistsData(){
        const artistName = inputValue.toLowerCase().replaceAll(' ', '+')
        fetch(initialUrl+artistName).then((data) => {
            return data.json()
            
          }).then((data) => {
            console.log(data.results[0].tracks.length)
          })

    }

    useEffect(() => {
        if(inputValue == ''){
            return
        }
        let result = artist.filter(item => item.startsWith(inputValue)).slice(0, 10);
        console.log(result);
        setArtistArray(result)
    },[inputValue])

    return (
        <View style={styles.HomePageWrap}>
            <View style={styles.search__wrap}>
                <TextInput
                    style={styles.input}
                    placeholder='Useless Text'
                    onChangeText={setInputValue}
                    value={inputValue}
                    onSubmitEditing={getArtistsData}

                /> 
                <FlatList
                    data={artistsArray}
                    keyExtractor={(item, index) => index}
                    renderItem={({item , index}) => <AutoSuggestComponent  onPress={getArtistsData} setInputValue={setInputValue} artistName={item} index={index}/>}
                />

                
            </View>
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
    input: {
        backgroundColor: '#07AB80',
        maxWidth: '90%',
        marginLeft:  20,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 15,
        fontSize: 24,
        paddingTop: 6,
        paddingLeft: 15,
        paddingBottom: 6,
        paddingRight: 15
    },
    search__btn: {
        backgroundColor: '#07AB80',
        maxWidth: 100,
        borderRadius: 20,
        marginTop: 20,
        marginLeft:  20,
        
    },
    search__btn__text: {
        fontSize: 22,
        textAlign: 'center'
    },

});

export default Search;