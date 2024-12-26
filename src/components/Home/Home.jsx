import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Marquee2 from "./Marquee";

export default function App() {
  const [service, setService] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/limitService")
      .then((response) => {
        setService(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, {});

  const handleChange = (item) => {
    navigate(`/service/${item._id}`);
  };

  return (
    <div className="mt-20">
      <h1 className="text-center text-5xl">Honest Reviews, Trusted Insights</h1>
      <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 mt-20">
        {service.length > 0 ? (
          service.map((item, index) => (
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
                  src={item.image }
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="font-semibold">
                  {item.title }
                </b>
                <p className="text-default-500">
                  {item.price }
                </p>
              </CardFooter>
              <Button
                onPress={() => handleChange(item)}
                size="sm"
                className="mx-auto mb-4"
              >
                View details
              </Button>
            </Card>
          ))
        ) : (
          <Spinner className="col-span-full mt-12" size="lg" />
        )}
      </div>
      <Marquee2></Marquee2>
    </div>
  );
}
