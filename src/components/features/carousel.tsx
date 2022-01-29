import React from "react";
import MultiCaroulsel from "react-multi-carousel";
import Image from "next/image";

interface CarouselProps {
  className?: string;
  settings?: number;
  [key: string]: any;
}

const Carousel: React.FC<CarouselProps> = ({ children, settings }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: settings == 6 ? settings : 7,
      slidesToSlide: 3,
    },
    desktop2: {
      breakpoint: { max: 1599, min: 1440 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1439, min: 992 },
      items: 4,
      slidesToSlide: 2,
    },
    middle: {
      breakpoint: { max: 991, min: 768 },
      items: 3,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 480 },
      items: 2,
      slidesToSlide: 2
    },
    min: {
      breakpoint: { max: 479, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const LeftArrow = (props) => {
    return (
      <div
        className="w-70 h-10 absolute left-0 h-full carousel-nav" style={{ paddingBottom: '8px' }}
        onClick={props.onClick}
      >
        <div className="px-10 bg-gradient-to-l from-transparent to-primary h-full flex items-center">
          <div style={{ transform: 'rotate(180deg)' }}><Image src={`/images/rightArrow.svg`} width={23} height={40} /></div>
        </div>
      </div>
    );
  };

  const RightArrow = (props) => {
    return (
      <div
        className="w-70 h-10 absolute right-0 h-full carousel-nav"
        onClick={props.onClick}
      >
        <div className="px-10 bg-gradient-to-r from-transparent to-primary h-full flex items-center">
          <Image src={`/images/rightArrow.svg`} width={23} height={40} />
        </div>
      </div>
    );
  };

  return (
    <MultiCaroulsel
      responsive={responsive}
      customLeftArrow={<LeftArrow />}
      customRightArrow={<RightArrow />}
      className="custom-carousel"
      ssr
      infinite={false}
    >
      {children}
    </MultiCaroulsel>
  );
};

export default Carousel;
