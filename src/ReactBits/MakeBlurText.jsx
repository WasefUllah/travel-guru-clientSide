import React from "react";
import BlurText from "./BlurText";

const MakeBlurText = ({ text }) => {
  return (
    <BlurText
      text={text}
      delay={150}
      animateBy="words"
      direction="top"
      // className="text-primary text-xl md:text-3xl lg:text-5xl font-bold my-4"
    />
  );
};

export default MakeBlurText;