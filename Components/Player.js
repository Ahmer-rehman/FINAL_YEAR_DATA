import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated,ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import * as Progress from 'react-native-progress';

import PlaylistScreen from './Playlist';


const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));


  useEffect(() => {
    async function loadSongs() {
      const songAssets = await Asset.loadAsync(require('../assets/songs/sample.mp3'));//{simple,Sample2,Sample3}
      setSongs(songAssets);
    }

    loadSongs();
  }, []);

  const handlePlayPause = async () => {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(currentSong);
      setSound(sound);
      setIsPlaying(true);
      sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isPlaying) {
          setProgress(status.positionMillis / status.durationMillis);
        }
      });
    } else {
      if (isPlaying) {
        sound.pauseAsync();
        setIsPlaying(false);
      } else {
        sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleForward = async () => {
    if (sound) {
      await sound.stopAsync();
    }

    const nextSongIndex = songs.indexOf(currentSong) + 1;
    if (nextSongIndex >= songs.length) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[nextSongIndex]);
    }
  };

  const handleBackward = async () => {
    if (sound) {
      await sound.stopAsync();
    }

    const prevSongIndex = songs.indexOf(currentSong) - 1;
    if (prevSongIndex < 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[prevSongIndex]);
    }
  };
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return (
  <>
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={[styles.title]}>{currentSong ? currentSong.name : 'No Song Selected'}</Text>
      </View>
      <View style={styles.content}>
        <Image source={require('../assets/icon4.jpg')} style={styles.icon} />
        <Progress.Bar  progress={0.3} width={300} borderColor='orange' color= 'orange' />
        
        <View style={styles.Timing}>
        <Text style={styles.Text}>02 : 04</Text>
        <Text style={styles.Text}>04 : 03</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={handleBackward}>
            <Image source={require('../assets/back.webp')} style={styles.controlIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayPause}>
            <Image source={isPlaying ? require('../assets/pause.png') : require('../assets/play.png')} style={[styles.controlIcon]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForward}>
            <Image source={require('../assets/forward.png')} style={styles.controlIcon} />
          </TouchableOpacity>
        </View>
        
      </View>
      
    </View>
    
    <View style={styles.Containr}>
        <PlaylistScreen/>
        </View>
      
    </>
  );
};
export default Player
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191414', // Dark background color like Spotify
    flex: 1,
  },
  header: {
    padding: 10,
    paddingVertical: 15,
    borderBottomColor: '#1DB954', // Spotify green
    borderBottomWidth: 1,
    borderRadius: 80,
  },
  title: {
    marginLeft: 70,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '60%',
    height: '40%',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    elevation: 10,
    marginTop: 10,
  },
  controls: {
    elevation: 10,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: -20,
    justifyContent: 'center', // Center the control icons horizontally
  },
  controlIcon: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginBottom: 200,
    tintColor: '#FFFFFF', // White icon color
  },
  Timing: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space evenly between timing text
    marginHorizontal: 70,
    marginTop: 10,
  },
  Text: {
    color: '#B3B3B3', // Lighter text color
  },
  Containr: {
    height: '30%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#191414', // Dark background color like Spotify
    borderTopColor: '#1DB954', // Spotify green
    borderTopWidth: 1,
  },
});
