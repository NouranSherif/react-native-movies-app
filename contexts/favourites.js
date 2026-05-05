import { StyleSheet } from 'react-native';
import React, { useState, createContext } from 'react';

export const FavContext = createContext();

const FavProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = movie => {
    const isExist = favourites.find(m => m.id === movie.id);

    if (isExist) {
      setFavourites(prev => prev.filter(m => m.id !== movie.id));
    } else {
      setFavourites(prev => [...prev, movie]);
    }
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
