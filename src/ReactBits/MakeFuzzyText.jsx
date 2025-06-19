import React, { Children } from "react";
import FuzzyText from "./FuzzyText";

const MakeFuzzyText = ({ children }) => {
  return (
    <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
      {children}
    </FuzzyText>
  );
};

export default MakeFuzzyText;
