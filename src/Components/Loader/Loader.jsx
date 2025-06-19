import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <span className="loading loading-infinity h-screen loading-xl w-1/6"></span>
      </div>
    </div>
  );
};

export default Loader;
