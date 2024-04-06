import { View, Text, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';
import {setAlbumTracks} from '../screens/albumTracks/AlbumTracksSlice'
import { useDispatch, useSelector } from 'react-redux';


const AlbumComponent = (props) => {
    const dispatch = useDispatch();
    const artistName = useSelector(state => state.album.artistName)
    const apikey = 'd9dcb351'
    console.log(props.albumId)
   
    const GetAlbumTracksUrl = `https://api.jamendo.com/v3.0/albums/tracks/?client_id=${apikey}&format=jsonpretty&artist_name=`
    console.log('url', GetAlbumTracksUrl+artistName)
    function getAlbumsTracks(){
        fetch(GetAlbumTracksUrl+artistName).then((data) => {
            return data.json()
            
         }).then((data) => {
            return data.results.filter(el => el.id == props.albumId)
            
            
         }).then((data) => {
            dispatch(setAlbumTracks(data[0].tracks))
         })
    }

    function AlbumTracksNavigate(){
        getAlbumsTracks()
        props.navigation.navigate("AlbumTracks")
        props.setCurrentAlbumName(props.albumName)
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