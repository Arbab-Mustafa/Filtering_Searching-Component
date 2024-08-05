import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./loading";
import Navbar from "./navbar";
import Footer from "./Footer";

const EventsByCity = () => {
  const { city } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/getEvents/${city}`
        );
        setEvents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [city]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl md:text-3xl font-semibold my-2 md:my-5">
          Events in {city}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link to={`/event/${event._id}`}>
              <div className="bg-white shadow-lg rounded-md w-[19rem]">
                <div className="w-64 h-52 mx-auto py-2">
                  <img
                    src={event.fieldData.Main_Image}
                    alt={event.fieldData.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h2 className=" text-base md:text-xl font-semibold ">
                    {" "}
                    {event.fieldData.name}
                  </h2>
                  <p> {event.fieldData.VenueAddress}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsByCity;
