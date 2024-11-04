import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, ListGroup, ListGroupItem } from "reactstrap";
import './booking.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    bookAt: '',
    guestSize: 1
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert('Please sign in');
      }

      const res = await fetch(`${BASE_URL}/booking `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(booking)
      });
      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      navigate('/thank-you');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <Form className="booking__form">
        <FormGroup>
          <input
            type="text"
            placeholder="Full Name"
            id="fullName"
            value={booking.fullName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="email"
            placeholder="Email"
            id="userEmail"
            value={booking.userEmail}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="number"
            placeholder="Phone Number"
            id="phone"
            value={booking.phone}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="date"
            id="bookAt"
            value={booking.bookAt}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <input
            type="number"
            id="guestSize"
            placeholder="Number of Guests"
            value={booking.guestSize}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </Form>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-content-center gap-1'>
              ${price} <i className="ri-close-line"></i> {booking.guestSize} person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
