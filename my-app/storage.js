import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTestData = async () => {
    let num = await AsyncStorage.getItem('my-key');
    console.log('NUM', num)
    num = Number(num)

    try {
      await AsyncStorage.setItem('my-key', JSON.stringify(+num +1));
    } catch (e) {
      // saving error
    }
  };

const getTestData = async () => {
    try {
        const value = await AsyncStorage.getItem('my-key');
        return JSON.parse(value)
        }
    catch (e) {
        // error reading value
    }
};






export {storeTestData, getTestData}