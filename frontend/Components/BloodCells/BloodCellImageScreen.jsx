import { View, StyleSheet, Image, Text } from 'react-native';

const BloodCellImageScreen = ({ route }) => {
  const { imageUri } = route.params;
  const { responseData } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
          <Text>
            {responseData}
          </Text>
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default BloodCellImageScreen;
