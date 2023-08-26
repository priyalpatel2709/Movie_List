import './App.css';
import { useEffect } from 'react';
import {getMovieData} from './srevices/srevice'
import MovieList from './pages/MovieList';
import Watchlist from './components/Watchlist';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import JustifiedExample from './components/Navbar';

function App() {
  
  return (
    <div className="App">
      <JustifiedExample/>
      <Routes>
      {/* <JustifiedExample/> */}
        <Route path='/' element={<MovieList/>}/>
        <Route path='/watchList' element={<Watchlist/>}/>
      </Routes>
    </div>
  );
}

export default App;
