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
          `${process.env.REACT_APP_API_URL}/events/getEvents/${city}`
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

      <div className="p-6 ">
        <h1 className="text-xl md:text-5xl text-center font-bold capitalize my-2 md:my-8">
          Events in {city}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {events.map((event) => (
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl rounded-xl transform transition-transform hover:scale-105 hover:shadow-2xl">
              <Link to={`/event/${event._id}`}>
                <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
                  <img
                    src={event.fieldData.Main_Image}
                    alt={event.fieldData.name}
                    className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-80"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
                    <h2 className="text-white text-lg md:text-2xl font-bold truncate">
                      {event.fieldData.name.substring(0, 15)}
                    </h2>
                    <span className="flex items-center text-white text-sm md:text-base">
                      <p>
                        {new Date(event.fieldData.startDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-b-xl">
                  <p className="text-gray-700 text-sm md:text-base">
                    {event.fieldData.Details.substring(0, 80) + "..."}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventsByCity;
