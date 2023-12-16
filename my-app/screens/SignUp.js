import React, { useState, useEffect } from 'react';
import { View,  StyleSheet , TouchableOpacity, Modal,TextInput, Button, Alert, Text,Pressable, ImageBackground} from 'react-native';
import Slick from 'react-native-slick'
import firstSlide from '../assets/firstSlide.png'
import secondSlide from '../assets/secondSlide.png'


const CatImage = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    props.navigation.navigate("Home")
    setModalVisible(!modalVisible)
  };

 

  return (

    <Slick style={styles.wrapper} loop={false}>
        <ImageBackground source={firstSlide} testID="Hello" style={styles.slide1}>
          <Text style={styles.Title}>Sleep soundly</Text>
          <Text style={styles.text}>Sleep better with our ambient sound playlist</Text>
        </ImageBackground>
        <ImageBackground source={secondSlide} testID="Hello2" style={styles.slide2}>
          <View style={styles.Slide2__wrap}>
            <Text style={styles.Title}>Awake refreshed</Text>
            <Text style={styles.text}>Melodic tunes will wake you gently and leave you feeling refreshed</Text>
            <Pressable 
              style={styles.button__signUp}
              onPress={() => setModalVisible(true)}
             >
              <Text style={{color: 'white', fontSize: 26, fontWeight: 600, textAlign: 'center'}}>Sign up</Text>
            </Pressable>
            <Text style={{color: 'white', fontSize: 22, fontWeight: 400, textAlign: 'center', marginTop: 35}}>Login</Text>
          </View>



          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                    style={styles.closeBtn}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{fontSize: 22, fontWeight: 500,}}>X</Text>
                </Pressable>
                <Text style={{fontSize: 18}}>Email:</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder=""
                  style={styles.input}
                />

                <Text style={{fontSize: 18}}>Password:</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  placeholder=""
                  style={styles.input}
                />

                <Text style={{fontSize: 18}}>Confirm Password:</Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                  placeholder=""
                  style={styles.input}
                />

                <TouchableOpacity
                 style={[styles.button]} 
                 onPress={handleRegister}
                 
                 >
                  <Text style={{color: 'white', textAlign: 'center'}}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>



        </ImageBackground>
    </Slick>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 16,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  closeBtn:{
    position: 'relative',
    left: 215,
    bottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
     maxWidth: 100,
     
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    paddingHorizontal:  20,
    paddingTop: 100,

  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:  20,
    
  },
  Slide2__wrap: {
    marginTop: 280,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    position: 'relative',
    top: 50,
    
  },

  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    position: 'relative',
    top: 60,
    textAlign: 'center',
  },

  button__signUp: {
      backgroundColor: '#04AB80',
      width: 300,
      paddingHorizontal:  20,
      paddingVertical:  20,
      borderRadius: 5,
      marginTop: 100
  },
  
});

export default CatImage;