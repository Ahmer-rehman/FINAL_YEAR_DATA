import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Auth } from './Firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;
      Alert.alert('Login Successful');
      navigation.navigate('CameraScreen');
      token=user.getIdToken().then(function(idToken) {
        console.log("Authentication Token:", token);
      });

      return user;
    }
     catch (error) {
      Alert.alert('Wrong credentials');
      throw error;
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.upperHalf}>
        {/* Replace your logo with a Spotify-like logo */}
        <Image source={require("../assets/splash.png")} style={styles.logo} />
      </View>
      <View style={styles.lowerHalf}>
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              placeholderTextColor="#bbb" // Placeholder text color
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Icon name="envelope" size={20} color="#1DB954" style={styles.inputIcon} />
          </View>
          <View style={styles.inputField}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#bbb" // Placeholder text color
              style={styles.input}
              secureTextEntry
            />
            <Icon name="lock" size={20} color="#1DB954" style={styles.inputIcon} />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Spotify's dark background color
  },
  upperHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Spotify's dark background color
  },
  logo: {
    height: "90%",
    width: "90%", 
    resizeMode: 'contain', 
  },
  lowerHalf: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    margin: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A', // Slightly lighter dark for input field
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: "#fff", // White text for better readability
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#1DB954', // Spotify's brand color for the button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#1DB954', // Spotify's brand color for the text
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;
