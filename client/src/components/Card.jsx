/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { ImTelegram } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";

import { MdOutlineAccessTime } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import EventRegistration from "./eventRegistration"; // Assuming you have EventRegistration component defined
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { RiFileMusicFill } from "react-icons/ri";

const Card = ({ event }) => {
  const targetRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  let recomend = event.fieldData.recommend;
  let guestlist = event.fieldData.guestlist;

  // Framer Motion useScroll hook
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Framer Motion useTransform hooks for animation
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.98, 0.99, 1]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const ClickNewWindow = () => {
    window.open("_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Framer Motion motion.div for animation */}
      <motion.div
        ref={targetRef}
        style={{ scale }}
        className="w-full overflow-hidden relative rounded-lg  border border-transparent  my-0 md:my-2 md:border-blue-400 md:py-1 md:px-2 p-0"
      >
        {event.fieldData.neighborhood && (
          <div
            className="md:hidden py-0 px-3 w-[5.5rem] absolute   text-[0.6rem]  mx-auto items-end justify-end z-[20]  top-[4rem]
  -rotate-90 bg-white text-black -left-[2.18rem]"
          >
            <div className="flex gap-1 mx-auto items-center justify-center ">
              <span className="p-1">
                <ImTelegram />
              </span>
              <span className="flex justify-center items-center text-wrap">
                {event.fieldData.neighborhood}
              </span>
            </div>
          </div>
        )}
        {/* Card component */}

        <div
          className={`${
            recomend ? "card-img" : ""
          }  md:card z-10 md:p-2 p-0 my-1 md:my-2   border-gray-100 border md:border-none   rounded-sm md:rounded-lg   flex gap-2 md:gap-5 sm:justify-evenly relative`}
        >
          {/* Conditio nally render recommendation tag */}
          {recomend && (
            <div className="md:absolute md:top-[4.7rem] hidden md:inline-block  overflow-hidden md:-left-[12%]   md:py-4 md:w-[30vh] lg:w-[50vh] md:pl-[7.2rem] bg-yellow-500 -rotate-[53deg]   md:text-2xl text-white text-center">
              Recommended
            </div>
          )}

          {/*  */}

          {/* Conditionally render recommendation tag */}

          {/* Image section */}
          <div
            className={`  ${
              recomend ? "left" : ""
            } w-1/3 md:pr-4 pr-2 overflow-hidden`}
          >
            <Link
              to={`/event/${event._id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(`/event/${event._id}`);
              }}
            >
              <div
                className={` ${recomend ? "left-img" : ""}
                  h-[10rem]   md:w-[360px] md:h-[360px] lg:w-[390px] lg:h-[400px] overflow-hidden`}
              >
                <img
                  src={event.fieldData.Main_Image}
                  alt={event.fieldData.name}
                  className={`  ${
                    recomend ? "" : ""
                  } w-full h-full  object-center  md:object-cover  md:[img-radius]`}
                />
              </div>
            </Link>
          </div>

          {/* Details section */}
          <div
            className={` ${
              recomend ? "right" : ""
            }  flex-1 p-0 md:mt-9 mt-0 md:p-4`}
          >
            {/* Event name */}
            <h3 className="text-sm md:text-3xl font-bold mb-2">
              <Link
                to={`/event/${event._id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(`/event/${event._id}`);
                }}
              >
                {event.fieldData.name}
              </Link>
            </h3>

            {/* Location and neighborhood */}
            <div
              className={` ${
                recomend ? "" : ""
              }  flex flex-col sm:flex-row gap-0.5 sm:gap-1 md:gap-4`}
            >
              <Link
                to={`/event/${event._id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(`/event/${event._id}`);
                }}
              >
                <span className="flex  gap-1 md:justify-center justify-start items-center text-[0.75rem] md:text-xl">
                  <p
                    className={` ${
                      recomend ? "right-color" : ""
                    }  text-gray-500 md:text-customBlue`}
                  >
                    <FaMapLocationDot />
                  </p>
                  <p
                    className={`${
                      recomend ? "right-color" : ""
                    }  md:text-gray-500  font-semibold`}
                  >
                    {event.fieldData.venueName}
                  </p>
                </span>
              </Link>
              <Link
                to={`/event/${event._id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(`/event/${event._id}`);
                }}
              >
                <span className="md:flex gap-0 sm:gap-1 justify-center items-center text-sm md:text-xl hidden">
                  <p className="text-color">
                    <ImTelegram />
                  </p>
                  <p
                    className={`${
                      recomend ? "right-color" : ""
                    }  text-gray-500 mb-1`}
                  >
                    {event.fieldData.cities}
                  </p>
                </span>
              </Link>
            </div>

            {/* Event summary */}
            <div>
              <p className="text-gray-900 hidden md:block">
                <Link
                  to={`/event/${event._id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(`/event/${event._id}`);
                  }}
                >
                  {event.fieldData.Details.slice(0, 300) + "..."}
                </Link>
              </p>
            </div>

            {/* People, Genre, and Value */}
            <div className="flex gap-[0.12rem] md:gap-4 flex-wrap flex-col w-auto  ">
              <div className="flex   sm:flex-row gap-[1.38rem]  w-fit flex-wrap sm:gap-[2.3rem] text-sm md:text-base md:justify-between my-2   ">
                {/* People */}
                <Link to={`/event/${event._id}`}>
                  <div className="flex gap-1 md:gap-2  items-center  md:w-[9rem]    justify-start  ">
                    <p
                      className={`${
                        recomend ? "right-color" : ""
                      }   text-gray-500 md:text-customBlue text-xs md:text-2xl`}
                    >
                      <BsFillPeopleFill />
                    </p>
                    <p className="text-[0.75rem] font-semibold md:font-normal md:text-[1rem]">
                      {event.fieldData.minAge}
                    </p>
                  </div>
                </Link>
                {/* Genre */}
                <Link
                  to={`/event/${event._id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(`/event/${event._id}`);
                  }}
                >
                  <div className="flex gap-1 sm:gap-2  flex-wrap       items-center md:justify-between">
                    <p
                      className={` ${
                        recomend ? "right-color" : ""
                      }  text-gray-500 md:text-customBlue text-xs md:text-2xl`}
                    >
                      <RiFileMusicFill />
                    </p>
                    <p className="text-[0.75rem] font-semibold md:font-normal md:text-[1rem]">
                      {event.fieldData.genres1}
                    </p>
                  </div>
                </Link>
                {/* Value */}
                <div className="flex md:hidden gap-1 sm:gap-3 justify-start items-center md:justify-between">
                  <p
                    className={`${
                      recomend ? "right-color" : ""
                    }  text-gray-500 md:text-customBlue text-xs md:text-3xl`}
                  >
                    <RiMoneyDollarCircleFill />
                  </p>
                  <p className="text-[0.75rem] font-semibold md:text-xl">
                    {event.fieldData.cost}
                  </p>
                </div>
              </div>

              {/* Time and Value (mobile view) */}
              <div
                className="md:flex hidden w-fit justify-between flex-col sm:flex-row gap-1 
              sm:gap-[6.8rem]  my-2   "
              >
                {/* Time */}
                <div className="flex gap-1 sm:gap-2 justify-between">
                  <p className="md:text-customBlue text-2xl">
                    <MdOutlineAccessTime />
                  </p>
                  <Link
                    to={`/event/${event._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(`/event/${event._id}`);
                    }}
                  >
                    <p className="font-normal">{event.fieldData.StartTime}</p>
                  </Link>
                </div>
                {/* Value */}
                <div className="flex  gap-1 sm:gap-2 justify-start items-center md:justify-between">
                  <p className="text-gray-500 md:text-customBlue text-sm md:text-2xl">
                    <RiMoneyDollarCircleFill />
                  </p>
                  <Link
                    to={`/event/${event._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(`/event/${event._id}`);
                    }}
                  >
                    <p className="text-[0.75rem]  md:text-[1rem]">
                      {event.fieldData.cost}
                    </p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Buttons section */}
            <div className="flex sm:flex-row gap-2 sm:gap-4">
              {/* Listen button */}
              <span
                onClick={openModal}
                className={` ${
                  recomend ? "right-color-button" : ""
                }  bg-[#E5E194] btn1    md:px-5 md:py-1 flex justify-center items-center  rounded-full  md:rounded-md md:font-medium cursor-pointer`}
              >
                Listen
              </span>
              {/* Guest List button */}
              {guestlist ? (
                <span
                  className={` ${
                    recomend ? "right-color-button" : ""
                  } p-1 btn2 bg-color text-white md:px-4 md:py-2 rounded-2xl md:rounded-lg md:font-semibold cursor-pointer flex justify-center items-center`}
                  onClick={openModal}
                >
                  Guest List
                </span>
              ) : (
                <a
                  href={event.fieldData.Ticketlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className={`${
                      recomend ? "right-color-button" : ""
                    }    text-blue-500 border border-[#408DBC] rounded-full text-xs  py-1 md:py-2 font-medium px-2 md:rounded-md md:text-lg md:font-normal md:text-white md:bg-[#408DBC] md:px-4 flex justify-center items-center `}
                  >
                    Buy Tickets
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal component for Event Registration */}
      <EventRegistration
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        event={event}
      />
    </>
  );
};

export default Card;
