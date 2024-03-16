import { View, TextInput,  Text, StyleSheet, FlatList , TouchableOpacity} from 'react-native';

const AutoSuggestComponent = (props) => {
    return(
        <TouchableOpacity onPress={() => props.getArtistsDataCall(props.artistName)}>
            <View style={styles.wrap}>
                <Text style={styles.text}>&#128269;      {props.artistName}</Text>
            </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize:14,
        color: 'black',
        fontWeight: 'bold'
    },
    wrap: {
        backgroundColor: '#07AB80',
        maxWidth: '90%',
        marginBottom: 1,
        marginTop: 5,
        padding: 5,
        borderRadius: 5,
        
    }

});
export default AutoSuggestComponent