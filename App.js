import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { dbManagement, plantsCRUD } from './database/database';
import { initFileSystem } from './filesystem/filesystem';

import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import AlterPage from './pages/AlterPage';
import DetailsPage from './pages/DetailsPage';
import AnimationPage from './pages/AnimationPage';
import { useEffect } from 'react';


const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    initFileSystem();
    dbManagement.init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Animation"
          component={AnimationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Strona Główna', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Index"
          component={IndexPage}
          options={{ title: 'Lista roślin' }}
        />
        <Stack.Screen
          name="AddPlant"
          component={AlterPage}
          options={{ title: 'Dodaj roślinę' }}
        />
        <Stack.Screen
          name="EditPlant"
          component={AlterPage}
          options={{ title: 'Edytuj roślinę' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsPage}
          options={{ title: 'Edytuj roślinę' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
