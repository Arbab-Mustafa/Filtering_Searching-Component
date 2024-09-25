/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { motion, useScroll, useTransform } from "framer-motion";

import { FaFacebookF } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import axios from "axios";
import EventRegistration from "./eventRegistration";
import Loader from "./loading";
import Footer from "./Footer";
import Navbar from "./navbar";

const getUpcomingEventsForVenue = (eventsData, venueName, currentEventId) => {
  // Get today's date in YYYY-MM-DD format
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day
  const currentDateStr = currentDate.toISOString().split("T")[0];

  return eventsData.filter((event) => {
    const fieldData = event.fieldData || {};
    const eventDateStr = fieldData.startDate
      ? new Date(fieldData.startDate).toISOString().split("T")[0] // Format as YYYY-MM-DD
      : null;

    // Check if the event date is valid and compare with current date
    // Exclude the current event by checking against currentEventId
    return (
      fieldData.venueName === venueName &&
      eventDateStr &&
      eventDateStr >= currentDateStr &&
      event._id !== currentEventId
    );
  });
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  // /////////////

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const s4 = useTransform(scrollYProgress, [0, 0.7, 0.9], [0.89, 0.99, 1]);

  // ///////////

  //

  function extractTextFromHTML(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.innerText || tempDiv.textContent || "";
  }

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/getEvent/${id}`
        );

        setEvent(response.data);
        const allEventsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/getAllEvents`
        );
        setAllEvents(allEventsResponse.data);

        if (response.data) {
          const venueName = response.data.fieldData.venueName;
          const futureEvents = getUpcomingEventsForVenue(
            allEventsResponse.data,
            venueName
          );
          setUpcomingEvents(futureEvents);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event || loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  const videoUrl = event?.fieldData?.video?.url;

  let embedUrl = null;

  if (videoUrl) {
    try {
      // Extract video ID from the URL
      const videoId = new URL(videoUrl).searchParams.get("v");

      // Construct the embed URL
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.error("Invalid video URL:", error);
    }
  }

  //

  return (
    <>
      <Navbar />
      <div ref={targetRef} className="container mx-auto p-4 overflow-hidden ">
        {/* flex-img-card */}

        <motion.div className="w-7/10 mx-auto my-1 md:my-20">
          <motion.div className="flex md:mb-16 md:gap-3 flex-wrap  relative ">
            {/* 1 */}
            <div className="md:w-2/3 w-full h-auto  max-w-[680px] max-h-[810px] overflow-hidden rounded-sm sm:z-0">
              <motion.img
                src={event.fieldData.Main_Image}
                alt={event.fieldData.name}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>

            {/* 2 */}
            <div className="w-auto  md:w-[30%] px-3 py-6">
              <h3 className="text-3xl font-semibold font-serif uppercase">
                Line Up
              </h3>
              <p className="text-sm font-sans font-bold">
                {extractTextFromHTML(event.fieldData.lineup2 || " ")}
              </p>
            </div>

            {/* 3 */}
            <motion.div className="md:absolute  w-full md:w-[50rem] card right-9 md:-bottom-20 sm:z-20 p-2 bg-blue-500 md:h-[70vh] border-l-4 border-yellow-500 ">
              <motion.div className=" md:py-2 md:px-3 p-1  ">
                <h1 className=" text-3xl md:text-6xl font-bold mb-4 font-serif md:p-2 p-1">
                  {event.fieldData.name}
                </h1>

                <div className="flex md:gap-2 gap-3   md:text-2xl text-xs sm:text-xl font-semibold">
                  <p className=" sm:mb-1 border-r-2 md:border-r-4 px-1  md:px-3  border-black ">
                    {new Date(event.fieldData.startDate).toDateString()}
                  </p>
                  <p className=" sm:mb-1 border-r-2 md:border-r-4 px-1  md:px-3  border-black ">
                    {event.fieldData.StartTime}
                  </p>
                  <p className="  text-[#408DBC] font-bold  font-sans  sm:mb-1 border-r-2 md:border-r-4 px-1  md:px-3  border-black ">
                    <Link to={`/event/${id}/venu/${event.fieldData.venueName}`}>
                      {event.fieldData.venueName}
                    </Link>
                  </p>
                </div>

                <div className=" py-1">
                  <p className="sm:mb-1   text-sm md:text-2xl font-sans font-semibold  w-full md:w-[50vw]">
                    {event.fieldData["Venue Address"]}
                  </p>
                </div>

                <div className="md:py-2   md:text-xl">
                  <p className="md:py-2 flex  gap-2 md:gap-6">
                    <span className="text-gray-500  ">Min . Age </span>
                    <span className="font-semibold">
                      {event.fieldData.minAge}
                    </span>
                  </p>

                  <p className="md:py-2 flex gap-2  md:gap-6">
                    <span className="text-gray-500  ">Cost </span>
                    <span className="font-semibold">
                      ${event.fieldData.cost}
                    </span>
                  </p>

                  <p className="md:py-2 flex gap-2 md:gap-6">
                    <span className="text-gray-500  ">
                      Do you have a question
                    </span>
                    <span className="font-semibold underline text-color cursor-pointer">
                      <Link to={event.fieldData.promoterMail}>
                        Contact to promoter
                      </Link>
                    </span>
                  </p>
                  <p className="md:py-2 flex gap-2 md:gap-6">
                    <span className="text-gray-500  ">
                      Buy Tickets for this event
                    </span>
                    <span className="font-semibold underline text-color cursor-pointer">
                      <Link to={event.fieldData.ticketLink}>Buy Now</Link>
                    </span>
                  </p>
                  <p className="md:py-2 flex gap-2 md:gap-6">
                    <span className="text-gray-500  ">Visit our Website</span>
                    <span className="font-semibold underline text-color cursor-pointer">
                      <Link to={event.fieldData.WebsiteURL}>Visit Now</Link>
                    </span>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          {/* details */}
          <div className="mb-4 md:pt-20 ">
            <div className=" flex sm:my-4 my-3 py-3 md:py-4 flex-col md:flex-row flex-wrap justify-between">
              <h2 className=" text-xl md:text-4xl  text-center md:text-left font-semibold mb-2  font-serif">
                Event Details
              </h2>
              <div className="  my-3 flex sm:gap-4  justify-center gap-2 md:mr-9">
                <h3 className="text-sm sm:text-xl font-semibold mb-2 ">
                  Followed By :{" "}
                </h3>
                <motion.div className=" flex gap-1  sm:gap-2  flex-wrap">
                  <div className="bg-blue-500 rounded-full text-white p-2">
                    <Link to={event.fieldData["social-fb-link"]}>
                      <FaFacebookF className="text-xl sm:text-3xl" />
                    </Link>
                  </div>
                  <div className="instagram-bg  rounded-full text-white p-2">
                    <Link to={event.fieldData["social-tw-link"]}>
                      <FaInstagram className="text-xl sm:text-3xl" />
                    </Link>
                  </div>

                  <div className="bg-green-500 rounded-full text-white p-2">
                    <Link to={event.fieldData["social-wt-link"]}>
                      <FaWhatsapp className="text-xl sm:text-3xl" />
                    </Link>
                  </div>
                  <div className="bg-yellow-400 rounded-full text-white p-2">
                    <Link to={event.fieldData["social-other-link"]}>
                      {" "}
                      <IoLink className="text-xl sm:text-3xl" />{" "}
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.div style={{ scale: s4 }} className="p-2 sm:p-5">
              <p className="text-sm md:text-2xl   font-sans  leading-6 md:leading-[3rem]  md:text-start font-semibold">
                {event.fieldData.Details}
              </p>
            </motion.div>
          </div>
          {/* vedio-- */}

          {event.fieldData.video && (
            <motion.div className="mb-4 md:my-7 py-2 md:py-4">
              <h3 className="text-2xl md:text-4xl font-bold font-serif mb-2 md:py-6 text-center">
                Media Video
              </h3>
              <div className="h-[25rem] mx-auto">
                <iframe
                  className="w-full h-full"
                  src={embedUrl}
                  title="Event Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          )}

          {/* map */}
          <div className="md:py-8 md:my-7 my-3 py-3">
            <h3 className="text-2xl md:text-4xl font-bold font-serif mb-2 md:py-6 text-center">
              Get Directions
            </h3>
            <div className="h-[25rem]  md:h-[30rem]">
              <iframe
                src={event.fieldData.EventsMap}
                width="100%"
                height="300"
                frameBorder="0"
                allowFullScreen
                className="rounded-lg w-full h-full"
                title="Event Location Map"
              ></iframe>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="md:my-8 md:py-5 py-2 my-4">
            <h2 className="text-xl md:text-5xl my-2 font-serif font-semibold">
              UPCOMING EVENTS
            </h2>
            {upcomingEvents.length > 0 ? (
              <div className="events-list grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="event-item overflow-hidden mb-4 p-2 border w-36 md:w-56 rounded"
                  >
                    <Link to={`/event/${event._id}`}>
                      <img
                        src={event.fieldData.Main_Image}
                        alt={event.fieldData.name}
                        className="event-image  w-32 h-32 md:w-48 md:h-48 mx-auto"
                      />
                    </Link>
                    <Link to={`/event/${event._id}`}>
                      <h3 className="event-name text-sm md:text-lg font-semibold mt-2">
                        {event.fieldData.name}
                      </h3>
                    </Link>
                    <Link to={`/event/${event._id}`}>
                      <p className="event-date mt-1 text-sm  md:text-lg">
                        {new Date(
                          event.fieldData.startDate
                        ).toLocaleDateString()}
                      </p>
                    </Link>
                    <Link
                      to={`/event/${event._id}`}
                      className="details-link text-blue-500 hover:underline text-sm  md:text-lg mt-2"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="md:py-4 py-3 md:my-5 bg-color md:px-5 px-2 text-sm md:text-2xl text-white">
                NO UPCOMING EVENT UNDER THIS VENUE
              </p>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;

///////////////////////////////////////////////////////////////////////////////////
