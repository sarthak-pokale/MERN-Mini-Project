import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import aboutImg from './../assets/images/tour-img01.jpg';
import './../styles/about.css';
import Subtitle from '../shared/Subtitle';
import Newsletter from '../shared/Newsletter';

const About = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {/* ============ About section start =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="about__img">
                <img src={aboutImg} alt="About Us" className="w-100" />
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="about__content">
                <Subtitle subtitle={'About Us'} />
                <h2>We are passionate about providing the best travel experiences</h2>
                <p>
                Ensuring every journey is personalized and memorable. 
                With a deep understanding of the travel industry and a commitment to excellence, 
                we guide our clients to explore the world with ease and confidence.
                </p>

                {showMore && (
                  <p>
                    Our team takes care of every detail, from crafting itineraries to offering expert advice, so you can focus on enjoying every moment. 
                    Whether you're seeking adventure, relaxation, or cultural discovery, we are here to make your dream trip a reality.
                  </p>
                )}

                <Button className="orange-button" onClick={toggleReadMore}>
                  {showMore ? 'Show Less' : 'Read More'}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ============ About section end =========== */}

      {/* ============ Newsletter section start =========== */}
      <Newsletter />
      {/* ============ Newsletter section end =========== */}
    </>
  );
};

export default About;
