import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Spinner,
  Pagination,
  Button,
  Select,
  SelectItem,
  Input,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/ContextProvider";

const AllServices = () => {
  
  const [service, setService] = useState([]);
  const navigate = useNavigate();
  const { setDeleteReview } = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);


  const handleChange = (item) => {
    navigate(`/service/${item._id}`);
    setDeleteReview(item._id);
  };


  useEffect(() => {
    axios
      .get("http://localhost:5000/limitService")
      .then((response) => {
        setService(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        setCategory(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sendCat = (id) => {
    axios
      .get(`http://localhost:5000/service/search?filter=${id}`)
      .then((response) => {
        setSelectedCategory(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch =(data)=>{    
    axios
    .get(`http://localhost:5000/service/search?filter=&search=${data}`)
    .then((response) => {
      setSelectedCategory(response.data);            
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  return (
    <section className="mt-12">
      <h1 className="text-4xl text-center mb-12">A Hub for Service Excellence</h1>
      <div className="flex gap-5">
        <Select
          className="max-w-xs shadow rounded-2xl"
          label="Filter service"
          isVirtualized
        >
          {category.map((item) => (
            <SelectItem onPress={() => sendCat(item.name)} key={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          onChange={(e)=> handleSearch(e.target.value)}
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow",
              "base: w-[20rem]",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
            ],
          }}
          type="search"
          label="Search"
          placeholder="Search services"
          radius="lg"
        />
      </div>

      <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 mt-12">
        {selectedCategory.length > 0
          ? selectedCategory.map((item, index) => (
              <Card key={index} isPressable shadow="sm">
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
                    {item.price}
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
          : service.map((item, index) => (
              <Card key={index} isPressable shadow="sm">
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
                    {item.title}
                  </b>
                  <p className="text-default-500">
                    {item.price}
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
            ))}
        <div className="col-span-full mt-12 mx-auto">
          <Pagination showControls initialPage={1} total={10} />
        </div>
      </div>
    </section>
  );
};

export default AllServices;
