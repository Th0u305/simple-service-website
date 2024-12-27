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
import { Helmet } from "react-helmet-async";
import errorImage from "../../../assets/404.png";

const AllServices = () => {
  const [service, setService] = useState([]);
  const navigate = useNavigate();
  const { setDeleteReview, myRef } = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState([]);
  const limit = 12;

  const handleChange = (item) => {
    navigate(`/service/${item._id}`);
    setDeleteReview(item._id);
  };

  // const aaaaaaaaa = [
  //   { priceCat: "default" },
  //   { priceCat: "low" },
  //   { priceCat: "high" },
  // ];

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/limitService")
      .then((response) => {
        setService(response.data); // Access the data
        setSelectedCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://service-web-server.vercel.app/category")
      .then((response) => {
        setCategory(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //show data according to category
  const sendCat = (id) => {
    axios
      .get(`https://service-web-server.vercel.app/service/search?filter=${id}`)
      .then((response) => {
        setSelectedCategory(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // search input

  const handleSearch = (data) => {
    axios
      .get(
        `https://service-web-server.vercel.app/service/search?filter=&search=${data}`
      )
      .then((response) => {
        setSelectedCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // show data each page
  const handlePage = (page) => {
    axios
      .get(
        `http://localhost:5000/service/search/page?page=${page}&limit=${limit}`
      )
      .then((response) => {
        setSelectedCategory(response.data);
        if (response.data.length === 0) {
          setMessage("Sorry No More Data available");
          setLoading(false);
        } else {
          setMessage("");
          setLoading(true);
        }
      });
  };

  return (
    <section className="mt-12">
      <Helmet>
        <title>TrustWise | Services</title>
      </Helmet>
      <h4 className="text-2xl md:text-4xl text-center mb-12" ref={myRef}>
        A Hub for Service Excellence
      </h4>
      <div className="grid grid-cols-1 justify-self-center gap-8 md:grid-cols-2">
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
        {/* <Select className="w-max-sm shadow rounded-2xl" label="Sort by Price">
          {aaaaaaaaa.map((item, index) => (
            <SelectItem key={index}>{item.priceCat}</SelectItem>
          ))}
        </Select> */}
        <div className="relative">
          <Input
            onChange={(e) => handleSearch(e.target.value)}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60 relative",
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute right-5 top-[30%]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 mt-12 md:grid-cols-3 lg:grid-cols-4">
        {selectedCategory.length > 0 ? (
          selectedCategory.map((item, index) => (
            <Card key={index} isPressable shadow="sm">
              <CardBody className="overflow-visible p-0">
                <Image
                  className="w-full object-cover h-[140px]"
                  radius="lg"
                  shadow="sm"
                  src={item.image}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b className="font-semibold">{item.title}</b>
                <p className="text-default-500">{item.price}</p>
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
          <div className="col-span-full mt-12 flex flex-col justify-center items-center">
            {loading && <Spinner className="" size="lg" />}
            <h4 className="text-2xl md:text-4xl">{message}</h4>
            {/* <img src={errorImage} className="w-72" alt="" /> */}
          </div>
        )}
        <div className="col-span-full mt-12 mx-auto w-max">
          <Pagination
            showControls
            initialPage={1}
            total={10}
            onChange={(initialPage) => handlePage(initialPage)}
          />
        </div>
      </div>
    </section>
  );
};

export default AllServices;
