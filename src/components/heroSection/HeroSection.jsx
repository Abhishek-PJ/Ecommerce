// // const HeroSection = () => {
// //     return (
// //         <div>
// //            <img className=" h-44 lg:h-full" src="../img/hero1.png" alt="" />
// //         </div>
// //     );
// // }

// // export default HeroSection;


// // src/components/BannerCarousel.js
// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';

// const HeroSection = () => {
//     return (
//          <div className=' border-blue-500'>
//         <Carousel 
//             showThumbs={false} 
//             autoPlay 
//             infiniteLoop 
//             showStatus={false} 
//             interval={2000}
//             className=" w-56 max-w-4xl mx-auto"
//         >
//             <div className="relative">
//                 <img src="https://static.vecteezy.com/system/resources/previews/002/006/774/non_2x/paper-art-shopping-online-on-smartphone-and-new-buy-sale-promotion-backgroud-for-banner-market-ecommerce-free-vector.jpg"
//  alt="Banner 1" className="w-full h-auto" />
//                 <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg">Banner 1</p>
//             </div>
//             <div className="relative">
//                 <img  src="https://4.bp.blogspot.com/-j08zU37hpt4/W5aaDndpsWI/AAAAAAAAFoc/tq-c11-V1sgMDyFd5cB3Z6jsO2UICZiQgCK4BGAYYCw/s1600/CL-Banner.jpg"
//  alt="Banner 2" className="w-full h-auto" />
//                 <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg">Banner 2</p>
//             </div>
//             <div className="relative">
//                 <img src="https://via.placeholder.com/800x300?text=Banner+3" alt="Banner 3" className="w-full h-auto" />
//                 <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 text-lg">Banner 3</p>
//             </div>
//         </Carousel>
//         </div>
//     );
// }

// export default HeroSection;

import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';


function HeroSection() {
  return (
    <div className="w-full max-w-screen-lg mx-auto my-4">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/5/21/91b180cd-de53-4a07-8cd2-3e5b8d37efd41716229933950-Desktop-Banner.jpg"
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h5></h5>
            <p></p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/b656a7f4-4688-4997-bb7c-54b78793981e1658752386588-Western-Wear_Desk.jpg"
            alt="Second slide"
          />
          {/* <Carousel.Caption>
            <h5></h5>
            <p></p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://4.bp.blogspot.com/-j08zU37hpt4/W5aaDndpsWI/AAAAAAAAFoc/tq-c11-V1sgMDyFd5cB3Z6jsO2UICZiQgCK4BGAYYCw/s1600/CL-Banner.jpg"
            alt="Third slide"
          />
          {/* <Carousel.Caption>
            <h5></h5>
            <p></p>
          </Carousel.Caption> */}
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HeroSection;
