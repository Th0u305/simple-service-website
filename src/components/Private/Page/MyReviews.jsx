import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  User,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const [service, setService] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  let index;

  useEffect(() => {
    axios
      .get("http://localhost:5000/allService")
      .then((response) => {
        const ppppp = response.data.map((item) =>
          item.reviews.filter((item2) => item2.email === user.email)
        );
        setService(ppppp.filter((item) => item.length > 0));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [service]);

  const deleteReview = async (data, id2) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      service[0].some((object, idx) => {
        if (
          object.rating === data.rating &&
          object.reviewText === data.reviewText
        ) {
          index = idx;
          return true;
        }
      });
      axios
        .put(`https://service-web-server.vercel.app/deleteReview/${data.id}`, {
          index,
        })
        .then((response) => {
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
        })
        .catch((error) => console.error("Error:", error));
      // location.reload();
    }
  };

  const updateReview = (data, id2) => {
    id2.some((object, idx) => {
      if (
        object.rating === data.rating &&
        object.reviewText === data.reviewText
      ) {
        index = idx;
        return true;
      }
    });
    navigate(`/updateReview/${data.id}/${index}`);
  };

  return (
    <div className="">
      <Helmet>
        <title>TrustWise | My Reviews</title>
      </Helmet>
      <h4 className="text-center text-2xl md:text-4xl mt-16">My reviews</h4>
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {service[0]?.length > 0 ? (
          service[0]?.map((item, index) => (
            <Card key={index} className="p-5 mt-12 ">
              <div className="col-span-2 mx-auto">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                  <h4 className="font-bold text-large">{item?.serviceTitle}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={item?.serviceImage}
                    width={270}
                  />
                </CardBody>
              </div>

              <hr />

              <div>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{item.userName}</h4>
                  <p>Rating: {item.rating}</p>
                  <p className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis">
                    Description: {item.reviewText}
                  </p>
                  <div className="flex w-full justify-center items-center gap-5 mt-5 mb-5">
                    <Button onPress={() => deleteReview(item)}>Delete</Button>
                    <Button onPress={() => updateReview(item)}>Update</Button>
                  </div>
                </CardHeader>
                <hr />
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center mt-16 space-y-5">
            <h4 className="text-xl md:text-3xl">No review available </h4>
            <p className="text-lg">Add some reviews in services</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
