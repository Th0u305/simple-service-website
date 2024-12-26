import React from "react";
import "./error.css";
import { NavLink, useNavigate } from "react-router-dom";
import errorPic from "../../assets/404.png";
import { Button } from "@nextui-org/button";

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col justify-center items-center h-[100vh] md:flex-row md:gap-0">
      <div
        className="error flex flex-col justify-center items-center text-center gap-8 md:text-left md:items-start 
                      p-5 md:p-0 md:w-[40%] lg:w-[45%] xl:w-[35%] 2xl:w-[25%]"
      >
        <h1 className="text-5xl font-semibold">Uh Ohh!</h1>
        <p className="text-xl">
          We couldn't find the page that you're looking for :(
        </p>
        <div className="cta">
          <Button size="lg" href="/" onPress={()=> navigate('/')} color="primary">Home</Button>
        </div>
      </div>
      <img
        src={errorPic}
        alt="home image"
        className="hero-img w-[80%] md:w-1/2 lg:w-[40%] xl:w-[30%]"
      />
    </section>
  );
};

export default ErrorPage;
