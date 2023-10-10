import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native'; // Import FlatList component
import Swiper from 'react-native-swiper';
import axios from 'axios';
import FooterNavigation from './FooterNavigation';
import { useNavigation } from '@react-navigation/native';


const MovieList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const [limitedMovies, setAllMovies] = useState([]);

  const apiKey = '5687eb97cfae2d5641269e1c0c74eefc';
  const navigation = useNavigation();

  useEffect(() => {
    getPopularMovies();
    getLatestMovies();
    getAllMovies();
  }, []);

  const getPopularMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          sort_by: 'popularity.desc',
          page: 1,
        },
      })
      .then((response) => {
        setPopularMovies(response.data.results);
        
      })
      .catch((error) => {
        console.error('Error fetching popular movies:', error);
      });
  };

  const getLatestMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          sort_by: 'release_date.desc',
          page: 1,
        },
      })
      .then((response) => {
        setLatestMovies(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching latest movies:', error);
      });
  };
  const getAllMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          page: 1,
          include_adult: false,
        },
      })
      .then((response) => {
        const limitedMovies = response.data.results;
        setAllMovies(limitedMovies);
      })
      .catch((error) => {
        console.error('Error fetching all movies:', error);
      });
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    navigation.navigate('Category', { category, limitedMovies });
  };
  const handleSingleVideoPage = (id) => {
    console.log(id);
    navigation.navigate('VideoCard', { id });
  }
  return (
    <View>


      <ScrollView >
        <View>
          <View>
          <Swiper style={{ height: 370 }} showsPagination={true} dotStyle={{ backgroundColor: 'gray', width: 10, height: 10 }} activeDotStyle={{ backgroundColor: '#ff4d4d', width: 20, height: 10 }}>
            {popularMovies.slice(0, 5).map((movie) => (
              <View key={movie.id} style={{ flex: 1 }}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                  style={{ flex: 1 }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </Swiper>
          </View>

        
            <Text style={styles.categoryText}>Categories</Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity style={selectedCategory === 'All' ? [styles.categoryButton, styles.selectedCategoryButton] : styles.categoryButton} onPress={() => handleCategoryClick('All')}>
                <Text style={selectedCategory === 'All' ? [styles.buttonText, styles.selectedButtonText] : styles.buttonText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={selectedCategory === 'Action' ? [styles.categoryButton, styles.selectedCategoryButton] : styles.categoryButton} onPress={() => handleCategoryClick('Action')}>
                <Text style={selectedCategory === 'Action' ? [styles.buttonText, styles.selectedButtonText] : styles.buttonText}>Action</Text>
              </TouchableOpacity>
              <TouchableOpacity style={selectedCategory === 'Comedy' ? [styles.categoryButton, styles.selectedCategoryButton] : styles.categoryButton} onPress={() => handleCategoryClick('Comedy')}>
                <Text style={selectedCategory === 'Comedy' ? [styles.buttonText, styles.selectedButtonText] : styles.buttonText}>Comedy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={selectedCategory === 'Romance' ? [styles.categoryButton, styles.selectedCategoryButton] : styles.categoryButton} onPress={() => handleCategoryClick('Romance')}>
                <Text style={selectedCategory === 'Romance' ? [styles.buttonText, styles.selectedButtonText] : styles.buttonText}>Romance</Text>
              </TouchableOpacity>
            </View>
        

          <View>
            <Text style={{ marginTop: 30, marginLeft: 5 }}>Most Popular</Text>
            <FlatList style={styles.PopularList}
              data={popularMovies}
              horizontal
              renderItem={({ item }) => (

                <View key={item.id}>
                  <TouchableOpacity onPress={() => handleSingleVideoPage(item.id)}>

                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                      style={{ width: 100, height: 150, marginRight: 10, borderRadius: 10 }}
                      resizeMode="cover"
                    />

                  </TouchableOpacity>
                </View>

              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <View>
            <Text style={{ marginTop: 30, marginLeft: 5 }}>Latest Movies</Text>
            <FlatList style={styles.LatestList}
              data={latestMovies.filter((movie) => movie.poster_path)} 
              horizontal
              renderItem={({ item }) => (
                <View key={item.id}>
                  <TouchableOpacity onPress={() => handleSingleVideoPage(item.id)}>
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                      style={{ width: 100, height: 150, marginRight: 10, borderRadius: 10 }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />

          </View>





          <View style={{ marginTop: 100 }}>

          </View>
        </View>


      </ScrollView>
      <FooterNavigation />
    </View>

  );
};

const styles = StyleSheet.create({
  categoryButton: {
    padding: 8,
    backgroundColor: '#004080', 
    borderRadius: 15,
    width: 80,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
  },
  PopularList: {
    marginTop: 10,
    marginLeft: 5
  },
  LatestList: {
    marginTop: 10,
    marginLeft: 5,

  },
  selectedCategoryButton: {
    backgroundColor: '#ff4d4d',
  },
  categoryText: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: -15
  }
});

export default MovieList;
