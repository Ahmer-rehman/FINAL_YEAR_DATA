import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import SignUpScreen from './Signup';
const Library = () => {
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const accessToken = SignUpScreen.accessToken;

  useEffect(() => {
    const fetchTopPlaylists = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTopPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching top playlists', error);
      }
    };

    const fetchTopAlbums = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/top-albums', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTopAlbums(response.data.items);
      } catch (error) {
        console.error('Error fetching top albums', error);
      }
    };

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRecentlyPlayed(response.data.items);
      } catch (error) {
        console.error('Error fetching recently played items', error);
      }
    };

    fetchTopPlaylists();
    fetchTopAlbums();
    fetchRecentlyPlayed();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Music Library</Text>
      <ScrollView>
        <AlbumSection title="Top Playlists" albums={topPlaylists}/>
        <AlbumSection title="Top Albums" albums={topAlbums} />
        <AlbumSection title="Recently Played" albums={recentlyPlayed} />
      </ScrollView>
    </View>
  );
};

const AlbumSection = ({ title, albums }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {albums.map((album, index) => (
        <View key={index} style={styles.albumCard}>
          <Image
            source={{ uri: album.images[0].url }}
            style={styles.albumImage}
            resizeMode="cover"
          />
          <Text style={styles.albumTitle}>{album.name}</Text>
          <Text style={styles.albumArtist}>{album.artists[0].name}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  albumCard: {
    marginRight: 20,
  },
  albumImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  albumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  albumArtist: {
    fontSize: 16,
    color: '#555',
  },
});

export default Library;
