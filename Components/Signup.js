import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { OperationType, createUserWithEmailAndPassword } from 'firebase/auth';
import  {Auth} from './Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [User, setUser] = useState("")
  
  function splitEmail() {
    var parts = email.split('@');
    if (parts.length !== 2) {
      setUser("Invalid email format");
    } else {
      setUser(parts[0]);
      createUser();
    }
  }
     
    const createUser = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(Auth,email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);
        console.log(user)
        Alert.alert('user Created Sucessfully');
        navigation.navigate('CameraScreen');
        return user;
     } catch (error) {
        console.error("Error creating user:", error);
        Alert.alert(
          'Error',
          error.message,
        )
          throw error;
      }
    };   

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.upperHalf}>
        <Image source={require("../assets/splash.png")} style={{ height: "70%", width: "80%" }} />
        <Text style={styles.logoText}>Musica</Text>
      </View>
      <View style={styles.lowerHalf}>
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
          <TextInput
           value={email} // Assuming you want to bind the input value to the `username` state
           placeholder="Email"
            style={styles.input}
             keyboardType="email-address"
            autoCapitalize="none"
             onChangeText={(value) => setEmail(value)}/>
            <Icon name="envelope" size={20} color="grey" style={styles.inputIcon} />
          </View>
          <View style={styles.inputField}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            />
            <Icon name="lock" size={20} color="grey" style={styles.inputIcon} />
          </View>
          <View style={styles.inputField}>
          <TextInput
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)} // Corrected the onChangeText handler
              placeholder="Confirm Password"
             style={styles.input}
             secureTextEntry
             />
            <Icon name="lock" size={20} color="grey" style={styles.inputIcon} />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={splitEmail}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigation.navigate("Login")}>
          <Text style={styles.signInRedirect}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Spotify's dark background
  },
  signInRedirect: {
    textAlign: 'center',
    color: '#1DB954', // Spotify's highlight green
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  upperHalf: {
    flex: 1,
    backgroundColor: '#121212', // Keeping it consistent with Spotify's dark theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerHalf: {
    flex: 1,
    backgroundColor: '#121212', // Same dark background for the lower half
    paddingTop: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '600',
    color: '#1DB954', // Spotify's brand green color
  },
  inputContainer: {
    margin: 20,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818', // Slightly lighter shade for input field background
    borderRadius: 4,
    marginBottom: 10,
    padding:10
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF', // White color for text to make it stand out on dark background
  },
  button: {
    backgroundColor: '#1DB954', // Spotify's green for buttons
    padding: 15,
    borderRadius: 30, // Rounded corners for buttons
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#FFFFFF', // White text on buttons
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#1DB954', // Same as signInRedirect for consistency
    fontSize: 16,
    fontWeight: '600',
  },
  inputIcon: {
    marginLeft: 10,
    color: '#1DB954', // Icons with the Spotify green for accent
  },
});
