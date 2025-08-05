import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const testimonials = [
  {
    name: "Kamal Nayan Upadhyay",
    image: "https://ecommerce-sk.vercel.app/img/kamal.png",
    quote: "I absolutely love the shirt! It's so comfortable and stylish. Shipping was super fast too!"
  },
  {
    name: "S Mishra",
    image: "https://www.devknus.com/img/gawri.png",
    quote: "The customer service is amazing! They helped me find the perfect dresses for my party."
  },
  {
    name: "Ganesh J",
    image: "https://firebasestorage.googleapis.com/v0/b/devknus-official-database.appspot.com/o/images%2FScreenshot%202023-07-07%20at%202.20.32%20PM-modified.png?alt=media&token=324ddd80-2b40-422c-9f1c-1c1fa34943fa",
    quote: "I've never seen such high-quality shoes for such affordable prices. I'm a customer for life!"
  },
  {
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80", // Placeholder image
    quote: "Your website is so easy to navigate and the checkout process was a breeze. I appreciate the attention to detail."
  },
  {
    name: "Krishna Patel",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80", // Placeholder image
    quote: "I'm so glad I found your store! Your products are unique and the prices are unbeatable. I'm telling all my friends about you."
  }
  
  
 
    // Add more testimonials here
  
];

const Testimonial = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">What Our Customers Say</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={2}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <img
                  alt={`Testimonial from ${testimonial.name}`}
                  src={testimonial.image}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-gray-500">Verified Buyer</p> 
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
