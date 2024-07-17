import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loader from "./loading";

import { FaFacebookF } from "react-icons/fa";

import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { IoLink } from "react-icons/io5";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";

const VenuDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  //

  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9, 1],
    [0.7, 1, 1.4, 1.9]
  );
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [100, 40, 0]);
  const x1 = useTransform(scrollYProgress, [0, 0.5, 1], [90, 10, 0]);
  const s1 = useTransform(scrollYProgress, [0, 0.9], [0.8, 1]);

  const x2 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100]);
  const s2 = useTransform(scrollYProgress, [0, 0.7], [0.8, 1]);

  const s3 = useTransform(scrollYProgress, [0, 0.5, 0.9], [0.6, 0.9, 1]);

  //

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://filtering-searching-component-server.vercel.app/"
        );
        const eventData = response.data.items.find((item) => item.id === id);
        setEvent(eventData);
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
  const videoUrl = event.fieldData.vedio.url;

  // Extract video ID from the URL
  const videoId = new URL(videoUrl).searchParams.get("v");

  // Construct the embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div ref={targetRef} className="container mx-auto p-4 overflow-hidden">
      {/* flex-img-card */}
      <div className="w-7/10 mx-auto">
        <div className="md:mb-16 md:gap-3 flex-wrap  md:relative ">
          {/* 1 */}
          <div className="md:w-3/3 w-full h-auto  hidden  max-w-[780px] max-h-[810px] overflow-hidden rounded-sm sm:z-0">
            <motion.img
              style={{ x: x2, scale: s2 }}
              src={event.fieldData["main-image"].url}
              alt={event.fieldData["main-image"].alt || event.fieldData.name}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>

          {/* 3 */}
          <motion.div className="   w-full  card  sm:z-20 p-2 bg-blue-500 md:h-[70vh] border-l-4 border-yellow-500 ">
            <div className=" md:py-2 md:px-3 p-1  ">
              <h1 className=" text-3xl md:text-6xl font-bold mb-4 font-serif md:p-2 p-1">
                {event.fieldData["venue-name"]}
              </h1>

              <div className=" py-1 text-wrap  md:w-[40vw]  ">
                <p className="sm:mb-1  text-sm md:text-2xl text-wrap font-sans font-semibold  ">
                  {event.fieldData.locaition}
                </p>
              </div>

              <div className="md:py-2   md:text-xl">
                <p className="md:py-2 flex  gap-2 md:gap-6">
                  <span className="text-gray-500  ">Min . Age </span>
                  <span className="font-semibold">{event.fieldData["18"]}</span>
                </p>

                <p className="md:py-2 flex gap-2  md:gap-6">
                  <span className="text-gray-500  ">Cost </span>
                  <span className="font-semibold">${event.fieldData.valu}</span>
                </p>

                <p className="md:py-2 flex gap-2 md:gap-6">
                  <span className="text-gray-500  ">
                    DO you have a question
                  </span>
                  <span className="font-semibold underline text-color">
                    Contact the Promoter
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
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
              <motion.div
                style={{ scale }}
                className=" flex gap-1  sm:gap-2  flex-wrap"
              >
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
          <motion.div style={{ scale }} className="p-2 sm:p-5">
            <p className="text-sm sm:text-2xl font-sans leading-relaxed  text-center font-semibold">
              {event.fieldData.summary}
            </p>
          </motion.div>
        </div>
        {/* vedio-- */}

        {event.fieldData.vedio && (
          <div className="mb-4 md:my-7 py-2 md:py-4">
            <h3 className="text-2xl md:text-4xl font-bold font-serif mb-2 md:py-6 text-center">
              Media Video
            </h3>
            <motion.div style={{ scale: s3 }} className="h-[25rem] mx-auto">
              <iframe
                className="w-full h-full"
                src={embedUrl}
                title="Event Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        )}

        {/* map */}
        <div className="md:py-8 md:my-7 my-3 py-3">
          <h3 className="text-2xl md:text-4xl font-bold font-serif mb-2 md:py-6 text-center">
            Get Directions
          </h3>
          <div className="h-[25rem]  md:h-[30rem]">
            <iframe
              src={event.fieldData.map}
              width="100%"
              height="300"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg w-full h-full"
              title="Event Location Map"
            ></iframe>
          </div>
        </div>

        {/* last  */}
        <div className="md:my-8 md:py-5 py-2 my-4">
          <h2 className=" text-xl md:text-5xl my-2 font-serif font-semibold ">
            UPCOMING EVENTS
          </h2>
          <p className="md:py-4 py-3 md:my-5 bg-color md:px-5 px-2  text-sm md:text-2xl text-white">
            NO UPCOMING EVENT UNDER THIS VENUE
          </p>
        </div>
      </div>
    </div>
  );
};

export default VenuDetail;
