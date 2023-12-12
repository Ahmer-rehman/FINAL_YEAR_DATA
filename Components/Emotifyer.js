import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const CameraScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  const captureImage = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      sendImageToApi(data.base64);
      setIsRecording(false);
    }};
  
  const sendImageToApi = async (base64Image) => {
    try {
      const response = await axios.post('http://192.168.43.84:5000/mood', {image: base64Image,});
      console.log('Image sent successfully', response.data);
    } catch (error) {
      console.error('Error sending image', error);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(ref) => (cameraRef.current = ref)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
      />
      <TouchableOpacity onPress={captureImage} style={styles.button}>
        <Text style={styles.text}>
          {isRecording ? 'Capturing...' : 'Capture'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  button: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
    backgroundColor: '#fff', // White color for the buttons
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CameraScreen;
