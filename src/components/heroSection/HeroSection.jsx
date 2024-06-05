import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function HeroSection() {
  return (
    <div className="w-full my-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-full rounded-md"
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-30052024-MainBanner-Z1-P1-5090.gif"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-full rounded-md"
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-WHP-050624-DAILYBANNER-BU-Z5-P4-Aurelia-Fabindia-min40.jpg"
            
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-full rounded-md"
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-05062024-dailybannerbu-z5-p4-LOUISPHILIPPE-LEECOOPER-30-80.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-full rounded-md"
            src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-05062024-topbanner-z2-p1-LEECOOPER-JOHNPLAYER-MIN50.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroSection;
