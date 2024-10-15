import home from '../assets/icons/Bold/home.png';
// import signUpCar from "@/assets/images/signup-car.png";
import bookmark from '../assets/icons/Bold/bookmark.png';
import search from '../assets/icons/Bold/search.png';
import profile from '../assets/icons/Bold/profile.png';
import plus from '../assets/icons/Bold/plus.png';
import AVENGERS from '../assets/images/AVENGERS.png';
import BLACKFRIDAY from '../assets/images/BLACKFRIDAY.png';
import GODFATHER from '../assets/images/GODFATHER.png';
import HAWKEYE from '../assets/images/HAWKEYE.png';
import SPIDERHEAD from '../assets/images/SPIDERHEAD.png';
import STRANGER from '../assets/images/STRANGER.jpeg';
import THOR from '../assets/images/THOR.png';
import FRAME from '../assets/images/FRAME.png';
import {Movie} from '../components/MovieList';

export const icons = {
  bookmark,
  home,
  plus,
  profile,
  //   leftArrow,
  //   menu,
  search,
  //   upload,
  //   rightArrow,
  // logout,
  //   eyeHide,
  //   eye,
};

export const images = {
  AVENGERS,
  BLACKFRIDAY,
  GODFATHER,
  HAWKEYE,
  SPIDERHEAD,
  STRANGER,
  THOR,
  FRAME,
};

export const WISHLISTMOVIES: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    poster:
      'https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.2,
  },
  {
    id: 2,
    title: 'The Godfather',
    poster:
      'https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.2,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster:
      'https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.0,
  },
  {
    id: 4,
    title: '12 Angry Men',
    poster:
      'https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.0,
  },
  {
    id: 5,
    title: "Schindler's List",
    poster:
      'https://images.unsplash.com/photo-1658999167159-3f6659cace61?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 8.9,
  },
];

export const MOVIESLIST: Movie[] = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    poster:
      'https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.2,
  },
  {
    id: 2,
    title: 'The Godfather',
    poster:
      'https://images.unsplash.com/photo-1547481887-a26e2cacb5b2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.2,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    poster:
      'https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.0,
  },
  {
    id: 4,
    title: '12 Angry Men',
    poster:
      'https://images.unsplash.com/photo-1611787640592-ebf78080d96e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 9.0,
  },
  {
    id: 5,
    title: "Schindler's List",
    poster:
      'https://images.unsplash.com/photo-1658999167159-3f6659cace61?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    rating: 8.9,
  },
];

export const MOVIES = {
  marvelMovies: [
    {
      id: 1,
      title: 'Avengers',
      poster: images.AVENGERS,
      rating: 8.2,
    },
    {
      id: 2,
      title: 'SpiderHead',
      poster: images.FRAME,
      rating: 8.2,
    },
    {
      id: 4,
      title: 'Hawkeye',
      poster: images.HAWKEYE,
      rating: 7.9,
    },
    {
      id: 5,
      title: 'Thor',
      poster: images.THOR,
      rating: 7.9,
    },
  ],
  bestMovies: [
    {
      id: 1,
      title: 'Stranger Things',
      poster: images.STRANGER,
      rating: 9.2,
    },
    {
      id: 2,
      title: 'The Godfather',
      poster: images.GODFATHER,
      rating: 9.2,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster: images.THOR,
      rating: 9.0,
    },
    {
      id: 4,
      title: '12 Angry Men',
      poster: images.SPIDERHEAD,
      rating: 9.0,
    },
  ],
  similarMovies: [
    {
      id: 1,
      title: 'Stranger Things',
      poster: images.STRANGER,
      rating: 9.2,
    },
    {
      id: 2,
      title: 'The Godfather',
      poster: images.GODFATHER,
      rating: 9.2,
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster: images.THOR,
      rating: 9.0,
    },
    {
      id: 4,
      title: '12 Angry Men',
      poster: images.SPIDERHEAD,
      rating: 9.0,
    },
  ],
};
