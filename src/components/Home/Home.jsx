import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
} from "@nextui-org/react";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Marquee2 from "./Marquee";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Context/ContextProvider";
import { TestimonialCard } from "./ReviewList";
import BlurCard from "./Cards";

export default function App() {
  const navigate = useNavigate();
  const { myRef , service, service2} = useContext(AuthContext);

  const handleChange = (item) => {
    navigate(`/service/${item._id}`);
  };

  return (
    <div className="mt-20" ref={myRef}>
      <Helmet>
        <title>TrustWise | Home</title>
      </Helmet>
      <h4 className="text-center text-2xl md:text-3xl lg:text-4xl">
        Honest Reviews, Trusted Insights
      </h4>
      <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20">
        {service?.length > 0 ? (
          service?.map((item, index) => (
            <Card
              key={index}
              isPressable
              shadow="sm"
              onPress={() => handleChange(item)}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  src={item?.image}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="font-semibold">{item?.title}</b>
                <p className="text-default-500">{item?.price}</p>
              </CardFooter>
              <Button
                onPress={() => handleChange(item)}
                size="sm"
                className="mx-auto mb-4"
                color="primary"
                variant="bordered"
              >
                View details
              </Button>
            </Card>
          ))
        ) : (
          <Spinner className="col-span-full mt-12" size="lg" />
        )}
      </div>
      <BlurCard service2={service2}></BlurCard>
      <div>
        <h4 className="text-center text-2xl md:text-3xl lg:text-4xl mb-14">
          Meet Our Partners
        </h4>
        <Marquee2></Marquee2>
      </div>
      <h4 className="text-2xl md:text-3xl lg:text-4xl text-center mt-14 mb-12">
        Recent Reviews
      </h4>
      <TestimonialCard service2={service2}></TestimonialCard>
    </div>
  );
}
