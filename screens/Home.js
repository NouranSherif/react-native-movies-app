import { StyleSheet, Text, View } from 'react-native';
import React, { use, useContext, useMemo, useState } from 'react';
import { MoviesContext } from '../contexts/movies';
import { FlatList } from 'react-native-gesture-handler';
import MovieCard from '../components/MovieCard';
import Search from '../components/search';
import { Dropdown } from 'react-native-element-dropdown';

const Home = () => {
  const { movies } = useContext(MoviesContext);
  const [query, setQuery] = useState('');
  const handleChange = val => {
    setQuery(val);
  };
  const [sort, setSort] = useState('');
  const sortData = [
    { label: 'Highest Rated', value: 'highest' },
    { label: 'Lowest Rated', value: 'lowest' },
  ];

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return movies
      .filter(mov => {
        return mov.title.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => {
        return sort === 'lowest'
          ? parseFloat(a.imdbRating) - parseFloat(b.imdbRating)
          : parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
      });
  }, [query, sort, movies]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flex: 2 }}>
          <Search query={query} onChange={handleChange}></Search>
        </View>
        <View style={styles.dropdownWrapper}>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            iconStyle={styles.iconStyle}
            data={sortData}
            labelField="label"
            valueField="value"
            value={sort}
            placeholder="Sort by"
            onChange={item => {
              setSort(item.value);
            }}
          />
        </View>
      </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  dropdownWrapper: {
    flex: 0.75,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  dropdown: {
    flex: 1,

    height: 50,
    padding: 10,
    backgroundColor: '#EEEEEE',
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
