import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import pauseIcon from '../assets/pause.png';
import playIcon from '../assets/play.png';

const Sound = ({ path, isActive, hasChanged, pauseLastTrack, setCurrentSoundIndex, index, name }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [sound, setSound] = useState(null);
    const [playbackStatus, setPlaybackStatus] = useState();

    const onPlaybackStatusUpdate = (status) => {
      setPlaybackStatus(status);
    };
    useEffect(() => {
      if (sound) {
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
    }, [sound]);
    
    const getProgress = () => {
      if (playbackStatus) {
        const progress =
          (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
        return `${Math.round(progress)}%`;
      }
      return '0%';
    };

    

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
                await sound.playAsync();
            }
            
        };

        togglePlayback(isPaused);
    }, [isPaused, hasChanged, sound, pauseLastTrack]);

    

    const handlePlayPause = () => {
        setIsPaused(!isPaused);
        setCurrentSoundIndex(index);
    };

    return (
      <View style={styles.trackContainer}>
      {/* <Text style={styles.track__wrapName}>{name}</Text> */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: getProgress() }]} />
      </View>
      
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
  progressBarContainer: {
    flex: 1,
    height: 5,
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    marginHorizontal: 10, // Adjust as needed for spacing
    borderRadius: 2.5,
  },
  progressBar: {
    backgroundColor: 'blue',
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