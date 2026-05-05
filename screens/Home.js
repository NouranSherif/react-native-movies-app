import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { MoviesContext } from '../contexts/movies';
import { FlatList } from 'react-native-gesture-handler';
import MovieCard from '../components/MovieCard';
import Search from '../components/search';

const Home = () => {
  const { movies } = useContext(MoviesContext);
  const [query, setQuery] = useState('');
  const handleChange = val => {
    setQuery(val);
  };
  const filteredMovies = movies?.filter(mov =>
    mov.original_title.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <View style={styles.container}>
      <Search query={query} onChange={handleChange}></Search>
      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MovieCard data={item}></MovieCard>}
      ></FlatList>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', flex: 1, paddingHorizontal: 10 },
});
