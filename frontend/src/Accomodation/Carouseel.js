import React from "react";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';
// import './App.css';
import Card from './Card.js'
import data from './Carouse_data.js'

function App() {
  return (
    <>
    <OwlCarousel 
            mouseDrag={false}
            loop={false}
            touchDrag={false}
            lazyLoad={true}
            items={1}
            slideBy={3}
            // center={true}
            nav={true}
            responsive={{
              992: {
                items: 3,
                slideBy:3
              },
              768: {
                items: 2,
                slideBy:2
              },
              540: {
                items: 1,
                slideBy:1
              },

            }}
            dots={false}
            autoplay={false}
            autoplayTimeout={5000}
            animateIn='fadeIn'
            autoplayHoverPause={false}
            
          >
            {data.map(d=>{
               return <Card key={d.id} img={d.img} info={d.info}/>

            })
                }
          </OwlCarousel>
          
          </>

  );
}

export default App;