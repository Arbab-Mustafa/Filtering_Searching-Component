/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "./Card";
import { CiLocationOn, CiCalendar, CiSearch } from "react-icons/ci";
import Loader from "./loading";
import axios from "axios";

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [eventCounts, setEventCounts] = useState({});
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [daysToShow, setDaysToShow] = useState(3);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSetDisplayedEvents();
  }, [events, city, date, searchTerm, daysToShow]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/events/getAllEvents`
      );
      const data = response.data;

      if (!Array.isArray(data)) {
        throw new Error("Expected response data to be an array");
      }

      // Sort events by date
      const sortedEvents = data.sort((a, b) => {
        // Convert startDate to Date objects
        const dateA = new Date(a.fieldData.startDate);
        const dateB = new Date(b.fieldData.startDate);

        // Compare dates
        return dateA - dateB;
      });
      setEvents(sortedEvents);
      filterAndSetDisplayedEvents(sortedEvents); // Set displayed events after fetching
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSetDisplayedEvents = (eventsData = events) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    const normalizedCity = city.toLowerCase().trim();
    const normalizedDate = date
      ? new Date(date).toISOString().split("T")[0] // Format as YYYY-MM-DD
      : null;

    const filteredEvents = eventsData.filter((event) => {
      const fieldData = event.fieldData || {};
      const eventDate = fieldData.startDate
        ? new Date(fieldData.startDate).toISOString().split("T")[0] // Format as YYYY-MM-DD
        : null;
      const normalizedEventName = fieldData.name
        ? fieldData.name.toLowerCase()
        : "";
      const normalizedEventLocation = fieldData.VenueAddress
        ? fieldData.VenueAddress.toLowerCase()
        : "";
      const normalizedEventNeighborhood = fieldData.cities
        ? fieldData.cities.toLowerCase()
        : "";

      return (
        (normalizedEventName.includes(normalizedSearchTerm) ||
          normalizedEventLocation.includes(normalizedSearchTerm)) &&
        (normalizedCity === "" ||
          normalizedEventLocation.includes(normalizedCity) ||
          normalizedEventNeighborhood.includes(normalizedCity)) &&
        (normalizedDate === null || eventDate === normalizedDate)
      );
    });

    const currentDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const todayEvents = filteredEvents.filter((event) => {
      const eventDate = event.fieldData.startDate
        ? new Date(event.fieldData.startDate).toISOString().split("T")[0] // Format as YYYY-MM-DD
        : null;
      return eventDate && eventDate >= currentDate;
    });

    const groupedByDate = todayEvents.reduce((groups, event) => {
      const eventDate = new Date(event.fieldData.startDate)
        .toISOString()
        .split("T")[0]; // Format as YYYY-MM-DD
      if (!groups[eventDate]) {
        groups[eventDate] = [];
      }
      groups[eventDate].push(event);
      return groups;
    }, {});

    const initialEventCounts = {};
    for (const date in groupedByDate) {
      initialEventCounts[date] = groupedByDate[date].length; // Count of events per date
    }

    // Select only the first 'daysToShow' days to display
    const displayedEventsLimited = Object.keys(groupedByDate)
      .sort()
      .slice(0, daysToShow)
      .reduce((obj, key) => {
        obj[key] = groupedByDate[key];
        return obj;
      }, {});

    setEventCounts(initialEventCounts);
    setDisplayedEvents(displayedEventsLimited);
  };

  const loadMoreEventsForDate = (date) => {
    setEventCounts((prevCounts) => ({
      ...prevCounts,
      [date]: prevCounts[date] + 4,
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCity("");
    setDate(null);
  };

  const dateIntoString = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", options);
  };

  const loadMoreDays = () => {
    console.log("Loading more days");
    setDaysToShow((prevDays) => prevDays + 2);
  };

  return (
    <div className="container mx-auto p-4 my-5">
      <div className="flex justify-center items-center mt-4 mb-10">
        <div
          className="bg-teal-500 py-10 px-3 w-full rounded-xl mb-5"
          style={{ backgroundColor: "#408dbc" }}
        >
          <h2 className="text-5xl text-white mb-10 px-5 hidden md:block font-sans font-semibold leading-5">
            Latest Events and Concerts
          </h2>
          <div className="flex flex-wrap justify-between flex-col md:flex-row items-center px-3 gap-4">
            <div className="flex items-center bg-white py-2 px-1 rounded-lg overflow-hidden w-[100%] md:w-52 flex-grow relative">
              <div className="flex-grow">
                <div>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="inline-flex w-[80%] justify-center gap-x-1.5 rounded-md  outline-none active:outline-none px-3 py-2 text-sm font-semibold text-gray-900  bg-transparent  overflow-y-scroll  hover:bg-gray-50 appearance-none"
                    id="menu-button"
                  >
                    <option
                      disabled
                      value=""
                      className="font-bold text-sm md:text-xl"
                    >
                      Choose City
                    </option>
                    <optgroup label="Indonesia">
                      <option value="Bali">Bali</option>
                    </optgroup>
                    <optgroup label="Australia">
                      <option value="Perth">Perth</option>
                      <option value="Gold Coast">Gold Coast</option>
                      <option value="Sydney">Sydney</option>
                      <option value="Melbourne">Melbourne</option>
                    </optgroup>
                    <optgroup label="Thailand">
                      <option value="Bangkok">Bangkok</option>
                      <option value="Phuket">Phuket</option>
                    </optgroup>
                    <optgroup label="Singapore">
                      <option value="Singapore">Singapore</option>
                    </optgroup>
                    <optgroup label="Japan">
                      <option value="Tokyo">Tokyo</option>
                      <option value="Osaka">Osaka</option>
                    </optgroup>
                    <optgroup label="Philippines">
                      <option value="Manila">Manila</option>
                    </optgroup>
                    <optgroup label="South Korea">
                      <option value="Seoul">Seoul</option>
                    </optgroup>
                    <optgroup label="Taiwan">
                      <option value="Taipei">Taipei</option>
                    </optgroup>
                    <optgroup label="Malaysia">
                      <option value="Kuala Lumpur">Kuala Lumpur</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              {/*  */}
              {city && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 text-base md:text-lg"></span>
              )}
              {!city && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700">
                  <CiLocationOn className="text-xl md:text-3xl" />
                </span>
              )}
            </div>

            <label className="flex items-center bg-white relative z-[170] py-2 px-1 rounded-lg w-[100%] md:w-52 flex-grow cursor-pointer shadow-md border border-gray-300">
              <DatePicker
                selected={date}
                onChange={(e) => setDate(e)}
                placeholderText="Choose Date"
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 border-none outline-none bg-white pr-10 appearance-none placeholder-gray-600 font-semibold text-base md:text-lg"
                calendarClassName="custom-calendar" // Custom class for the calendar
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <CiCalendar className="w-6 h-6 text-gray-700" />
              </span>
            </label>

            <div className="flex items-center bg-white py-2 px-1 rounded-lg  w-[100%] md:w-52 overflow-hidden flex-grow relative">
              <input
                type="text"
                placeholder="Search Event"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border-none outline-none placeholder-gray-600 font-semibold bg-white"
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <CiSearch className="w-8 h-9 font-semibold text-black" />
              </span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <button
              onClick={clearFilters}
              className="text-white underline px-2 font-semibold py-1"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {Object.keys(displayedEvents).length > 0
            ? Object.keys(displayedEvents).map((date) => (
                <div key={date} className="md:mb-8">
                  <div className="sticky top-0 bg-opacity-70 backdrop-blur-md z-[10] py-2 md:py-4 md:mb-3 px-2 md:px-4 rounded-md">
                    <h3 className="text-xl md:text-4xl font-semibold md:text-yellow-500">
                      {dateIntoString(date)}
                    </h3>
                  </div>
                  <div className="cards-container w-full grid md:gap-4 md:my-6 gap-1   my-0">
                    {displayedEvents[date]
                      .slice(0, eventCounts[date])
                      .map((event, index) => (
                        <Card key={index} event={event} />
                      ))}
                  </div>
                  {displayedEvents[date].length > eventCounts[date] && (
                    <button
                      onClick={() => loadMoreEventsForDate(date)}
                      className=" mt-4 border  text-xs md:text-xl md:border-2 flex justify-center border-yellow-500 md:bg-yellow-500 md:hover:bg-yellow-600 mx-auto text-yellow-500 md:text-black md:font-semibold py-1 md:py-2 px-3 md:px-4 rounded-full "
                    >
                      Load More
                    </button>
                  )}
                </div>
              ))
            : !loading && (
                <div className="text-center text-gray-600">
                  No events found. Please adjust your filters.
                </div>
              )}
          {/* Load more days button */}
          {Object.keys(displayedEvents).length > 0 && (
            <button
              onClick={loadMoreDays}
              className="mt-4 border flex justify-center border-yellow-500  bg-yellow-500 md:hover:bg-yellow-600 mx-auto text-white  md:text-black font-semibold text-base md:text-xl py-2 md:py-3 px-5  rounded-full md:rounded"
            >
              See all events
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
