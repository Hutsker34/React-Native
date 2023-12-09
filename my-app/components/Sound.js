import React, { useState, useEffect , useRef} from 'react';
import { Audio } from 'expo-av';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import pauseIcon from '../assets/pause.png';
import playIcon from '../assets/play.png';

const Sound = ({ path, isActive, hasChanged, pauseLastTrack, setCurrentSoundIndex, index, name }) => {
    const ref = useRef(null);


    const [isPaused, setIsPaused] = useState(false);
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
      
      let position = (playbackStatus.durationMillis * event.nativeEvent.locationX) / trackWidth
      
      sound.playFromPositionAsync(position)
      setTrackMillis(position)
      
    }

    
    useEffect(() => {
      if(playbackStatus && playbackStatus.didJustFinish){
        sound.stopAsync()
        setIsPaused(false)
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

        const loadAudio = async () => {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(path);
                await soundObject.setVolumeAsync(0.7);
                if (!isCancelled) {
                    setSound(soundObject);
                }
            } catch (error) {
                console.error("Error loading or playing audio:", error);
            }
        };

        loadAudio();

        return () => {
            isCancelled = true;
            sound?.unloadAsync();
        };
    }, [path]);

    useEffect(() => {
        setIsPaused(isActive);
    }, [isActive]);


    useEffect(() => {
        const togglePlayback = async (play) => {
            if(!sound){
              return
            }

            if(!play){
              return await sound.pauseAsync();
            }
            
            if (hasChanged) {
                pauseLastTrack(sound);
                
                await sound.replayAsync();
            } else {
                await sound.playFromPositionAsync(trackMillis);
            }
            
        };

        togglePlayback(isPaused);
    }, [isPaused, hasChanged, sound, pauseLastTrack]);

    

    const handlePlayPause = () => {
        setIsPaused(!isPaused);
        setCurrentSoundIndex(index);
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
              source={isPaused ? pauseIcon : playIcon}
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