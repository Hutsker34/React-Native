import React, { useState, useEffect , useRef} from 'react';
import { Audio } from 'expo-av';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import pauseIcon from '../assets/pause.png';
import playIcon from '../assets/play.png';

const Sound = ({ trackMillis, playNext, sound, playbackStatus, isActive, setCurrentSoundIndex, index, name }) => {
    const ref = useRef(null);
    // Текущий объект звука Audio.Sound
//    const [sound, setSound] = useState(null);
    // Объект статуса, связанный с sound
//    const [playbackStatus, setPlaybackStatus] = useState(null);
    // Ширина прогресс-бара
    const [trackWidth, setTarckwidth] = useState(0)
    // Количество проигранный секунд
    
    const [isPlaying, setIsPlaying] = useState(false);

//    const onPlaybackStatusUpdate = (status) => {
//      setPlaybackStatus(status);
////      setTrackMillis(status.positionMillis)
//    };
    
   const getProgress = () => {
    //визуальное отображение progreessbar
     if (playbackStatus) {
       const progress =
         (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
       return `${Math.round(progress)}%`;
     }
     return '0%';
   };

   function setPlayPosition(event){
    //управление progressbar
     let position = playbackStatus ? (playbackStatus.durationMillis * event.nativeEvent.locationX) / trackWidth : 0
     sound.playFromPositionAsync(position)
   }

    
   useEffect(() => {
     if(playbackStatus && playbackStatus.didJustFinish){
       // Должен триггерить обновление sound и playBackStatus

       playNext();
       // sound.stopAsync()
     }
   }, [playbackStatus])


//
//    useEffect(() => {
//      if (!sound ) {
//        return
//      }
//
//      const loadSound = async () => {
//        const status = await sound.getStatusAsync()
//        // Должно триггерить обновление playBackStatus
//        // Когда меняется sound? Не триггерит ли он по цепочке currentSoundIndex через playNext
//        if(status.isLoaded){
////          sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
//        }
//      }
//
//      loadSound();
//    }, [sound]);



//    useEffect(() => {
////        let isCancelled = false;
//        const updateAudio = async () => {
//          if(sound){
//            const status = await currentSound.getStatusAsync()
//            if(status.isLoaded){
//              // Какая у него связанность с sound, по ссылке или нет
//              // Не срабатывает ли этот код при нажатии на паузу
//              setSound(currentSound)
//            }
//          }
//        }
//        updateAudio()
//
////        return () => {
////            isCancelled = true;
////            sound?.unloadAsync();
////        };
//
//    }, [sound]);



    function getPlayIcon(){
      if(isPlaying && isActive){
        return pauseIcon
      }else{
        return playIcon
      }
    }
    
    const handlePlayPause = async () => {
        // Нужна ли проверка на isActive?

        setCurrentSoundIndex(index);

        if(isPlaying){
          await sound.pauseAsync();
        }else{
           await sound.playFromPositionAsync(trackMillis);
        }
    };

//    useEffect(() => {
//      const updateStatus = async () => {
//
//        const playbackStatus = await sound.getStatusAsync();
//
//        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
//      }
//
//      if (!sound) {
//          return
//      }
//      updateStatus();
//
//      return () => sound.setOnPlaybackStatusUpdate(null);
//    }, [sound])

    useEffect(() => {
            if (playbackStatus) {
                setIsPlaying(playbackStatus.isPlaying);
            }
    }, [playbackStatus])

    return (
    <View style={styles.track__wrap}>
      <Text  style={styles.track__wrapName}>{name}</Text>
      {isActive &&
        <View onLayout={(event) => {
          const {width} = event.nativeEvent.layout;
          setTarckwidth({width}.width)

          }}
          ref={ref} onTouchStart={(event) => setPlayPosition(event)} style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: getProgress() }]} />
        </View>
      }
      <TouchableOpacity onPress={handlePlayPause} style={styles.pauseBtn}>
          <Image
              style={styles.pauseBtn__Img}
              source={getPlayIcon()}
          />
      </TouchableOpacity>
    </View>
    );
};



const styles = StyleSheet.create({

  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackName: {
    // Your track name styles
  },
  track__wrap: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'calc(100% - 40px)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#07AB80',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 5,
    borderRadius: 20,


  },
  pauseBtn__Img: {
    maxWidth: 16,
    maxHeight: 16
  },
  progressBarContainer: {
    flex: 1,
    height: 5,
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    marginHorizontal: 10, // Adjust as needed for spacing
    borderRadius: 2.5,
  },
  progressBar: {
    backgroundColor: '#007A5B',
    width: 50,
    height: '100%',
    borderRadius: 2.5,
  },
  playIcon: {
    // Your play icon styles
    width: 30, // Example size, adjust as needed
    height: 30, // Example size, adjust as needed
  },
});

export default Sound;