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
import { Rating } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
  const [service, setService] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  let index;

  useEffect(() => {
    axios
      .get("http://localhost:5000/allService")
      .then((response) => {
        setService(
          response.data.filter(
            (item) => item.myService === true && item.email === user.email
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const deleteReview = async (data, id2) => {
    
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to enter your password.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });

      id2.some((object, idx) => {
        if (
          object.rating === data.rating &&
          object.reviewText === data.reviewText
        ) {
          index = idx;
          return true;
        }
      });

      axios
        .put(`http://localhost:5000/deleteReview/${data.id}`, { index })
        .then((response) => console.log("Success:", response.data))
        .catch((error) => console.error("Error:", error));

        // location.reload();

    }
  };


  const updateReview =(data, id2)=>{

    id2.some((object, idx) => {
      if (
        object.rating === data.rating &&
        object.reviewText === data.reviewText
      ) {
        index = idx;
        return true;
      }
    });
    navigate(`/updateReview/${data.id}/${index}`)
  }

  return (
    <div className="grid grid-cols-2 grid-rows-1">
      {service.map((item, index) => (
        <Card key={index} className="p-5 w-fit mt-12 ">
          <div className="col-span-2 mx-auto">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">{item?.title}</h4>
              <p className="">category: {item.category}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item?.image}
                width={270}
              />
            </CardBody>
          </div>

          <hr />
          <h4 className="col-span-2 text-center text-xl mt-5 mb-5">
            My reviews
          </h4>
          {item.reviews.length > 0 ? (
            item.reviews.map((item2, index) => (
              <div key={index}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">{item2.userName}</h4>
                  <p>Rating: {item2.rating}</p>
                  <p className="max-w-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    Description: {item2.reviewText}
                  </p>
                  <div className="flex w-full justify-center items-center gap-5 mt-5 mb-5">
                  <Button onPress={() => deleteReview(item2, item.reviews)}>
                    Delete
                  </Button>
                  <Button onPress={() => updateReview (item2, item.reviews)}>
                    Update
                  </Button>
                  </div>
           
                </CardHeader>
                <hr />
              </div>
            ))
          ): <div><h4 className="text-center text-lg mt-12">No review available for this service</h4></div>}
        </Card>
      ))}
    </div>
  );
};

export default MyReviews;
