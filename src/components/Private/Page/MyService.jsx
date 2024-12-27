import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/ContextProvider";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyPostedJobs = () => {
  const { user } = useContext(AuthContext);
  const [service, setService] = useState([]);

  useEffect(() => {
    axios
      .get("https://service-web-server.vercel.app/allService")
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

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Click confirm to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (isConfirmed) {
      axios
        .delete(`https://service-web-server.vercel.app/deleteService/${id}`)
        .then((response) => {
          if (response.data.deletedCount > 0) {
            setService(service.filter((item) => item._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Your service has been deleted.",
              icon: "success",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  return (
    <section className="container px-4 mx-auto pt-12">
      <Helmet>
        <title>TrustWise | My Services</title>
      </Helmet>
      <div className="flex items-center gap-x-3">
        <h4 className="text-lg font-medium">My Posted Services</h4>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {service.length} Service
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 border-2">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                    >
                      <span>Added Date</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right"
                    >
                      Description
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                      Edit
                    </th>
                  </tr>
                </thead>

                {service.length > 0 ? (service.map((item, index) => (
                  <tbody
                    key={index}
                    className="bg-white divide-y divide-gray-200"
                  >
                    <tr>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.title}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.addedDate}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1  text-blue-500 bg-blue-100/60 text-xs  rounded-full`}
                          >
                            {item.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm break-all break-words max-w-12 text-gray-500">
                        {item.description}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-500 transition-colors duration-200 hover:text-red-700 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          <Link
                            to={`/service/update/${item._id}`}
                            className="text-blue-500 transition-colors duration-200 hover:text-blue-700 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))): <Spinner className="mt-12 mx-auto" size="lg" />}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostedJobs;
