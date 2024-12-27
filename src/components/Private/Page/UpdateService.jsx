import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Input, Textarea, Button, user } from "@nextui-org/react";
import axios from "axios";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const UpdateService = () => {
  const variants = ["bordered"];
  const { user } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  const loaderData = useLoaderData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    const split = e.addedDate.split("-");

    if (
      parseFloat(split[0]) !== currentYear &&
      parseFloat(split[1]) !== month &&
      parseFloat(split[2] !== day)
    ) {
      return setErrorMsg("Please select the correct year date or month");
    } else {
      setErrorMsg("");
    }

    if (e.description.length === 0) {
      setErrorMsg2("")
    } else if (e.description.length < 10){
        return setErrorMsg2("Please write more than 10 words");
    }


    const filterEmptyFields = Object.fromEntries(
      Object.entries(e).filter(
        ([_, value]) => value !== "" && value !== undefined
      )
    );

    axios
      .put(
        `https://service-web-server.vercel.app/singleService/update/${loaderData._id}`,
        filterEmptyFields
      )
      .then((response) => {
        if (parseFloat(response.data.modifiedCount) > 0) {
          toast.success("Successfully Added service");
        }
      })
      .catch((error) => {
        console.error("Error adding service:", error);
      });
    // reset();
  };

  return (
    <div>
      <Helmet>
        <title>EcoVenture | AddMovies</title>
      </Helmet>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update Service
          </h4>
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
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                      {...register("title")}
                      label="Title"
                      type="text"
                      variant={variant}
                    />
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
                    />
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
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Category
                    </label>
                    <Input
                      {...register("category")}
                      label="categories"
                      type="text"
                      variant={variant}
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Price
                    </label>
                    <Input
                      {...register("price")}
                      label="price"
                      type="number"
                      variant={variant}
                    />
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
                  <div>
                    <label
                      for="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <Textarea
                      disableAnimation
                      minRows="8"
                      {...register("description")}
                      classNames={{
                        base: "max-w-xs",
                      }}
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

export default UpdateService;