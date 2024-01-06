import React, { useState, useEffect , useRef} from 'react';
import { Audio } from 'expo-av';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import pauseIcon from '../assets/pause.png';
import playIcon from '../assets/play.png';

const Sound = ({playNext, currentSound, isActive, setCurrentSoundIndex, index, name }) => {
    const ref = useRef(null);


    
    const [sound, setSound] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState();
    const [trackWidth, setTarckwidth] = useState(0)
    const [trackMillis, setTrackMillis] = useState(0)

    const onPlaybackStatusUpdate = (status) => {
      setPlaybackStatus(status);
      setTrackMillis(status.positionMillis)
    };


    
    
    const getProgress = () => {
      if (playbackStatus) {
        const progress =
          (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
        return `${Math.round(progress)}%`;
      }
      return '0%';
    };

    function setPlayPosition(event){
      
      let position = playbackStatus ? (playbackStatus.durationMillis * event.nativeEvent.locationX) / trackWidth : 0
      
      sound.playFromPositionAsync(position)
      setTrackMillis(position)
      
    }

    
    useEffect(() => {
      
      if(playbackStatus && playbackStatus.didJustFinish){
        playNext()
        // sound.stopAsync()
        
      }
    }, [playbackStatus])



    useEffect(() => {
     
      if (!sound) {
        return
        
      }
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      

    }, [sound]);



    useEffect(() => {
      
        let isCancelled = false;
        const updeteAudio = async () => {
          if(currentSound){
            const status = await currentSound.getStatusAsync()
            if(status.isLoaded){
              setSound(currentSound)
            }
          }
        }
        updeteAudio()
       
        // const loadAudio = async () => {
        //     const soundObject = new Audio.Sound();
        //     try {
        //         await soundObject.loadAsync(path);
        //         await soundObject.setVolumeAsync(0.7);
        //         if (!isCancelled) {
        //             setSound(soundObject);
        //         }
        //     } catch (error) {
        //         console.error("Error loading or playing audio:", error);
        //     }
        // };

        // loadAudio();

        return () => {
            isCancelled = true;
            sound?.unloadAsync();
        };
        
    }, [currentSound]);

    useEffect(() => {
        
        
    }, [isActive]);


    

    function getPlayIcon(){
      
      if(!playbackStatus ){
        return playIcon
      }
    
     
      if(playbackStatus.isPlaying && isActive){
        return pauseIcon
      }else{
        return playIcon
      }
    }
    
    const handlePlayPause = async () => {
        
        setCurrentSoundIndex(index);
        if(!playbackStatus || !isActive ){
          return 
        }
        
        if(playbackStatus.isPlaying){
          await sound.pauseAsync();
        }else{
           await sound.replayAsync();
        }
        console.log(index,isActive,playbackStatus)
    };

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
    width: '74%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#07AB80',
    marginTop: 40,
    marginLeft: 10,
    
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