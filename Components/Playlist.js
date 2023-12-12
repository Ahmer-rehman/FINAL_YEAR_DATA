import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

const img = '../assets/image.png';

const songs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    image: require(img),
  },
  {
    id: 2,
    title: 'Thriller',
    artist: 'Michael Jackson',
    image: require(img),
  },
  {
    id: 3,
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    image: require(img),
  },
  {
    id: 4,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    image: require(img),
  },
  {
    id: 5,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    image: require(img),
  },
  {
    id: 6,
    title: 'Imagine',
    artist: 'John Lennon',
    image: require(img),
  },
  {
    id: 7,
    title: 'I Will Always Love You',
    artist: 'Whitney Houston',
    image: require(img),
  },
  {
    id: 8,
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    image: require(img),
  },
  {
    id: 9,
    title: 'Hotel California',
    artist: 'Eagles',
    image: require(img),
  },
  {
    id: 10,
    title: 'Smooth',
    artist: 'Santana ft. Rob Thomas',
    image: require(img),
  },
];

const PlaylistScreen = () => {
  const renderSong = ({ item }) => (
    <View key={item.id} style={styles.songItem}>
      <Image style={styles.imageIcon} source={item.image} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Playlist</Text>
      </View>

      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#191414', // Dark background color like Spotify
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#1DB954', // Spotify green
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    marginLeft: 16,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10, // Increased padding for better spacing
    backgroundColor: '#191414', // Dark background color like Spotify
    borderBottomWidth: 0.8,
    borderBottomColor: 'green', // Slightly lighter color for separating items
     borderBottomLeftRadius:"100%"
  },
  imageIcon: {
    width: 60, // Slightly larger image icon
    height: 60, // Slightly larger image icon
    borderRadius: 10, // Rounded corners
    marginRight: 10,
  },
  songInfo: {
    flex: 1, // Take up remaining space
    flexDirection: 'column',
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
  },
  songArtist: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#B3B3B3', // Lighter text color
  },
});

export default PlaylistScreen;
