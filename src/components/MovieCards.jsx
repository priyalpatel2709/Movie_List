import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/MovieCard.css";
import ListGroup from 'react-bootstrap/ListGroup';

function MovieCard({ movies }) {

  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
    setWatchlist(savedWatchlist);
  }, []);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const addToWatchlist = (movie) => {
    if (!watchlist.find((item) => item.id === movie.id)) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    }
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };
  return (
    <div>
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="Search by movie name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Row
        xs={1}
        md={2}
        lg={4}
        className={`g-4 ${showModal ? "row-blur" : ""}`}
      >
        {filteredMovies.map((movie) => (
          <Col key={movie.id}>
            <Card>
              <div onClick={() => openModal(movie)}>
                <Card.Img
                  variant="top"
                  height="300px"
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                />
              </div>

              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item>Reating:-{movie.vote_average}/10</ListGroup.Item>
                  <ListGroup.Item>Release On:-{movie.release_date}</ListGroup.Item>
                </ListGroup>
                </Card.Text>
                {watchlist.find((item) => item.id === movie.id) ? (
                  <Button variant="danger"  onClick={() => removeFromWatchlist(movie.id)}>
                    Remove from Watchlist
                  </Button>
                ) : (
                  <Button onClick={() => addToWatchlist(movie)}>
                    Add to Watchlist
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={closeModal} centered>
        {selectedMovie && (
          <Modal.Body>
            <Card className="bg-dark text-white">
              <Card.Img
                src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                alt="Card image"
              />
              <Card.ImgOverlay>
                <Card.Title>{selectedMovie.original_title}</Card.Title>
                <Card.Text>{selectedMovie.overview}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Modal.Body>
        )}
      </Modal>
    </div>
  );
}

export default MovieCard;
