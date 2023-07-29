import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../Components/HomeScreen';
import Menu from '../Components/Menu';
import BrainScreen from '../Components/Brain/BrainScreen'
import ImageScreen from '../Components/Brain/ImageScreen'
import BloodCellsScreen from '../Components/BloodCells/BloodCellsScreen'
import BloodCellImageScreen from '../Components/BloodCells/BloodCellImageScreen'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="BrainScreen" component={BrainScreen} />
        <Stack.Screen name="ImageScreen" component={ImageScreen} />
        <Stack.Screen name="BloodCellsScreen" component={BloodCellsScreen} />
        <Stack.Screen name="BloodCellImageScreen" component={BloodCellImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;