import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const CityBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState([]);

  const toggleCity = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/events/getAllEvents`
        );
        const fetchedCities = response.data
          .flatMap((event) => event.fieldData.cities)
          .map((ci) => ci.toLowerCase()) // Convert to lowercase for uniformity
          .filter((city, index, self) => self.indexOf(city) === index); // Remove duplicates

        setCity(fetchedCities);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchEvents();
  }, []);

  const sortedCities = city.sort((a, b) => a.localeCompare(b));

  return (
    <div>
      <div
        className="flex justify-between my-2 text-[1.3rem] items-center gap-3 md:gap-5 text-[#408DBC] px-6 md:px-10 bg-white hover:bg-transparent hover:border-2 border-white cursor-pointer rounded-full py-3 delay-150"
        onClick={toggleCity}
      >
        <span className="text-sm md:text-lg">
          <FaLocationDot />
        </span>
        <span className="text-lg md:text-[1.2rem] font-semibold">City</span>
        <span>{isOpen ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}</span>
      </div>

      {isOpen && (
        <div>
          <ul className="flex flex-col gap-3 bg-transparent text-pretty h-64 overflow-scroll items-start md:items-start font-[Inter] scrollbar-hide">
            {sortedCities.map((ci, index) => (
              <Link to={`/cities/${ci}`} key={index}>
                <li className="text-sm md:font-medium font-normal font-sans capitalize text-left">
                  {ci}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CityBtn;
