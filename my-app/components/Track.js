import { View,  StyleSheet , TouchableOpacity, Modal,TextInput, Button, Alert, Text,Pressable, ImageBackground} from 'react-native';



const Track = (props) => {

    
    return (
        <View>
            <Text>{props.name}</Text>
            <Button>Play</Button>
        </View>
    )

}


export default Track