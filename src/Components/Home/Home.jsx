import React from "react";
import Banner from "../Banner/Banner";
import PopularDestinations from "../PopularDestinations/PopularDestinations";
import PopularPackages from "../PopularPackages/PopularPackages";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularDestinations></PopularDestinations>
      <PopularPackages></PopularPackages>
    </div>
  );
};

export default Home;
