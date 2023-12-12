import React from 'react';
import { SafeAreaView,View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import firebase from 'firebase/app';
const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [User, setUser] = useState("")
  


const firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const updateUserDetails = async (userId, User, email, password) => {
  try {
    const user = auth.currentUser;

    if (newEmail) {
      await user.updateEmail(newEmail);
    }

    
    if (newPassword) {
      await user.updatePassword(newPassword);
    }

    
    if (newUsername) {
      await db.collection('users').doc(userId).update({
        username: newUsername
      });
    }

    console.log('User details updated successfully');
  } catch (error) {
    console.error('Error updating user details:', error);
  }
};

// Example usage
updateUserDetails('userId', 'newUsername', 'newEmail@example.com', 'newPassword123');

  return (
    
    <ScrollView style={styles.container}>
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
       <TouchableOpacity style={styles.button} onPress={firebaseConfig(User,newEmail,newUsername,password)}>
     <Text style={styles.buttonText}>Update</Text>
   </TouchableOpacity>

    </ScrollView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Spotify dark background
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954', // Spotify green
  },
  profilePic: {
    height:120,width:120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: '#1DB954', // Spotify green
  },
  userName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:"center"
  },
  userHandle: {
    color: 'grey',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#1DB954', // Spotify green
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsList: {
    marginTop: 20,
    borderBottomColor:"green"
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'green',
    borderBottomLeftRadius:"green"  },
    settingsOptionText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 30,
  },
  logoutButton: {
  marginTop: 20,
  backgroundColor: '#1DB954', // Spotify green
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center', 
    width: '70%',
},

  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
  },
});

export default UserProfile;
