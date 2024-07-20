import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { ImTelegram } from "react-icons/im";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import EventRegistration from "./eventRegistration"; // Assuming you have EventRegistration component defined
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Card = ({ event }) => {
  const targetRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  let recomend = event.fieldData.recommend;

  // Framer Motion useScroll hook
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Framer Motion useTransform hooks for animation
  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [0.9, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [0.9, 1]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Framer Motion motion.div for animation */}
      <motion.div
        ref={targetRef}
        style={{ scale, opacity }}
        className="w-full overflow-hidden relative rounded-lg md:border my-0 md:my-3 md:border-blue-400 md:py-2 md:px-2 p-1"
      >
        {event.fieldData.neighborhood && (
          <div className="md:hidden    py-1 px-3   absolute  mx-auto items-end justify-end z-[20]  top-[5rem] -left-[2.3rem] -rotate-90      bg-white       text-black">
            <div className="flex gap-1 items-center ">
              <ImTelegram />
              <span className="text-sm">{event.fieldData.neighborhood}</span>
            </div>
          </div>
        )}
        {/* Card component */}
        <div
          className={`${
            recomend ? "card-img" : ""
          }  md:card z-10 md:p-2 p-1 my-1 md:my-2 border md:border-none border-gray-200 rounded-sm md:rounded-lg  flex gap-2 md:gap-5 sm:justify-evenly relative`}
        >
          {/* Conditio nally render recommendation tag */}
          {recomend && (
            <div className="md:absolute md:top-[16%] hidden md:inline-block  overflow-hidden md:-left-[10%]   md:py-4 md:w-[30vh] lg:w-[50vh] md:pl-28 bg-yellow-500 -rotate-[50deg]   md:text-3xl text-white">
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
            <Link to={`/event/${event.id}`}>
              <div
                className={` ${recomend ? "left-img" : ""}
                  md:w-[360px] md:h-[360px] lg:w-[390px] lg:h-[400px] overflow-hidden`}
              >
                <img
                  src={event.fieldData["main-image"].url}
                  alt={
                    event.fieldData["main-image"].alt || event.fieldData.name
                  }
                  className={`  ${
                    recomend ? "" : ""
                  } w-full h-full object-cover md:img-radius`}
                />
              </div>
            </Link>
          </div>

          {/* Details section */}
          <div
            className={` ${
              recomend ? "right" : ""
            }  flex-1 p-2 md:mt-9 mt-0 md:p-4`}
          >
            {/* Event name */}
            <h3 className="text-sm md:text-3xl font-semibold md:font-bold mb-2">
              <Link to={`/event/${event.id}`}>{event.fieldData.name}</Link>
            </h3>

            {/* Location and neighborhood */}
            <div
              className={` ${
                recomend ? "" : ""
              }  flex flex-col sm:flex-row gap-0.5 sm:gap-1 md:gap-4`}
            >
              <Link to={`/event/${event.id}`}>
                <span className="flex  sm:gap-1 md:justify-center justify-start items-center text-xs md:text-xl">
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
                    }  md:text-gray-500 mb-1`}
                  >
                    {event.fieldData["venue-name"]}
                  </p>
                </span>
              </Link>
              <Link to={`/event/${event.id}`}>
                <span className="md:flex gap-0 sm:gap-1 justify-center items-center text-sm md:text-xl hidden">
                  <p className="text-color">
                    <ImTelegram />
                  </p>
                  <p
                    className={`${
                      recomend ? "right-color" : ""
                    }  text-gray-500 mb-1`}
                  >
                    {event.fieldData.neighborhood}
                  </p>
                </span>
              </Link>
            </div>

            {/* Event summary */}
            <div>
              <p className="text-gray-900 hidden md:block">
                <Link to={`/event/${event.id}`}>{event.fieldData.summary}</Link>
              </p>
            </div>

            {/* People, Genre, and Value */}
            <div className="flex sm:flex-row gap-1 flex-wrap sm:gap-4 text-sm md:text-base md:justify-between my-2 md:w-[25vw]">
              {/* People attending */}
              <Link to={`/event/${event.id}`}>
                <span className="flex gap-1 sm:gap-3 items-center justify-start md:justify-between">
                  <p
                    className={`${
                      recomend ? "right-color" : ""
                    }   text-gray-500 md:text-customBlue text-xs md:text-3xl`}
                  >
                    <BsFillPeopleFill />
                  </p>
                  <p className="text-xs md:text-xl">{event.fieldData["18"]}</p>
                </span>
              </Link>
              {/* Genre */}
              <Link to={`/event/${event.id}`}>
                <span className="flex gap-1 sm:gap-3 justify-start items-center md:justify-between">
                  <p
                    className={` ${
                      recomend ? "right-color" : ""
                    }  text-gray-500 md:text-customBlue text-xs md:text-3xl`}
                  >
                    <AiFillTikTok />
                  </p>
                  <p className="text-xs md:text-xl">
                    {event.fieldData["genres-1"]}
                  </p>
                </span>
              </Link>
              {/* Value */}
              <span className="flex md:hidden gap-1 sm:gap-3 justify-start items-center md:justify-between">
                <p
                  className={`${
                    recomend ? "right-color" : ""
                  }  text-gray-500 md:text-customBlue text-xs md:text-3xl`}
                >
                  <RiMoneyDollarCircleFill />
                </p>
                <p className="text-xs md:text-xl">{event.fieldData.valu}</p>
              </span>
            </div>

            {/* Time and Value (mobile view) */}
            <div className="md:flex hidden flex-col sm:flex-row gap-1 sm:gap-4 justify-between my-2 md:w-[25vw]">
              {/* Time */}
              <span className="flex gap-1 sm:gap-3 justify-between">
                <p className="md:text-customBlue text-3xl">
                  <MdOutlineAccessTime />
                </p>
                <p>{event.fieldData["time-3"]}</p>
              </span>
              {/* Value */}
              <span className="flex gap-1 sm:gap-3 justify-start items-center md:justify-between">
                <p className="text-gray-500 md:text-customBlue text-sm md:text-3xl">
                  <RiMoneyDollarCircleFill />
                </p>
                <p className="text-sm md:text-xl">{event.fieldData.valu}</p>
              </span>
            </div>

            {/* Buttons section */}
            <div className="flex sm:flex-row gap-2 sm:gap-4">
              {/* Listen button */}
              <span
                onClick={openModal}
                className={` ${
                  recomend ? "right-color-button" : ""
                }  bg-yellow-300 btn1 py-2 px-3 md:px-4 md:py-2  md:rounded-lg md:font-semibold cursor-pointer`}
              >
                Listen
              </span>
              {/* Guest List button */}
              <span
                className={` ${
                  recomend ? "right-color-button" : ""
                } p-1 btn2 bg-color text-white md:px-4 md:py-2 rounded-2xl md:rounded-lg md:font-semibold cursor-pointer`}
                onClick={openModal}
              >
                Guest List
              </span>
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
