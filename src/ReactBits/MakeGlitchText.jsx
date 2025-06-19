import React from "react";
import GlitchText from "./GlitchText";

const MakeGlitchText = ({ children }) => {
  return (
    <GlitchText
      speed={1}
      enableShadows={true}
      enableOnHover={true}
      //   className='custom-class'
    >
      {children}
    </GlitchText>
  );
};

export default MakeGlitchText;
