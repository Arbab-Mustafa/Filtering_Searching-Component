import React from "react";

const AddEvent = () => {
  return (
    <div className="border-transparent  w-[65%] mx-auto">
      <div className=" text-xl md:text-[50px] md:font-semibold font-serif py-2 md:py-5">
        <h1>Submit An Event </h1>
      </div>

      {/* ---- Parent Adding div from Form ---- */}
      <div className=" border border-gray-300 rounded-2xl py-2 px-1 md:p-4">
        {/* -- Form -- */}
        <form>
          {/* 1.---- Start Basic ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Basic
            </h2>
            <div>
              {/* 1 */}
              <div>
                <label>Event Name</label>
                <input type="text" placeholder="Award-winning |" />
              </div>
              {/* 2 */}
              <div>
                <span>
                  <label>Event Starts</label>
                  <input type="date" />
                </span>
                <span>
                  <label>Start time</label>
                  <input type="text" />
                </span>
                <span>
                  <label>Event End</label>
                  <input type="date" />
                </span>
                <span>
                  <label>End time</label>
                  <input type="text" />
                </span>
              </div>
            </div>
          </div>
          {/* 2.---- Venue ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Venue
            </h2>
            <div>
              <span>
                <label>City</label>
                <input type="text" />
              </span>
              <span>
                <label>Venue Name</label>
                <input type="text" placeholder="type your venue name here" />
              </span>
              <span>
                <label>Venue Address</label>
                <input type="text" placeholder="type your venue Address here" />
              </span>
              <span>
                <label>Venue Mail</label>
                <input type="text" placeholder="type your venue  Mail here" />
              </span>
            </div>
          </div>
          {/* 3.---- Lineup ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Lineup
            </h2>
            <div>
              <textarea
                placeholder="type your lineup here"
                cols={15}
                rows={5}
              />
            </div>
          </div>
          {/* 4.---- Genres ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Genres
            </h2>
            <div>
              <span>
                <label>Genre 1</label>
                <input type="text" placeholder="type your genre here" />
              </span>
              <span>
                <label>Genre 2</label>
                <input type="text" placeholder="type your genre here" />
              </span>
            </div>
          </div>
          {/* 5.---- Details ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Details
            </h2>
            <div>
              <textarea
                placeholder="type your details here"
                cols={15}
                rows={5}
              />
            </div>
          </div>
          {/* 6.---- Other ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Other
            </h2>
            <div>
              <span>
                <label>Cost</label>
                <input type="text" placeholder="type your age here" />
              </span>
              <span>
                <label>Age</label>
                <input type="text" placeholder="type your age here" />
              </span>
            </div>
          </div>
          {/* 7.---- Promoters   ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Promoters
            </h2>
            <div>
              <span>
                <label>Primary Promoter Mail</label>
                <input type="text" placeholder="Admin Mail" />
              </span>
            </div>
          </div>
          {/* links - Tickets */}

          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Promotional Links
            </h2>
            <div>
              <span>
                <label>Website name</label>
                <input type="text" placeholder="Website" />
              </span>

              <span>
                <label>Website URL</label>
                <input type="text" placeholder="Website" />
              </span>
            </div>
            <div>
              <h2>Ticket Links</h2>
              <div>
                <span>
                  <input type="text" placeholder="Ticket URL" />
                </span>
              </div>
            </div>
          </div>

          {/* 8.---- Images ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Images
            </h2>
            <div>
              <span>
                <label>Event Image</label>
                <input type="file" />
              </span>
            </div>
          </div>
          {/* 9.---- Youtube media links ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Media
            </h2>
            <p>
              Add SoundCloud, YouTube or Mixcloud media links to embed them on
              your event page.
            </p>
            <div>
              <span>
                <label>Media links</label>
                <input type="text" placeholder="Link" />
              </span>
            </div>
          </div>
          {/* 10.----  Recurring ---- */}
          <div>
            <h2 className="text-[24px] md:text-[32px] font-sans font-semibold py-2 px-2 md:py-4 my-4 md:my-2 ">
              Recurring
            </h2>
            <p>Add recurring</p>
            <div>
              <span>
                <label>Yes</label>
                <input type="radio" />
              </span>
              <span>
                <label>No</label>
                <input type="radio" />
              </span>
            </div>
          </div>
          {/* 11.----   Recomeded---- */}
          <div></div>
          {/* 12.----  Bali ---- */}
          <div></div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
