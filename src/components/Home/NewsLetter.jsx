import { Button, Input } from "@nextui-org/react";
import React from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const onNews = (e) =>{
    e.preventDefault()
    const news = e.target.news.value
    
    if (news) {
      toast.success("Thank you for subscribing to out news letter")
      e.target.reset()
    }
    
  }
  return (
    <div className="flex flex-col justify-center items-center mt-24 bg-white h-36 rounded-2xl">
      <h4 className="text-xl sm:text-2xl lg:text-3xl">
        Subscribe to our news letter
      </h4>
      <form onSubmit={(e) => onNews(e)} className="flex flex-row justify-center items-center w-80 sm:w-96 md:w-[30rem] mt-5 gap-3">
        <Input type="email" name="news" isRequired isClearable  className="border-2 border-blue-500 rounded-lg" />
        <Button
          size="lg"
          type="submit"
          color="primary"
          variant="flat"
          className="bg-[#000000d8] text-white text-base"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
};

export default NewsLetter;
