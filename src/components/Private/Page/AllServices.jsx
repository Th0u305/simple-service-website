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

const AllServices = () => {
  const navigate = useNavigate();
  const { setDeleteReview, myRef } = useContext(AuthContext);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState([]);
  const [pageNumber, setPageNumber] = useState([]);
  const limit = 12;

  const handleChange = (item) => {
    navigate(`/service/${item._id}`);
  };

  const aaaaaaaaa = [
    { priceCat: "default" },
    { priceCat: "low" },
    { priceCat: "high" },
  ];

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/allService")
      .then((response) => {
        setSelectedCategory(response.data.slice(0, 12));
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
        if (response.data.length === 0) {
          setLoading(false);
          setMessage("Nothing found related to your search");
          setSelectedCategory([]);
          return;
        }
        setSelectedCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // show data each page and filter

  useEffect(() => {
    axios
      .get(
        `https://service-web-server.vercel.app/service/search?page=${pageNumber}&limit=${limit}` /////ddddddddd
      )
      .then((response) => {
        setSelectedCategory(response.data);
        if (price === "low") {
          setSelectedCategory(response.data.sort((a, b) => a.price - b.price));
        }
        if (price === "high") {
          setSelectedCategory(response.data.sort((a, b) => b.price - a.price));
        }
        if (price === "default") {
          setSelectedCategory(response.data);
        }
        if (response.data.length === 0) {
          setTimeout(function () {
            setMessage("Sorry No More Data available");
            setLoading(false);
          }, 2000);
        } else {
          setMessage("");
          setLoading(true);
        }
      });
  }, [pageNumber, price]);

  return (
    <section className="mt-12">
      <Helmet>
        <title>TrustWise | Services</title>
      </Helmet>
      <h4 className="text-2xl md:text-4xl text-center mb-12" ref={myRef}>
        A Hub for Service Excellence
      </h4>
      <div className="grid grid-cols-3 gap-12">
        <Select
          className="shadow rounded-2xl"
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
          onChange={(e, dddd) => handleSearch(e.target.value, dddd)}
          isClearable
          type="search"
          label="Search"
          placeholder="Search services"
          radius="lg"
          className=" shadow rounded-2xl"
        />

        <Select className="shadow rounded-2xl" label="Sort by Price">
          {aaaaaaaaa.map((item, index) => (
            <SelectItem onPress={() => setPrice(item.priceCat)} key={index}>
              {item.priceCat}
            </SelectItem>
          ))}
        </Select>
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
                color="primary"
                variant="bordered"
              >
                View details
              </Button>
            </Card>
          ))
        ) : (
          <div className="col-span-full mt-12 flex flex-col justify-center items-center">
            {loading && <Spinner className="" size="lg" />}
            <h4 className="text-2xl md:text-4xl">{message}</h4>
          </div>
        )}
        <div className="col-span-full mt-12 mx-auto w-max">
          <Pagination
            showControls
            initialPage={1}
            total={10}
            onChange={(initialPage) => setPageNumber(initialPage)}
          />
        </div>
      </div>
    </section>
  );
};

export default AllServices;
