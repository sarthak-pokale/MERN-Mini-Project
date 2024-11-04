import React, { useEffect, useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Form, ListGroup, Row } from 'reactstrap';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import Newsletter from '../shared/Newsletter';
import '../styles/tour-details.css';
import calculateAvgRating from './../utils/avgRating';
import { BASE_URL } from './../utils/config';
import { AuthContext } from './../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const ReviewMsgRef = useRef('');
  const [userRating, setUserRating] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch tour data using useFetch
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !tour) {
    return <h2>Error fetching tour details or Tour not found</h2>;
  }

  const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = ReviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please sign in');
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: userRating, // Use userRating instead of tourRating
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok){
        return alert(result.message);
      }
      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={photo} alt={title} />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour_rating d-flex align-items-center gap-1">
                      <i className="ri-star-s-fill" style={{ color: 'var(--secondary-color)' }}></i>
                      {avgRating === 0 ? null : avgRating} ({reviews?.length})
                      {totalRating === 0 ? (
                        <span>Not rated</span>
                      ) : (
                        <span>({reviews?.length} reviews)</span>
                      )}
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i> {address}
                    </span>
                  </div>
                  <p>{desc}</p>
                  <h5>Price: ${price}</h5>
                  <h6>City: {city}</h6>
                  <h6>Distance: {distance} km</h6>
                  <h6>Max Group Size: {maxGroupSize}</h6>
                </div>

                <div className="tour__reviews mt-4">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-content-center gap-3 mb-4 rating__group">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} onClick={() => setUserRating(i + 1)}>
                          {i + 1}
                          <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>
                    <div className="review__input">
                      <input type="text" ref={ReviewMsgRef} placeholder="Share your thoughts" required />
                      <button className="btn primary__btn text-white" type="submit">
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__Reviews">
                    {reviews?.map((review, index) => (
                      <div className="review__item" key={index}>
                        <img src={avatar} alt="user avatar" />
                        <div className="w-100">
                          <div className="d-flex align-content-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating}<i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
