import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const MoviesCategorized = () => {
  const route = useRoute();
  const { category, limitedMovies } = route.params;
  const [filteredMovies, setFilteredMovies] = useState([]);

  const genreMapping = {
    Action: 28,
    Romance: 10749,
    Comedy: 35,
  };

  const filterMoviesByCategory = () => {
    if (!category || !limitedMovies || !genreMapping[category]) {
      // Check if the category is valid and genre ID exists in the mapping
      setFilteredMovies([]);
      return;
    }

    const genreId = genreMapping[category];
    const filtered = limitedMovies.filter((movie) => {
      return movie.genre_ids.includes(genreId);
    });
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    filterMoviesByCategory();
    console.log(limitedMovies.splice(0,1))
  }, [category, limitedMovies]);

  // Define the number of columns per row
  const numColumns = 3;

  // Helper function to group movies into rows
  const groupMoviesIntoRows = (movies, numColumns) => {
    const result = [];
    for (let i = 0; i < movies.length; i += numColumns) {
      result.push(movies.slice(i, i + numColumns));
    }
    return result;
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={groupMoviesIntoRows(filteredMovies, numColumns)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: row }) => (
          <View style={styles.rowContainer}>
            {row.map((movie) => (
              <Image
                key={movie.id}
                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                style={styles.moviePoster}
                resizeMode="cover"
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  moviePoster: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default MoviesCategorized;
