import { View, TextInput,  Text, StyleSheet, FlatList , TouchableOpacity} from 'react-native';

const AutoSuggestComponent = (props) => {
    function getTracks(){
        props.setInputValue(props.artistName)
    }

    return(
        <TouchableOpacity onPress={getTracks}>
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