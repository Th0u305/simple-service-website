import React from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/ContextProvider";

const About = () => {
  const { myRef } = useContext(AuthContext);
  return (
    <div className="space-y-8 mt-28 w-[85%] mx-auto" ref={myRef}>
      <Helmet>
        <title>EcoVenture | About</title>
      </Helmet>
      <div className="space-y-5 text-center">
        <h1 className=" text-3xl lg:text-5xl font-semibold">About Us</h1>
        <p className="text-base lg:text-lg">
        "We are a passionate team dedicated to delivering exceptional experiences. Our goal is to bring innovation, creativity, and customer satisfaction to every project we undertake."
        </p>
      </div>

      <div className="space-y-5 text-center">
        <h1 className="text-3xl lg:text-4xl">🌿 Our Mission</h1>
        <p className="text-base lg:text-lg">
        "Our mission is to create solutions that inspire and empower. We strive to simplify life’s challenges while promoting growth, trust, and excellence in everything we do."
        </p>
        <div className="space-y-5 text-center">
          <h1 className="text-3xl lg:text-4xl">🌏 Why Choose Us?</h1>
          <p>"Choosing us means choosing a partner who values quality, innovation, and customer success. We are committed to building long-term relationships with every project we take on."</p>
        </div>
      </div>
    </div>
  );
};

export default About;
