import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      console.log("trying to get the movies");
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("calling the getMovies function, from useEffect");
    getMovies();
  }, []);

  console.log("trying to print the received movies");
  console.log(movies);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
