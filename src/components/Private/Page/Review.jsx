import React, { useContext, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Rating } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";

const Review = () => {
  const [rated, setRated] = useState(4);
  const loaderData = useLoaderData();
  const { user } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    const split = e.postedDate.split("-");

    if (e.reviewText.length < 10) {
      return setErrorMsg2("Please write more than 10 words");
    } else {
      setErrorMsg2("");
    }

    if (
      parseFloat(split[0]) !== currentYear &&
      parseFloat(split[1]) !== month &&
      parseFloat(split[2] !== day)
    ) {
      return setErrorMsg("Please select the correct year date or month");
    } else {
      setErrorMsg("");
    }

    const aaaaaa = {
      id: loaderData._id,
      reviewText: e.reviewText,
      rating: rated + 0.5,
      userName: user.displayName,
      userPhoto: user.photoURL,
      postedDate: e.postedDate,
      email: user.email,
      serviceTitle: loaderData.title,
      serviceImage: loaderData.image,
    };

    axios
      .put(
        `https://service-web-server.vercel.app/singleService/${loaderData._id}/review`,
        aaaaaa
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Review added");
        }
      })
      .catch((error) => {
        return console.error("Error adding service:", error);
      });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border shadow-2xl mt-12 rounded-2xl w-1/2 mx-auto p-12 space-y-5"
    >
      <h4 className="text-2xl">Rate your recent experience</h4>

      <div className="flex items-center gap-2 font-bold text-blue-gray-500">
        {rated}.5
        <Rating value={4} onChange={(value) => setRated(value)} />
      </div>

      <h4 className="text-lg">Tell us more about your experience</h4>

      <Textarea
        {...register("reviewText")}
        disableAnimation
        minRows="8"
        required
        classNames={{
          base: "max-w-xs",
        }}
        placeholder="Write your service description"
        variant="bordered"
      />
      <p className="text-red-500">{errorMsg2}</p>
      <h4 className="text-2xl">Date of experience</h4>

      <div className="">
        <Input
          required
          {...register("postedDate")}
          aria-label="Date and time"
          type="date"
        />
        <p className="text-red-500">{errorMsg}</p>
      </div>
      <p>
        By submitting this review, you confirm it’s based on a genuine
        experience and you haven’t received an incentive to write it.
      </p>
      <Button type="submit" size="lg">
        Submit
      </Button>
    </form>
  );
};

export default Review;
