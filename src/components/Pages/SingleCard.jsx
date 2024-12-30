import {
  Card,
  CardHeader,
  CardBody,
  Image,
  User,
  Button,
} from "@nextui-org/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Rating } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function App() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const [rated, setRated] = React.useState(4);

  const handleChange = () => {
    if (loaderData?.myService) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot add reviews to your own service",
      });
      return;
    }
    navigate(`review`);
  };

  return (
    <Card className="w-fit mx-auto p-12 mt-12">
      <div className="">
        <CardBody className="overflow-visible p-0 ">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={loaderData?.image}
          />
        </CardBody>
        <CardHeader className="px-0 gap-3 flex-col items-start">
          <h4 className="font-semibold text-large">{loaderData?.title}</h4>
          <p className="">Category: {loaderData?.category}</p>
          <p className="">Category: {loaderData?.company}</p>
          <p className="">Website: {loaderData?.website}</p>
          <p className="">Added Date: {loaderData?.addedDate}</p>
          <p className="">Price: {loaderData?.price}</p>
          <div className="flex items-center gap-2 font-bold text-blue-gray-500">
            {rated}.5
            <Rating value={4} onChange={(value) => setRated(value)} />
          </div>
          <p className="break-all break-words max-w-xl">
            Description: {loaderData?.description}
          </p>
        </CardHeader>
      </div>
      <h4 className="text-3xl text-center mt-5 mb-5">Reviews: ({loaderData?.reviews?.length})</h4>
      <hr />
      {loaderData?.reviews?.length > 0 ? (
        loaderData?.reviews?.map((item, index) => (
          <div key={index} className="py-3">
            <CardHeader className="flex-col items-start px-0">
              <User
                avatarProps={{
                  src: `${item?.userPhoto}`,
                }}
                name={item?.userName}
              />
            </CardHeader>
            <p className="">Post Date: {item?.postedDate}</p>
            <p className="">Rating: {item?.rating}</p>
            <p className="break-all break-words max-w-xl">
              Review: {item?.reviewText}
            </p>
            <CardBody className="overflow-visible py-2"></CardBody>
            <hr />
          </div>
        ))
      ) : (
        <div className="col-span-2 mx-auto mt-12">
          <h4>No review available for this service</h4>
        </div>
      )}
      <div className="col-span-2 mx-auto mt-12">
        <Button onPress={() => handleChange()} size="lg">
          Write a review
        </Button>
      </div>
    </Card>
  );
}
