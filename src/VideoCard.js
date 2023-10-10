import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";

const VideoCard = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState({});
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    getMovieDetails(id);
    getVideo(id);
  }, [id]);

  const getMovieDetails = (movieId) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: '5687eb97cfae2d5641269e1c0c74eefc',
          language: 'en-US',
        },
      })
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  };

  const getVideo = (movieId) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        params: {
          api_key: '5687eb97cfae2d5641269e1c0c74eefc',
          language: 'en-US',
        },
      })
      .then((response) => {
        const videos = response.data.results;
        if (videos.length > 0) {
          const videoKey = videos[0].key;
          const videoUrl = getVideoUrl(videoKey);
          console.log(videoUrl)
          setTrailerUrl(videoUrl);
        } else {
          console.warn('No video trailers available for this movie.');
        }
      })
      .catch((error) => {
        console.error('Error fetching movie videos:', error);
      });
  };

  const formatReleaseDate = (date) => {
    const year = new Date(date).getFullYear();
    return year.toString();
  };

  const getVideoUrl = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

  const handlePlayClick = () => {
    if (trailerUrl) {
  
      Linking.openURL(trailerUrl).catch((error) => {
        console.error('Error opening URL:', error);
      });
    } else {
      console.warn('No video available for this movie.');
    }
  };

  return (
    <ScrollView>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={{ width: 380, height: 450, resizeMode: 'cover' }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{movie.original_title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.releaseDate}>
          {formatReleaseDate(movie.release_date)}
        </Text>
        <Text style={styles.genre}>
          . {movie.genres?.map((genre) => genre.name).join(', ')}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={handlePlayClick}
        >
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Favorite</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    color: '#000',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    color: '#000',
  },
  releaseDate: {
    fontSize: 14,
    marginVertical: 10,
    marginLeft: 20,
  },
  genre: {
    fontSize: 14,
    marginVertical: 10,
  },
  overview: {
    fontSize: 16,
    margin: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  infoContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 15,
    width: 110,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default VideoCard;
