import React from "react";
import Banner from "../Banner/Banner";
import PopularDestinations from "../PopularDestinations/PopularDestinations";
import PopularPackages from "../PopularPackages/PopularPackages";
import FAQ from "../FAQ/FAQ";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularDestinations></PopularDestinations>
      <PopularPackages></PopularPackages>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
