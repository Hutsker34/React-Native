import { View, Text, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';
import {getAlbumTracks} from '../screens/albumTracks/AlbumTracksSlice'
import { useDispatch } from 'react-redux';

const AlbumComponent = (props) => {
    const dispatch = useDispatch();

    function AlbumTracksNavigate(){
        props.navigation.navigate("AlbumTracks")
        props.setCurrentAlbumName(props.albumName)
        dispatch(getAlbumTracks('Some data'));
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