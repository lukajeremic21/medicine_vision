import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const BrainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/brain.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Tumor mozga</Text>

        <Text style={styles.description}>Instructions:</Text>
          <Text style={styles.description}>
            1. Press the button below to open the camera.
          </Text>
          <Text style={styles.description}>
            2. Take a picture of the CT brain tumor.
          </Text>
          <Text style={styles.description}>
            3. Crop the image if necessary.
          </Text>

      </View>
      <View style={styles.iconContainer}>
        {/* Your icon component goes here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top of the screen
    alignItems: 'center',
    backgroundColor: '#f2e8cf',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 40, // Adjust the marginTop value to move the image higher or lower
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20, // Adjust the marginTop value to move the text higher or lower
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BrainScreen;
