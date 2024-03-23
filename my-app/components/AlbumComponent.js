import { View, Text, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';
import {setAlbumTracks} from '../screens/albumTracks/AlbumTracksSlice'
import { useDispatch, useSelector } from 'react-redux';


const AlbumComponent = (props) => {
    const dispatch = useDispatch();
    const artistName = useSelector(state => state.album.artistName)
    const apikey = 'd9dcb351'
    console.log(props.albumId)
   
    const GetAlbumTracksUrl = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=${apikey}&format=jsonpretty&artist_name=`

    function getAlbums(){
        console.log('NAME',artistName)
        fetch(GetAlbumTracksUrl+artistName).then((data) => {
            return data.json()
            
         }).then((data) => {
            console.log(data.results[0].tracks)
           
         })
    }

    function AlbumTracksNavigate(){
        getAlbums()
        props.navigation.navigate("AlbumTracks")
        props.setCurrentAlbumName(props.albumName)
        dispatch(setAlbumTracks('Some data'));
    }
    return(
        <TouchableOpacity onPress={AlbumTracksNavigate}>
            <ImageBackground source={{ uri: props.albumImage }}  style={styles.album}>
            </ImageBackground>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    album: {
        borderRadius: 100,
        width: 120,
        height: 120,
        marginTop: 20
    },
    

});
export default AlbumComponent