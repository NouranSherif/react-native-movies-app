import * as React from 'react';
import { Text, View } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Favourites from './screens/Favourites';
import MoviesProvider from './contexts/movies';
import FavProvider from './contexts/favourites';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: Home,
    Favourites: Favourites,
  },
  screenOptions: {
    headerTintColor: '#000',

    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },

    drawerStyle: {
      backgroundColor: '#ffffff',
      width: 240,
    },

    drawerActiveTintColor: '#000',
    drawerInactiveTintColor: '#888',
    drawerActiveBackgroundColor: '#f5f5f5',
    drawerLabelStyle: {
      fontSize: 16,
      fontWeight: '500',
    },
  },
});
const Navigation = createStaticNavigation(MyDrawer);

export default function App() {
  return (
    <MoviesProvider>
      <FavProvider>
        <Navigation />
      </FavProvider>
    </MoviesProvider>
  );
}
