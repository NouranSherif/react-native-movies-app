import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';

export const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch('https://fooapi.com/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data.data));
  }, []);
  return (
    <MoviesContext.Provider value={{ movies }}>
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;

const styles = StyleSheet.create({});
