import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { FavContext } from '../contexts/favourites';
import EmptyFav from '../components/EmptyFav';
import MovieCard from '../components/MovieCard';

const Favourites = () => {
  const { favourites } = useContext(FavContext);

  return (
    <FlatList
      contentContainerStyle={{ flex: 1 }}
      data={favourites}
      renderItem={({ item }) => <MovieCard data={item}></MovieCard>}
      keyExtractor={item => item.id}
      ListEmptyComponent={() => <EmptyFav></EmptyFav>}
    />
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
