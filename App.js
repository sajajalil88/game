
import { StyleSheet, Text, View } from 'react-native';
import MovieList from './src/MovieList';
import MoviesCategorized from './src/MoviesCategorized';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VideoCard from './src/VideoCard';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen name="MovieList" component={MovieList} options={{ headerShown: false }} />
        <Stack.Screen
          name="Category"
          component={MoviesCategorized}
          options={({ route }) => ({
            title: route.params.category, 
            headerBackTitle: ' ',
          })}
        />
        <Stack.Screen name='VideoCard' component={VideoCard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
