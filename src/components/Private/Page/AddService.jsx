import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  Input,
  Textarea,
  Button,
  user,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";

const AddService = () => {
  const variants = ["bordered"];
  const { user, myRef } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const [errorMsg3, setErrorMsg3] = useState("");
  const [errorMsg4, setErrorMsg4] = useState("");
  const [errorMsg5, setErrorMsg5] = useState("");
  const [category, setCategory] = useState([]);
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/category")
      .then((response) => {
        setCategory(response.data); // Access the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onSubmit = (e) => {
    const split = e.addedDate.split("-");

    if (e.title.length < 7) {
      return setErrorMsg3("Please write more than 7 words");
    }
    setErrorMsg3("");
    if (e.company.length < 7) {
      return setErrorMsg4("Please write more than 7 words");
    }
    setErrorMsg4("");
    if (e.price < 100) {
      return setErrorMsg5("Minimum money is 100");
    }
    setErrorMsg5("");
    if (
      parseFloat(split[0]) !== currentYear &&
      parseFloat(split[1]) !== month &&
      parseFloat(split[2] !== day)
    ) {
      return setErrorMsg("Please select the correct year date or month");
    } else {
      setErrorMsg("");
    }

    if (e.description.length < 10) {
      return setErrorMsg2("Please write more than 10 words");
    } else {
      setErrorMsg2("");
    }

    const aaaaaa = {
      title: e.title,
      image: e.image,
      description: e.description,
      category: e.category,
      price: e.price,
      company: e.company,
      website: e.website,
      addedDate: e.addedDate,
      myService: true,
      email: user.email,
      reviews: [],
    };

    const filterEmptyFields = Object.fromEntries(
      Object.entries(aaaaaa).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    axios
      .post(
        "https://service-web-server.vercel.app/addService",
        filterEmptyFields
      )
      .then((response) => {
        if (parseFloat(response.data.insertedId) > 0) {
          toast.success("Successfully Added service");
        }
      })
      .catch((error) => {
        console.error("Error adding service:", error);
      });
    reset();
  };
  return (
    <div>
      <Helmet>
        <title>TrustWise | Add Service</title>
      </Helmet>
      <section className="bg-[#f8f4f4] dark:bg-gray-900 mt-12 rounded-2xl border-2 border-gray-500" ref={myRef}>
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h4 className="mb-12 text-2xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
            Add Service
          </h4>{" "}
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              {variants.map((variant) => (
                <div
                  key={variant}
                  className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5"
                >
                  <div>
                    <label
                      for="name"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image url
                    </label>
                    <Input
                      type="url"
                      name="url"
                      id="url"
                      variant={variant}
                      {...register("image")}
                      label="https://example.com"
                      pattern="https://.*"
                      isRequired
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <Input
                      isRequired
                      {...register("title")}
                      label="Title"
                      type="text"
                      variant={variant}
                    />
                    <p className="text-red-500">{errorMsg3}</p>
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Company Name
                    </label>
                    <Input
                      {...register("company")}
                      label="name"
                      type="text"
                      variant={variant}
                      isRequired
                    />
                    <p className="text-red-500">{errorMsg4}</p>
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Website url
                    </label>
                    <Input
                      type="url"
                      name="url"
                      id="url"
                      variant={variant}
                      {...register("website")}
                      label="https://example.com"
                      pattern="https://.*"
                      isRequired
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <Select
                      className="max-w-xs shadow rounded-2xl"
                      label="Category"
                      isVirtualized
                      {...register("category")}
                      isRequired
                    >
                      {category.map((item) => (
                        <SelectItem key={item.name}>{item.name}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        for="name"
                        className="mb-2 text-gray-900 dark:text-white"
                      >
                        Price:
                      </label>
                      <label className="text-gray-900 ">Min price : 100$</label>
                    </div>

                    <Input
                    isRequired
                      {...register("price")}
                      label="price"
                      type="number"
                      variant={variant}
                    />
                    <p className="text-red-500">{errorMsg5}</p>
                  </div>

                  <div className="col-span-2">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Added date
                    </label>
                    <Input
                      {...register("addedDate")}
                      aria-label="Date and time"
                      type="date"
                      variant={variant}
                      isRequired
                    />
                    <p className="text-red-500">{errorMsg}</p>
                  </div>
                  <div className="col-span-2">
                    <label
                      for="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <Textarea
                    isRequired
                      disableAnimation
                      minRows="8"
                      {...register("description")}
                      placeholder="Write your service description"
                      variant="bordered"
                    />
                    <p className="text-red-500">{errorMsg2}</p>
                  </div>
                  <div></div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Button type="submit" size="lg">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddService;
