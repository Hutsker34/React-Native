import AsyncStorage from '@react-native-async-storage/async-storage';


const storeTracks = async (newTrack) => {
  try {
    let existingArrayJson = await AsyncStorage.getItem('userTracks');
    let userTracks = existingArrayJson ? JSON.parse(existingArrayJson) : [];
    if (!userTracks.find(el => el.id == newTrack.id)) {
      userTracks.push(newTrack);
    } else {
      return {
        type: 'info',
        text1: 'warning',
        text2: 'track already added'
      }
    }

    let jsonValue = JSON.stringify(userTracks);

    await AsyncStorage.setItem('userTracks', jsonValue);
    return {
      type: 'success',
      text1: 'success',
      text2: 'track added'
    }
  } catch (e) {
    console.log('storeTracks error', e)
    return {
      type: 'error',
      text1: 'error',
      text2: 'track dont added'
    }
  }
};

const getTracks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userTracks');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log('getTracks error', e)
  }
};


const removeTracks = async (removedTrack) => {
  try {
    let existingArrayJson = await AsyncStorage.getItem('userTracks');
    let userTracks = JSON.parse(existingArrayJson)
    let newArray = userTracks.filter(item => item.id !== removedTrack.id)
    

    let jsonValue = JSON.stringify(newArray);
 
    await AsyncStorage.setItem('userTracks', jsonValue);
    return {
      type: 'success',
      text1: 'success',
      text2: 'track removed'
    }
  } catch (e) {
    console.log('storeTracks error', e)
    return {
      type: 'error',
      text1: 'error',
      text2: 'track dont remove'
    }
  }
};





export { storeTracks, getTracks, removeTracks}