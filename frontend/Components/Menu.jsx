import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
      style={styles.square}
      onPress={() => navigation.navigate('BrainScreen')}
      >
        <Image
          source={require('../assets/images/brain.png')} // Replace with the path to your first image
          style={styles.image}
        />
        <Text style={styles.buttonText}>Tumor mozga</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.square}
      onPress={() => navigation.navigate('BloodCellsScreen')}
      >
        <Image
          source={require('../assets/images/red-blood-cells.png')} // Replace with the path to your second image
          style={styles.image}
        />
        <Text style={styles.buttonText}>Krvna zrnca</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.square}>
        <Image
          source={require('../assets/images/rash.png')} // Replace with the path to your third image
          style={styles.image}
        />
        <Text style={styles.buttonText}>Kancer kože</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2e8cf',
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: '#3498db',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5, // Add elevation for the shadow effect on Android
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Menu;
