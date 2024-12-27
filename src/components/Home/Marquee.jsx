import React from "react";
import Marquee from "react-fast-marquee";

const Marquee2 = () => (
  <div className="mt-16">
    <h4 className="text-center text-3xl mb-12">Meet Our Partners</h4>
    <Marquee gradient={true} gradientColor="#eee">
      <div className="flex items-center w-screen justify-around">
        <div>
          <img
            className="w-12 md:w-16 lg:w-20"
            src="https://i.ibb.co.com/2WvX8xk/picture-logo-42725.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-8 md:w-16 lg:w-20"
            src="https://i.ibb.co.com/ysfsyLZ/spotify-logo-png-7057.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-8 md:w-16 lg:w-20"
            src="https://i.ibb.co.com/b3hcYzd/starbucks-logo-png-1666.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-8 md:w-16 lg:w-20"
            src="https://i.ibb.co.com/F8k9cNr/twitter-x-logo-42562.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-8 md:w-16 lg:w-20"
            src="https://i.ibb.co.com/zmWh991/google-logo-9808.png"
            alt=""
          />
        </div>
        <div>
          <img
            className="w-8 md:w-16 lg:w-20"
            src="https://i.ibb.co.com/S6YYrgb/netflix-logo-png-2562.png"
            alt=""
          />
        </div>
      </div>
    </Marquee>
  </div>
);

export default Marquee2;
