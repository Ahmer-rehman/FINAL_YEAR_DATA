import React from 'react';
import { SafeAreaView,View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Settings } from 'react-native';
import SignUpScreen from './Signup';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';

import StoreReview from 'react-native-store-review';


const SettingScreen= ({navigation}) => {
  
  return (
    
        <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={require("./assets/dp.png")} style={styles.profilePic} />
        <Text style={styles.userName}>{SignUpScreen.Email}</Text>
        <Text style={styles.userHandle}>@{SignUpScreen.User}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingsList}>
        <SettingsOption title="Permissions"/>
        <SettingsOption title="About" />
        <SettingsOption title="Rate our app" />
        <SettingsOption title="Invite Friends" />
        <SettingsOption title="Support" />
        <SettingsOption title="Privacy Policy" />
        <SettingsOption onPress={Alert.Alert("You")} title="Terms & Conditions" />
        <View style={styles2.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={navigation.navigate("LoginScreen")}>
          <Text style={styles.logoutButtonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>    
      </View>
    </ScrollView>


  );
};

const SettingsOption = ({ title ,onPress }) => (
  <TouchableOpacity style={styles.settingsOption} onPress={onPress}>
    <Text style={styles.settingsOptionText}>{title}</Text>
  </TouchableOpacity>
);
const PermissionModal = ({ isVisible, onRequestClose }) => {
  return (
    <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Camera and Storage Permissions</Text>
        <Text style={styles.modalText}>
          This app requires access to your camera and storage to provide its features.
        </Text>
        <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// About Modal Component
const AboutModal = ({ isVisible, onRequestClose, username, phoneModel, osVersion }) => {
  return (
    <Modal isVisible={isVisible} onRequestClose={onRequestClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>About</Text>
        <Text style={styles.modalText}>
          Username: {username}
        </Text>
        <Text style={styles.modalText}>
          Phone Model: {phoneModel}
        </Text>
        <Text style={styles.modalText}>
          OS Version: {osVersion}
        </Text>
        <TouchableOpacity onPress={onRequestClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const Settings = () => {
  const [isPermissionModalVisible, setPermissionModalVisible] = useState(false);
  const [isAboutModalVisible, setAboutModalVisible] = useState(false);

  const togglePermissionModal = () => {
    setPermissionModalVisible(!isPermissionModalVisible);
  };

  const toggleAboutModal = () => {
    setAboutModalVisible(!isAboutModalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={require("./assets/dp.png")} style={styles.profilePic} />
        <Text style={styles.userName}></Text>
        <Text style={styles.userHandle}>@{user.username}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      
      {/* Permission Settings */}
      <TouchableOpacity onPress={togglePermissionModal}>
        <Text style={styles.settingsOptionText}>Permissions</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleAboutModal}>
        <Text style={styles.settingsOptionText}>About</Text>
      </TouchableOpacity>

      <PermissionModal isVisible={isPermissionModalVisible} onRequestClose={togglePermissionModal} />
      <AboutModal isVisible={isAboutModalVisible} onRequestClose={toggleAboutModal} username="JohnDoe" phoneModel="iPhone X" osVersion="iOS 14" />
    </ScrollView>
  );
};


class AppRating extends React.Component {
  state = {
    rating: 0,
    feedback: '',
  };

  handleRatingChange = (rating) => {
    this.setState({ rating });
  };

  handleFeedbackChange = (feedback) => {
    this.setState({ feedback });
  };

  handleSubmit = () => {
    const { rating, feedback } = this.state;

    if (StoreReview.isAvailable) {
      StoreReview.requestReview();
    } else {
      Alert.alert(
        'Thank You!',
        'Your feedback has been recorded. We appreciate your input.'
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rate our app:</Text>
        <View style={styles.ratingContainer}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.rating}
            selectedStar={(rating) => this.handleRatingChange(rating)}
          />
        </View>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Leave your feedback (optional)"
          onChangeText={this.handleFeedbackChange}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
      
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
    height: 120,
    width: 120,
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
    textAlign: 'center',
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
    justifyContent: 'center', 
    alignItems: 'center',     
  },
}
);

export default SettingScreen;

