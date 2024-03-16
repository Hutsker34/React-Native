import { View, Text, StyleSheet, TouchableOpacity,ImageBackground} from 'react-native';

const AlbumComponent = (props) => {
    function AlbumTracksNavigate(){
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