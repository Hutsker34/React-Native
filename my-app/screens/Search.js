import React, { useState, useEffect} from 'react';
import { View, TextInput,  Text, StyleSheet, FlatList} from 'react-native';
import fetch from 'node-fetch';
import Menu from '../components/Menu'
import artist from '../assets/artists.json'
import AutoSuggestComponent from '../components/AutoSuggestComponent'
import AlbumComponent from '../components/AlbumComponent';
import { useDispatch } from 'react-redux';
import { setAlbumId } from './albumTracks/AlbumTracksSlice';

const Search =  ({ navigation }) => {
    const dispatch = useDispatch()
    const apikey = 'd9dcb351'

   
    const GetAlbumTracksUrl = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=${apikey}&format=jsonpretty&artist_name=`
    const GetAlbumsUrl = `https://api.jamendo.com/v3.0/artists/albums/?client_id=${apikey}&format=jsonpretty&name=`
    const [artistsArray , setArtistArray] = useState([])
    const [albums, setAlbums] = useState([])
    const [currentAlbumName, setCurrentAlbumName] = useState('')
    const [currentTracks , setCurrentTracks] = useState([])
    const [inputValue , setInputValue] = useState('')

    function onChangeInput(value){
        setInputValue(value)
        setAlbums([])
    }

    function getValue(value){
        setInputValue(value)
        const artistName = value.toLowerCase().replaceAll(' ', '+')
        fetch(GetAlbumsUrl+artistName).then((data) => {
            return data.json()
            
         }).then((data) => {
            if(data.results[0]){
                setAlbums(data.results[0].albums)
                // dispatch(setAlbumId(data.results[0].albums))
                console.log('DATA',data.results[0].albums)
            }else{
                setAlbums([])
            }
           
         })
    }

    const getArtistsData = () => {
        const artistName = inputValue.toLowerCase().replaceAll(' ', '+')
        dispatch(setArtistName(artistName))
        fetch(GetAlbumsUrl+artistName).then((data) => {
            return data.json()
            
         }).then((data) => {
            if(data.results[0]){
                setAlbums(data.results[0].albums)
            }else{
                setAlbums([])
            }
           
         })

    }
    // const SetCurrentTracks = () => {
    //     const artistName = inputValue.toLowerCase().replaceAll(' ', '+')
    //     fetch(`https://api.jamendo.com/v3.0/albums/tracks/?client_id=d9dcb351&format=jsonpretty&artist_name=alex+che`).then((data) => {
    //         return data.json()
    //      }).then((data) => {
    //         // console.log('dataAlbums',data)
    //      })
    // }

    useEffect(() => {
        if(inputValue == ''){
            return
        }
        let result = artist.filter(item => item.startsWith(inputValue) ).slice(0, 10) ;
        //console.log('result',result);
        setArtistArray(result)
    },[inputValue])

    return (
        <View style={styles.HomePageWrap}>
            <View style={styles.search__wrap}>
                <TextInput
                    style={styles.input}
                    placeholder='Artists...'
                    onChangeText={onChangeInput}
                    value={inputValue}
                    onSubmitEditing={getArtistsData}

                /> 
                {albums.length == 0 &&
                    (<FlatList
                        ListEmptyComponent={<Text style={styles.EmptyText}>{inputValue == "" ? '' : 'not finde((('}</Text>}
                        data={artistsArray}
                        keyExtractor={(item, index) => index}
                        renderItem={({item , index}) =>
                            
                            <AutoSuggestComponent getArtistsDataCall={getValue}  artistName={item} index={index}/> 
                        }
                    />
                    )
                }
                
                <FlatList
                    data={albums}
                    keyExtractor={(item, index) => index}
                    renderItem={({item , index}) => <AlbumComponent navigation={navigation}  setCurrentAlbumName={setCurrentAlbumName}  albumImage={item.image} albumName={item.name} albumId={item.id}  index={index}/>}
                />

                
            </View>
            <Menu/>
        </View>
    );
};


const styles = StyleSheet.create({
    EmptyText: {
        color: 'white',
        fontSize: 26
    },
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
    search__wrap: {
        paddingLeft: 30
    }

});

export default Search;