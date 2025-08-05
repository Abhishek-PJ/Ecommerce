import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HeroSection() {
  return (
    <div className="w-full my-4">
      <Carousel>
        <Carousel.Item>
          <Link to="/category/Mens">
            <img
              className="d-block w-full rounded-md"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-30052024-MainBanner-Z1-P1-5090.gif"
              alt="First slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/category/Womens">
            <img
              className="d-block w-full rounded-md"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-WHP-050624-DAILYBANNER-BU-Z5-P4-Aurelia-Fabindia-min40.jpg"
              alt="Second slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/category/Beauty">
            <img
              className="d-block w-full rounded-md"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-23062024-MainBannerDailyChanging-Z1-P7-Maybeline-Faces-Canada-Upto50.jpg"
              alt="Third slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/category/Mens">
            <img
              className="d-block w-full rounded-md"
              src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-05062024-topbanner-z2-p1-LEECOOPER-JOHNPLAYER-MIN50.jpg"
              alt="Fourth slide"
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroSection;
