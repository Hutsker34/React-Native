import { View, TextInput,  Text, StyleSheet, FlatList , TouchableOpacity} from 'react-native';

const AutoSuggestComponent = (props) => {
    return(
        <TouchableOpacity onPress={() => props.getArtistsDataCall(props.artistName)}>
            <View>
                <Text style={styles.text}>{props.artistName}</Text>
            </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },

});
export default AutoSuggestComponent