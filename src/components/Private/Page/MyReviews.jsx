import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  darkLayout,
  Image,
  Spinner,
  User,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
  const [service, setService] = useState([]);
  const [service2, setService2] = useState([]);
  const [service3, setService3] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [viewText, setViewText] = useState(false);
  const navigate = useNavigate();
  let index;

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/allService")
      .then((response) => {
        setService3(response.data);

        // Dog shit

        // const id = response.data
        //   .map((item) =>
        //     item?.reviews?.find((item2) => item2?.email === user?.email)
        //   )
        //   ?.filter(Boolean);

        // getting reviews data and filtering by email
        const resData = response.data.map((item) =>
          item.reviews.filter((item2) => item2.email === user.email)
        );

        // removing empty array
        const resData2 = resData.filter((item) => item.length > 0);
        setService2(resData2);

        // making all the array into one object
        setService(
          resData.filter((item) => item.length > 0).flatMap((array) => array)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setTimeout(function () {
      setLoading(false);
      setViewText(true);
    }, 2200);
  }, []);

  const deleteReview = async (data) => {
    const resData = service3.filter((item) => item._id === data.id)[0].reviews;

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
      resData.some((object, idx) => {
        if (
          object.rating == data?.rating &&
          object.reviewText === data?.reviewText
        ) {
          index = idx;
          return true;
        }
      });

      axios
        .put(`https://service-web-server.vercel.app/deleteReview/${data?.id}`, {index}, { withCredentials: true })
        .then((response) => {
          if (response.data?.modifiedCount > 0) {
            setService(
              service.filter(
                (item) =>
                  item.reviewText !== data.reviewText &&
                  item.rating !== data.rating &&
                  item.serviceTitle !== data.serviceTitle
              )
            );

            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
            setLoading(false);
            setViewText(true);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const updateReview = (data) => {
    const resData = service3.filter((item) => item._id === data.id)[0].reviews;

    // add the array of obj index into obj

    //   const flattened = service2.flatMap((array, arrayIndex) =>
    //     array.map((item) => ({
    //       ...item,
    //       arrayIndex, // Add the array index to each object
    //   }))
    // );

    // dog shit 2

    // const whatImDoing = (flattened.filter(item =>
    //     item.reviewText === data.reviewText &&
    //     item.rating === data.rating &&
    //     item.serviceTitle === data.serviceTitle)[0].arrayIndex);

    // getting each obj index
    resData.some((object, idx) => {
      if (
        object.rating == data?.rating &&
        object.reviewText === data?.reviewText
      ) {
        index = idx;
        return true;
      }
    });

    navigate(`/updateReview/${data?.id}/${index}`);
  };

  return (
    <div className="">
      <Helmet>
        <title>TrustWise | My Reviews</title>
      </Helmet>
      <h4 className="text-center text-2xl md:text-4xl mt-16">My reviews</h4>
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {service?.length > 0 ? (
          service?.map((item, index) => (
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
                  <h4 className="font-bold text-large">{item?.userName}</h4>
                  <p>Rating: {item?.rating}</p>
                  <p className="w-[90%] whitespace-nowrap overflow-hidden text-ellipsis">
                    Reviews: {item?.reviewText}
                  </p>
                  <div className="flex w-full justify-center items-center gap-5 mt-5 mb-5">
                    <Button color="danger" onPress={() => deleteReview(item)}>Delete</Button>
                    <Button color="primary" onPress={() => updateReview(item)}>Update</Button>
                  </div>
                </CardHeader>
                <hr />
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center mt-16 space-y-5">
            {loading && <Spinner className="col-span-full mt-12" size="lg" />}
            {viewText && (
              <h4 className="text-xl">
                You didn't write any reviews in services
              </h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
