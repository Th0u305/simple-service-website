import React from "react";
import Marquee from "react-fast-marquee";

const Marquee2 = () => (
  <Marquee gradient={true} gradientColor="#eee">
    <div className="flex w-screen justify-around">
      <img
        className="w-16 md:w-16 lg:w-32 object-contain"
        src="https://i.ibb.co.com/2WvX8xk/picture-logo-42725.png"
        alt=""
      />
      <img
        className="w-10 md:w-16 object-contain"
        src="https://i.ibb.co.com/ysfsyLZ/spotify-logo-png-7057.png"
        alt=""
      />
      <img
        className="w-10 md:w-16 object-contain"
        src="https://i.ibb.co.com/b3hcYzd/starbucks-logo-png-1666.png"
        alt=""
      />
      <img
        className="w-8 md:w-16 object-contain"
        src="https://i.ibb.co.com/F8k9cNr/twitter-x-logo-42562.png"
        alt=""
      />
      <img
        className="w-10 md:w-16 object-contain"
        src="https://i.ibb.co.com/zmWh991/google-logo-9808.png"
        alt=""
      />
      <img
        className="w-10 md:w-16 object-contain"
        src="https://i.ibb.co.com/S6YYrgb/netflix-logo-png-2562.png"
        alt=""
      />
    </div>
  </Marquee>
);

export default Marquee2;
