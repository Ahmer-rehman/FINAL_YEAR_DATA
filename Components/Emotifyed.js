import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const songs = [
  { id: '1', title: 'Shape of You', artist: 'Ed Sheeran' },
  { id: '2', title: 'Someone Like You', artist: 'Adele' },
  { id: '3', title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
  { id: '4', title: 'Rolling in the Deep', artist: 'Adele' },
  { id: '5', title: 'Believer', artist: 'Imagine Dragons' },
  { id: '6', title: 'Stressed Out', artist: 'Twenty One Pilots' },
  { id: '7', title: 'Let Her Go', artist: 'Passenger' },
  { id: '8', title: 'Shallow', artist: 'Lady Gaga & Bradley Cooper' },
  { id: '9', title: 'Hello', artist: 'Adele' },
  { id: '10', title: 'Photograph', artist: 'Ed Sheeran' },
];

const emotionColors = 
  emotion_colors = [
    {"Happiness": '#FFD97D'},
    {"Sadness": '#A2D2FF'},
    {"Anger": '#FF6767'},
    {"relaxed": '#FFC6FF'},
    {"energetic": '#00FF00'},
];

const EmotionSongList = ({ emotion }) => {
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  const [songs, setsongs] = useState(fetchdataApi);
  const playSong = (songId) => {
    console.log(`Playing song with id: ${songId}`);
  };

  const fetchdataApi = async (base64Image) => {
    try {
      const response = await axios.post('http://172.0.3.21:5000/mood', {
      
      });
      setsongs(response.data);
      console.log('processed', response.data);
    } catch (error) {
      console.error('Error sending image', error);
    }
  }; 
  const togglePlay = (songId) => {
    if (currentlyPlayingId === songId) {
      setCurrentlyPlayingId(null);
    } else {
      setCurrentlyPlayingId(songId);
      playSong(songId);
    }
  };

  const currentSong = songs.find(song => song.id === currentlyPlayingId);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image style={styles.thumbnail} source={require("../assets/splash.png")}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={() => togglePlay(item.id)}>
        <Icon
          name={currentlyPlayingId === item.id ? "pause" : "play"}
          size={24}
          color="#1DB954"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: emotionColors[emotion] || '#191414' }]}>
      <Text style={[styles.header, { color: '#fff' }]}>
        Songs for {emotion}
      </Text>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      {currentlyPlayingId && (
        <View style={styles.playerBar}>
          <Text style={styles.playerBarText}>{currentSong ? `${currentSong.title} by ${currentSong.artist}` : ''}</Text>
          <TouchableOpacity onPress={() => togglePlay(currentlyPlayingId)}>
            <Icon
              name={currentlyPlayingId ? "pause" : "play"}
              size={24}
              color="#1DB954"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191414', 
    borderRadius: 10,
    borderWidth: 2, 
    borderColor: '#1DB954', 
    marginBottom: 8,
    padding: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  artist: {
    fontSize: 16,
    color: '#b3b3b3',
  },
  playButton: {
    padding: 10,
  },
  playerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#191414',
    borderTopColor: '#1DB954',
    borderTopWidth: 2,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerBarText: {
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
});

export default EmotionSongList;
