import { StyleSheet } from 'react-native';
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavContext = createContext();

const FavProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user_favs').then(data => {
      if (data) setFavourites(JSON.parse(data));
    });
  }, []);

  const toggleFavourite = async movie => {
    const isExist = favourites.find(m => m.id === movie.id);
    let updatedFavs;
    if (isExist) {
      updatedFavs = favourites.filter(m => m.id !== movie.id);
    } else {
      updatedFavs = [...favourites, movie];
    }
    setFavourites(updatedFavs);
    await AsyncStorage.setItem('user_favs', JSON.stringify(updatedFavs));
  };
  const isFavourite = movieId => {
    return favourites.some(item => item.id === movieId);
  };

  return (
    <FavContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavContext.Provider>
  );
};

export default FavProvider;
