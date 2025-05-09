import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLink } from "react-icons/ci";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Context/ContextProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, signOutUser, myRef } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    if (!terms) {
      setErrorMessage("Please accept our terms and condition ");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer ");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase, lowercase, number, special character"
      );
      return;
    }

    createUser(email, password)
      .then(() => {
        e.target.reset();
        signOutUser();
        navigate(state || "/login");
        toast.success("Successfully created account")
      })
      .catch(() => {
        toast.error("This user already exists");
      });
  };

  return (
    <div
      className="flex p-4 min-h-screen flex-col items-center justify-end"
      ref={myRef}
    >
      <Helmet>
        <title>TrustWise | Register</title>
      </Helmet>
      <div className="w-full max-w-4xl max-md:max-w-xl mx-auto mt-32 xl:mt-0">
        <div className="bg-white grid md:grid-cols-2 gap-16 w-full sm:p-8 p-6 shadow-md rounded-md overflow-hidden">
          <div className="max-md:order-1 space-y-6">
            <div className="md:mb-16 mb-8">
              <h3 className="text-gray-800 text-4xl font-bold">Login With</h3>
            </div>

            <div className="space-y-6">
              <button
                type="button"
                className="hover:scale-105 duration-300 ease-in-out btn shadow-none w-full h-[3em] flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 167.657 167.657"
                >
                  <path
                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                    data-original="#010002"
                  />
                </svg>
                Continue with Facebook
              </button>
              <button
                type="button"
                className="w-full hover:scale-105 duration-300 ease-in-out btn shadow-none h-[3em] flex items-center justify-center rounded-md text-gray-800 text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full h-[3em] flex hover:scale-105 duration-300 ease-in-out btn shadow-none items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 22.773 22.773"
                >
                  <path
                    d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                    data-original="#000000"
                  />
                </svg>
                Continue with Apple
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="w-full">
            <div className="mb-8">
              <h3 className="text-gray-800 text-4xl font-bold">Register</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-lg mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    required
                    className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter name"
                  />
                  <FaUser className="absolute right-4 text-2xl text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">
                  Photo Url
                </label>
                <div className="relative flex items-center">
                  <input
                    name="photo"
                    type="text"
                    className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Url"
                  />

                  <CiLink className="absolute right-4 text-3xl text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                  <HiOutlineMailOpen className="absolute right-4 text-2xl text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-lg mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-white border border-gray-300 w-full text-base text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4  text-2xl text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </button>
                </div>
                <p className="text-red-600">{errorMessage}</p>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                />
                <label
                  for="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-5 py-2.5 px-4 text-base btn btn-lg hover:scale-105 duration-300 ease-in-out tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>

            <p className="text-gray-800 text-base mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
