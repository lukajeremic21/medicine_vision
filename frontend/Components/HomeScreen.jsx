// HomeScreen.js
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Menu"
        onPress={() => navigation.navigate('Menu')}
      />
    </View>
  );
};

export default HomeScreen;
