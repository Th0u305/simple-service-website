import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/ContextProvider";
import Swal from "sweetalert2";


const Money = () => {
  const [money, setMoney] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const data = localStorage.getItem("singleData");
    const all = JSON.parse(data);
    setMoney(all);
  }, []);
  

  const addCardInfo = (e) => {
    e.preventDefault();

    const cardNumber = e.target.cardNumber.value;
    const date = e.target.date.value;
    const cvv = e.target.cvv.value;
    const name = e.target.name.value;
    if (user) {
      if (!cardNumber || cardNumber.length !== 16) {
        setErrorMessage("Card number must be 16 digits");
        return;
      }
      if (!date || date.length !== 4) {
        return setErrorMessage2("Expiration date must be 4 digits (MMYY)");
      }
      if (!cvv || cvv.length !== 3) {
        return setErrorMessage3("CVV must be 3 digits");
      }
      if (!name || typeof name !== "string" || name.trim() === "") {
        return setErrorMessage4("Name must be a valid string");
      }
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Card has been saved",
        showConfirmButton: false,
        timer: 1700,
      });
      e.target.reset();
       }
  };

  return (
    <div>
      <div className="w-[70%] mx-auto">
        <h3 className="text-lg font-semibold mb-4">Adventure Cost: {money?.adventureCost || 0} </h3>
      </div>
      <div class="w-full max-w-lg mx-auto ">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-3xl font-medium mb-6">Payment Information</h2>
          <form onSubmit={addCardInfo}>
            <div class="grid grid-cols-2 gap-6">
              <div class="col-span-2">
                <label
                  for="card-number"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Card Number
                </label>
                <input
                  type="number"
                  name="cardNumber"
                  required
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                ></input>
                <p className="text-red-600">{errorMessage}</p>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="expiration-date"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Expiration Date
                </label>
                <input
                  type="text"
                  name="date"
                  required
                  id="expiration-date"
                  placeholder="MM / YY"
                  class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                ></input>
                <p className="text-red-600">{errorMessage2}</p>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="cvv"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  required
                  id="cvv"
                  placeholder="000"
                  class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                ></input>
                <p className="text-red-600">{errorMessage3}</p>
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="card-holder"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Card Holder
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  id="card-holder"
                  placeholder="Full Name"
                  class="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                ></input>
                <p className="text-red-600">{errorMessage4}</p>
              </div>
            </div>
            <div class="mt-8">
              <button
                type="submit"
                class="w-full btn hover:scale-105 ease-in-out duration-300 bg-green-500 hover:bg-blue-600 text-white font-base rounded-lg focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Money;
