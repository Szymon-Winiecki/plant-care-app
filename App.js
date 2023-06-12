import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { dbManagement } from './database/database';

import HomePage from './pages/HomePage';
import IndexPage from './pages/IndexPage';
import AlterPage from './pages/AlterPage';
import DetailsPage from './pages/DetailsPage';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const App = () => {


  useEffect(() => {
    dbManagement.init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Strona Główna'}}
        />
        <Stack.Screen
          name="Index"
          component={IndexPage}
          options={{title: 'Lista roślin'}}
        />
        <Stack.Screen
          name="AddPlant"
          component={AlterPage}
          options={{title: 'Dodaj roślinę'}}
        />
        <Stack.Screen
          name="EditPlant"
          component={AlterPage}
          options={{title: 'Edytuj roślinę'}}
        />
        <Stack.Screen
          name="Details"
          component={DetailsPage}
          options={{title: 'Edytuj roślinę'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
