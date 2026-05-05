import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { FavContext } from '../contexts/favourites';

const MovieCard = ({ data }) => {
  const { isFavourite, toggleFavourite } = useContext(FavContext);
  const isFav = isFavourite(data.id);
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.favBtn}
        onPress={() => {
          toggleFavourite(data);
        }}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isFav ? 'heart' : 'heart-outline'}
          size={24}
          color={isFav ? '#000' : '#000'}
        />
      </TouchableOpacity>

      <Image
        source={{ uri: data.poster_path }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.original_title}</Text>
        <Text style={styles.date}>{data.release_date}</Text>
        <Text numberOfLines={2} style={styles.overview}>
          {data.overview}
        </Text>
      </View>
    </View>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 12,
    marginHorizontal: 20,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  favBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  poster: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  overview: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
