import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import axios from "axios";

const groupVenuesByCity = (events) => {
  const grouped = events.reduce((acc, event) => {
    const city = event.city?.trim() || "Unknown City";
    const venueName = event.name?.trim() || "Unknown Venue";
    const slug = event.slug?.trim() || "unknown-slug";

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push({
      name: venueName,
      slug: slug,
    });

    return acc;
  }, {});

  return grouped;
};

const Resources = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [venuesByCity, setVenuesByCity] = useState({});

  const fetchVenuesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/venues/getAllVenues`
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        const groupedVenues = groupVenuesByCity(response.data);
        setVenuesByCity(groupedVenues);
      } else {
        console.error(
          "API response data is not in the expected format or is empty"
        );
      }
    } catch (error) {
      console.log("API Error:", error);
    }
  };

  useEffect(() => {
    fetchVenuesData();
  }, []);

  const toggleCity = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="text-white">
      <div
        className="flex justify-between gap-2 items-center   px-6 pb-2 cursor-pointer"
        onClick={toggleCity}
      >
        <h2 className="text-xl md:text-2xl font-semibold">Venues</h2>
        <span className="text-2xl">
          {isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
        </span>
      </div>

      {isOpen && (
        <div className="mt-6 space-y-6  overflow-scroll h-[10rem] md:h[15rem] invisible-scrollbar">
          {Object.keys(venuesByCity).length > 0 ? (
            <div className="grid gap-2 md:gap-3 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(venuesByCity).map(([city, venues]) => (
                <div key={city} className=" p-2 md:p-3   shadow-lg">
                  <h3 className="md:text-lg text-base font-bold mb-4 text-left  ">
                    {city}
                  </h3>
                  <ul className="">
                    {venues.map((venue) => (
                      <li key={venue.name}>
                        <a
                          href={`/venu/${venue.name}`}
                          className="block text-left  text-xs md:text-sm  transition-colors"
                        >
                          {venue.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No venues available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Resources;
