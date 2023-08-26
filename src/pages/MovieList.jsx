import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCards";
import { fetchMovies } from "../srevices/srevice";
import Pagination from "react-bootstrap/Pagination";
import '../style/MovieList.css'

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1); 

  const handlePageClick = async (pageNumber) => {
    try {
      let result = await fetchMovies(pageNumber); 
      setMovieList(result);
      setActivePage(pageNumber);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const paginationItems = [];
  for (let number = 1; number <= 5; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePageClick(number)} 
      >
        {number}
      </Pagination.Item>
    );
  }

  const getData = async () => {
    try {
      let result = await fetchMovies(activePage); 
      setMovieList(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [activePage]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <MovieCard movies={movieList} />
      <div className="pagination-container">
        <Pagination className="mx-4 my-4" >{paginationItems}</Pagination>
      </div>
    </div>
  );
};

export default MovieList;
