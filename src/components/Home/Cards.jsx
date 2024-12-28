import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function BlurCard({ service2 }) {
  const [sliceData, setSliceData] = useState([]);

  const meao = [
    {
      cat: 1,
      image: "https://i.ibb.co.com/yF7WhWG/service.png",
      name: "Service",
      count: 200,
    },
    {
      cat: 2,
      image: "https://i.ibb.co.com/19VLhRB/working.png",
      name: "Users",
      count: 120,
    },
    {
      cat: 3,
      image: "https://i.ibb.co.com/sHmB27Z/reviews.png",
      name: "Reviews",
      count: 300,
    },
  ];

  useEffect(() => {
    setSliceData(service2.sort(() => Math.random() - 0.5).slice(0, 4));
  }, [service2]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-28 mb-28 gap-12">
      {meao?.map((item, index) => (
        <Card key={index} className="py-4 shadow-xl">
          <CardHeader className="flex-col items-center gap-8">
            <img className="w-28" src={item?.image} alt="" />
            <h4 className="text-large">{item?.name}</h4>
          </CardHeader>

          <CardBody className="overflow-visible py-2 text-center">
              <p className="text-3xl font-bold">
                <CountUp end={item?.count} start={0} duration={15}></CountUp>
              </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
