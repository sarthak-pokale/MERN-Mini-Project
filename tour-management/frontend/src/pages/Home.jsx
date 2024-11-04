import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import experienceImg from '../assets/images/experience.png';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import Subtitle from '../shared/Subtitle';
import '../styles/home.css';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import ServiceList from '../services/ServiceList';
import Newsletter from '../shared/Newsletter';
import SearchBar from '../shared/SearchBar';
import Testimonials from '../components/Testimonial/Testimonials';

const Home = () => {
  return (
    <>
      {/* ============ hero section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Know Before You Go'} />
                  <img src={worldImg} alt="world" />
                </div>
                <h1>
                  Travelling opens the door to creating{' '}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                Traveling unlocks the opportunity to create unforgettable experiences. 
                Whether it's discovering new cultures, meeting incredible people, or witnessing breathtaking landscapes, every journey leaves a lasting impact.  
                Embrace the unknown, cherish the moments, and let the world become your classroom
                </p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box">
                <img src={heroImg} alt="hero" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} controls />
              </div>
            </Col>
            <Col lg='2'>
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="hero-02" />
              </div>
            </Col>

            {/* Moved SearchBar inside Col */}
            <Col lg='12'>
              <SearchBar />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ hero section end =========== */}

      <section>
        <Container>
          <Row>
            <Col lg='3'>
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ============ featured tour section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg='12' className="mb-5">
              <Subtitle subtitle={'Explore'} />
              <h2 className="featured__tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ============ featured tour section end =========== */}

      {/* ============ experience section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="experience_content">
                <Subtitle subtitle={'Experience'} />
                <h2>
                  With all our experience <br /> we will serve you
                </h2>
                <p>
                With our expertise, we create seamless and memorable travel experiences. 
                From start to finish, we ensure every detail is handled so you can focus on enjoying your journey.
                  <br />
                  Your satisfaction is our priority, every step of the way.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients </h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years Experience </h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>  
            </Col> 
          </Row>
        </Container>
      </section>
      {/* ============ experience section end =========== */}

      {/* ============ gallery section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Gallery'} />
              <h2 className="gallery__title">Visit our customers tour gallery</h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ gallery section end =========== */}
      {/* ============ testimonal section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <Subtitle subtitle={'Fans Love'} />
              <h2 className='testimonial__title'>What are fans say about us</h2>
            </Col>
            <Col lg='12'>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ testimonal section end =========== */}

      <Newsletter />

    </>
  );
};

export default Home;
