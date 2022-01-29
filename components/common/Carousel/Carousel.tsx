import React from 'react';

interface CarouselProps {
  img:string
}


function Carousel(props:CarouselProps) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='w-full relative select-none'>
        <div className='aspect-w-16'>

        </div>
      </div>

    </div>
  );
}



export default Carousel;
