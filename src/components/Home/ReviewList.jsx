import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Rating,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export function TestimonialCard({ service2 }) {
  const [sliceData, setSliceData] = useState([]);

  useEffect(() => {
    setSliceData(service2.sort(() => Math.random() - 0.5).slice(0, 4));
  }, [service2]);

  return (
    <Marquee
      direction="right"
      gradient={true}
      gradientColor="#eee"
      pauseOnHover="true"
      className="w-full"
    >
      <div className="flex">
        {sliceData.map((item, index) => (
          <Card
            key={index}
            color="transparent"
            shadow={false}
            className="border-2 border-black p-3 mr-12"
          >
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 pt-0 pb-8 "
            >
              <Avatar
                size="lg"
                variant="circular"
                src={item?.userPhoto}
                alt="tania andrew"
              />
              <div className="flex flex-col gap-0.5 ">
                <div className="">
                  <Typography variant="h5" color="blue-gray">
                    {item?.userName}
                  </Typography>
                  <div className="5 flex items-center gap-0">
                    <Rating value={item?.rating} readonly />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography className="">
                <p className=" whitespace-nowrap overflow-hidden text-ellipsis break-words w-72">
                  {item?.reviewText}
                </p>
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>
    </Marquee>
  );
}
