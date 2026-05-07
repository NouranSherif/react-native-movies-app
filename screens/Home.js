import { StyleSheet, Text, View } from 'react-native';
import React, { use, useContext, useMemo, useState } from 'react';
import { MoviesContext } from '../contexts/movies';
import { FlatList } from 'react-native-gesture-handler';
import MovieCard from '../components/MovieCard';
import Search from '../components/search';
import { Picker } from '@react-native-picker/picker';

const Home = () => {
  const { movies } = useContext(MoviesContext);
  const [query, setQuery] = useState('');
  const handleChange = val => {
    setQuery(val);
  };
  const [sort, setSort] = useState('latest');

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return movies
      .filter(mov => {
        return mov.title.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => {
        const parseDate = dateStr => {
          const [day, month, year] = dateStr.split('-');
          return new Date(year, month - 1, day);
        };
        return sort === 'oldest'
          ? parseDate(a.released) - parseDate(b.released)
          : parseDate(b.released) - parseDate(a.released);
      });
  }, [query, sort, movies]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flex: 2 }}>
          <Search query={query} onChange={handleChange}></Search>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={sort}
            onValueChange={itemValue => setSort(itemValue)}
            mode="dropdown"
            dropdownIconColor="#666"
            style={styles.pickerInternal}
          >
            <Picker.Item
              label="Latest"
              value="latest"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Oldest"
              value="oldest"
              style={styles.pickerItem}
            />
          </Picker>
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
  pickerWrapper: {
    flex: 0.75,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pickerInternal: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    width: '110%',
    marginLeft: -5,
  },
  pickerItem: {
    fontSize: 14,
    color: '#333',
  },
});
