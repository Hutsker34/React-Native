import { Audio } from 'expo-av';


async function playSoundsSequentially(sounds) {
    for (const soundFile of sounds) {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();

      await new Promise(resolve => {
        sound.setOnPlaybackStatusUpdate(playbackStatus => {
          console.log(playbackStatus)
          if (playbackStatus.didJustFinish) {
            resolve();
          }
        });
      });

      await sound.unloadAsync();
    }
  }

  export default playSoundsSequentially;


