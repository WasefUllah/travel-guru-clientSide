import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import MakeFuzzyText from "../../ReactBits/MakeFuzzyText";
import BlurText from "../../ReactBits/BlurText";

const Banner = () => {
  return (
    <div className="my-4">
      <div className="carousel w-full">
        <div
          id="item1"
          className="carousel-item w-full bg-[url(https://i.ibb.co/Hpxtx0x1/banner1.jpg)] h-[520px] bg-cover bg-center rounded-2xl"
        >
          <div className="flex flex-col">
            <BlurText
              text="Explore the World"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete
              className="text-3xl md:text-6xl lg:text-8xl text-blue-700 font-bold mt-44 ml-5 md:ml-10 md:mt-40 lg:ml-20 lg:mt-40 "
            />
            
            <BlurText
              text="Discover New Places & Unforgettable Memories"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl md:text-3xl lg:text-4xl text-blue-400 font-bold mt-2 ml-5 md:ml-10 md:mt-4 lg:ml-20 lg:mt-3"
            />
          </div>
        </div>
        <div
          id="item1"
          className="carousel-item w-full bg-[url(https://i.ibb.co/ZzBgfwt3/banner2.jpg)] h-[520px] bg-cover bg-center rounded-2xl"
        >
          <div className="flex flex-col">
            <BlurText
              text="Journey Awaits"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-6xl lg:text-8xl text-blue-700  font-bold mt-44 ml-5 md:ml-10 md:mt-40 lg:ml-20 lg:mt-40 "
            />
            <BlurText
              text="Your Next Adventure Starts Here"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl md:text-3xl lg:text-4xl text-blue-400 font-bold mt-2 ml-5 md:ml-10 md:mt-4 lg:ml-20 lg:mt-3"
            />
          </div>
        </div>
        <div
          id="item1"
          className="carousel-item w-full bg-[url(https://i.ibb.co/gLk8s6KR/banner3.jpg)] h-[520px] bg-cover bg-center rounded-2xl"
        >
          <div className="flex flex-col">
            <BlurText
              text="WanderMore"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-6xl lg:text-8xl text-blue-700 font-bold mt-44 ml-5 md:ml-10 md:mt-40 lg:ml-20 lg:mt-40 "
            />
            <BlurText
              text="Go Further, Live Freely"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl md:text-3xl lg:text-4xl text-blue-400 font-bold mt-2 ml-5 md:ml-10 md:mt-4 lg:ml-20 lg:mt-3"
            />
          </div>
        </div>
        <div
          id="item1"
          className="carousel-item w-full bg-[url(https://i.ibb.co/sdYBkrwF/banner4.jpg)] h-[520px] bg-cover bg-center rounded-2xl"
        >
          <div className="flex flex-col">
            <BlurText
              text="LuxeVoyage"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-6xl lg:text-8xl text-blue-700 font-bold mt-44 ml-5 md:ml-10 md:mt-40 lg:ml-20 lg:mt-40 "
            />
            <BlurText
              text="Curated Escapes for the Elite Traveler"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-xl md:text-3xl lg:text-4xl text-blue-400 font-bold mt-2 ml-5 md:ml-10 md:mt-4 lg:ml-20 lg:mt-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
