import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";

function Watchlist({ onRemove }) {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedWatchlist);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div>
      <h2>Watchlist</h2>
      <Row xs={1} md={2} lg={4} className={`g-4 ${showModal ? "row-blur" : ""}`}>
        {watchlist.map((movie) => (
          <Col>
            <Card
              key={movie.id}
              style={{ width: "18rem", marginBottom: "10px" }}
            >
              <Card.Img
              onClick={() => openModal(movie)}
                variant="top"
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.original_title}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Reating:-{movie.vote_average}/10
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Release On:-{movie.release_date}
                  </ListGroup.Item>
                </ListGroup>
                <Button
                  variant="danger"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove
                </Button>
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
      {watchlist.length === 0 && <p>Your watchlist is empty.</p>}
    </div>
  );
}

export default Watchlist;
