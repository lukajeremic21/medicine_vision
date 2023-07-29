import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCamera } from '@fortawesome/free-solid-svg-icons';

const BloodCellsScreen = () => {
  const navigation = useNavigation();

  function createFormData(imageUri) {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', // Adjust the image type if needed
      name: 'nova.jpg', // Provide a suitable name for the image
    });
  
    return formData;
  }


  const handleCameraPress = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Camera permission not granted');
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancel0ed) {
        navigateToImageScreen(result.uri);
      }
    } catch (error) {
      console.log('Error opening camera:', error);
      Alert.alert('Error', 'Failed to open the camera. Please try again later.');
    }
  };

  
  const handleImagePickerPress = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Gallery permission not granted');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancelled) {
        navigateToImageScreen(result.uri);
      }
    } catch (error) {
      console.log('Error opening gallery:', error);
      Alert.alert('Error', 'Failed to open the gallery. Please try again later.');
    }
  };

  const navigateToImageScreen = async (imageUri) => {
    try {

      const response = await fetch('http://192.168.0.101:5000/blood_cells', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: createFormData(imageUri),
      });


      console.log("RESPONSEEEEEEEE")
      console.log(response);

      if (!response.ok) {
        throw new Error('Failed to upload the image. Please try again later.');
      }
      const responseData = await response.text();

      console.log(responseData);
      navigation.navigate('BloodCellImageScreen', { imageUri, responseData });
    } catch (error) {
      console.log('Error uploading image:', error);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/red-blood-cells.png')}
              style={styles.image}
            />
          </View>
          <Text style={styles.instructions}>Instructions:</Text>
          <Text style={styles.instructionText}>
            1. Press the button below to open the camera.
          </Text>
          <Text style={styles.instructionText}>
            2. Take a picture of the blood cells.
          </Text>
          <Text style={styles.instructionText}>
            3. Crop the image if necessary.
          </Text>
          <TouchableOpacity style={styles.cameraButton} onPress={handleCameraPress}>
            {/* <FontAwesomeIcon icon={faCamera} size={24} color="white" /> */}
            <Text style={styles.cameraButtonText}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePickerPress}>
			<Text style={styles.cameraButtonText}>Upload image</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2e8cf',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  instructions: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
  },
  cameraButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796b',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});

export default BloodCellsScreen;
