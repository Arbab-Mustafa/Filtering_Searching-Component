import React, { useState } from "react";
import { MdCheckCircle, MdOutlineCancel } from "react-icons/md";

const EventRegistration = ({ isOpen, onRequestClose, event }) => {
  const eventDate = new Date(event.fieldData["date-2"]);
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [guests, setGuests] = useState(false);

  // Submit logic
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Simulating asynchronous behavior with setTimeout
    setTimeout(() => {
      setShowConfirmation(true);
      setIsFormOpen(false);
    }, 1000);
  };

  // Close confirmation modal and reset form state
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setIsFormOpen(true); // Reset to open the form modal again if needed
    onRequestClose(); // Close the entire modal if required
  };

  const AddOtherGuest = (e) => {
    e.preventDefault();
    setGuests(!guests);
  };

  return (
    <div
      className={`fixed inset-0  flex z-[994] items-center  justify-center gap-3 p-4 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Modal Content - Form */}
      {!showConfirmation ? (
        <div className="fixed inset-0  flex items-center justify-center gap-3 p-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className={`relative flex inset-0   fxed flex-col md:flex-row bg-white h-fit md:h-fit overflow-y-scroll scroll-p-0   rounded-lg shadow-lg w-full md:max-w-[70rem] p-3 md:p-5 ${
              isFormOpen ? "block" : "hidden"
            }`}
          >
            {/* Close button for form */}
            <button
              onClick={onRequestClose}
              className="absolute md:top-2 top-5 z-[700] right-5 md:right-3 bg-white md:bg-transparent text-2xl"
            >
              <MdOutlineCancel />
            </button>

            {/* Left section with image */}
            <div className="md:w-[50%]  left-popup-img inset-0 z-[400]">
              <img
                src={event.fieldData.Main_Image}
                alt={event.fieldData.name}
                className=" w-full     md:h-[500px] md:w-full  object-contain md:object-cover rounded-lg"
              />
            </div>

            {/* Right section with form */}
            <div className="flex flex-col md:ml-4 md:w-[70%] z-[401] ">
              <div className="md:my-4 my-0">
                <h1 className="text-lg md:text-4xl text-center font-bold text-white md:text-gray-700">
                  {event.fieldData.name}
                </h1>
                <p className="text-xs md:text-2xl font-semibold text-white md:text-yellow-600 border-b-2  border-white md:border-yellow-400 w-1/2 py-1 md:py-3">
                  {eventDate.toLocaleDateString()}
                </p>
              </div>

              {/* Form for adding guest */}
              <form className="md:ml-4 ml-0 right-popup-text">
                <h2 className="my-0 md:my-4 md:py-2 py-1  font-bold text-xs md:text-2xl">
                  Contact Information
                </h2>
                <div className="md:mb-2 mb-0">
                  <label
                    htmlFor="username"
                    className="block text-gray-800 right-popup-text text-xs md:text-base   mb-1 md:mb-2"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="shadow appearance-none border w-[70%]  md:ml-2 ml-0 py-1 md:py-2 px-2 md:px-3 text-xs md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                  />
                </div>
                {/*  */}

                {/*  */}
                <div className="md:mb-3 mb-1">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 right-popup-text text-xs md:text-base   mb-1 md:mb-2"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border w-[70%] md:ml-2 ml-0 py-1 md:py-2 px-2 md:px-3 text-xs md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                  />
                </div>

                {guests && (
                  <form className="md:ml-4 ml-0">
                    <div className="mb-1 md:mb-3 ">
                      <label
                        htmlFor="username"
                        className="block text-gray-800 right-popup-text text-xs md:text-base   mb-1 md:mb-2"
                      >
                        User name
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="shadow appearance-none border w-[70%]  md:ml-2 ml-0 py-1 md:py-2 px-2 md:px-3 text-xs md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                      />
                    </div>
                    <div className="mb-1 md:mb-3">
                      <label
                        htmlFor="email"
                        className="block text-gray-700  right-popup-text text-xs md:text-base   mb-1 md:mb-2"
                      >
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow appearance-none border w-[70%] md:ml-2 ml-0 py-1 md:py-2 px-2 md:px-3 text-xs md:text-base text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl"
                      />
                    </div>
                  </form>
                )}
                <button
                  onClick={AddOtherGuest}
                  className="bg-transparent md:border-2 border border-spacing-2 border-yellow-400 border-dotted text-white md:text-yellow-500 font-bold my-2 py-1 md:py-2 px-2 md:px-4 rounded-xl w-[73%] focus:outline-none focus:shadow-outline text-xs md:text-base"
                >
                  {guests ? " cancel" : " Add a guest "}
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded-xl w-[73%] focus:outline-none focus:shadow-outline text-xs md:text-base"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center gap-3 p-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative flex flex-col items-center justify-evenly bg-white h-[50%] md:h-[58vh] rounded-lg shadow-lg p-5 w-full md:max-w-[60rem]">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 rounded-full p-3">
                <MdCheckCircle size={48} className="text-white" />
              </div>
            </div>
            <div className="text-center mb-4">
              <h2 className="  text-black font-bold  mx-auto text-2xl md:text-4xl ">
                we got you! you are confirmed for {event.fieldData.name}.
              </h2>
              <p className="mb-2 border-b-2 m-auto border-yellow-600 items-center py-2 w-[50%] flex justify-center"></p>
            </div>
            <button
              onClick={handleConfirmationClose}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm md:text-xl font-bold w-[70%] py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistration;
