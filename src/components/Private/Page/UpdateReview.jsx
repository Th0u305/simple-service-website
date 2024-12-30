import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button, user, Spinner } from "@nextui-org/react";
import axios from "axios";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import { Rating } from "@material-tailwind/react";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateReview = () => {
  const { user } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const [rated, setRated] = useState(4);
  const [service, setService] = useState([]);
  const { pathname } = useLocation();
  const [index, setIndex] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/allService")
      .then((response) => {
        setService(
          response.data.filter((item) => item._id === pathname.split("/")[2])
        );
      });
    setIndex(parseFloat(pathname.split("/")[3]));
  }, [pathname]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();  

  const onSubmit = (formData) => {    
    
    const split = formData.postedDate.split("-");

    if (
      parseFloat(split[0]) !== currentYear &&
      parseFloat(split[1]) !== month &&
      parseFloat(split[2] !== day)
    ) {
      return setErrorMsg("Please select the correct year date or month");
    } else {
      setErrorMsg("");
    }

    if (formData.reviewText.length === 0) {
      setErrorMsg2("");
    } else if (formData.reviewText.length < 10) {
      return setErrorMsg2("Please write more than 10 words");
    }
    setErrorMsg2("")

    const aaaaaa = {
      reviewText: formData.reviewText,
      rating: rated + 0.5,
      postedDate: formData.postedDate,
    };

    const filterEmptyFields = Object.fromEntries(
      Object.entries(aaaaaa).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );    

    axios
      .put(`https://service-web-server.vercel.app/updateReviews/${pathname.split("/")[2]}`)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          toast.success("Successfully updated review");
        }
      })
      .catch((error) => console.error("Error:", error));
      reset();
  };

  return (
    <div className="border-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border shadow-2xl mt-12 rounded-2xl w-1/2 mx-auto "
      >
        <div className="max-w-xs mx-auto mt-12 mb-12 space-y-5">
          <h4 className="text-2xl">Update your review</h4>

          <div className="flex items-center gap-2 font-bold text-blue-gray-500">
            {rated}.5
            <Rating value={4} onChange={(value) => setRated(value)} />
          </div>

          <h4 className="text-lg">Tell us more about your experience</h4>

          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Service
            </label>
            <Input
              disabled
              className=""
              label={service[0]?.title}
              variant="bordered"
              readOnly
            />
          </div>

          <Textarea
            {...register("reviewText")}
            disableAnimation
            minRows="8"
            placeholder="Write your service description"
            variant="bordered"
            required
          />
          <p className="text-red-500">{errorMsg2}</p>
          <h4 className="text-2xl">Date of experience</h4>

          <div className="">
            <Input
              {...register("postedDate")}
              aria-label="Date and time"
              type="date"
              required
            />
            <p className="text-red-500">{errorMsg}</p>
          </div>
          <p>
            By submitting this review, you confirm it’s based on a genuine
            experience and you haven’t received an incentive to write it.
          </p>
          <Button type="submit" size="lg">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateReview;
