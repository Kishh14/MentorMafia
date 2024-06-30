import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { FcMultipleDevices } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import Context from "../context/Context";

const Hero = () => {
  const [filteredMentors, setFilteredMentors] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, mentorsList, setMentorUserId } = useContext(Context);

  useEffect(() => {
    const filtered = mentorsList.slice(0, 3);
    setFilteredMentors(filtered);
  }, [mentorsList]);

  const handleNavClick = (mentorType) => {
    let topMentors = mentorsList.slice(0, 3);
    let techMentors = mentorsList.filter((mentor) =>
      mentor.intrests.includes("Software Development")
    );
    let careerMentors = mentorsList.filter((mentor) =>
      mentor.intrests.includes("Career Development")
    );
    let businessMentors = mentorsList.filter((mentor) =>
      mentor.intrests.includes("Business/Startups")
    );
    let financeMentors = mentorsList.filter((mentor) =>
      mentor.intrests.includes("Finance")
    );
    let healthcareMentors = mentorsList.filter((mentor) =>
      mentor.intrests.includes("Healthcare")
    );

    if (mentorType === "Top Mentors") {
      setFilteredMentors(topMentors);
    } else if (mentorType === "Tech Mentors") {
      setFilteredMentors(techMentors);
    } else if (mentorType === "Career Mentors") {
      setFilteredMentors(careerMentors);
    } else if (mentorType === "Business Mentors") {
      setFilteredMentors(businessMentors);
    } else if (mentorType === "Finance Mentors") {
      setFilteredMentors(financeMentors);
    } else if (mentorType === "Healthcare Mentors") {
      setFilteredMentors(healthcareMentors);
    }
  };

  const handleProfileClick = (mentorId) => {
    setMentorUserId(mentorId);
    navigate("/profile");
  };

  return (
    <div className="hero-section md:px-24 lg:px-48 pt-28 pb-14 bg-black text-white">
      <div className="hero-1 flex md:flex-col lg:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-8">
        <div className="hero-1-text-content">
          <h1 className="md:text-4xl lg:text-5xl md:text-center lg:text-start font-bold mb-4">
            More Than Just Mentorship, A <br /> Thriving Community.
          </h1>
          <div className="ratings mt-7 flex gap-4 items-center md:justify-center lg:justify-start">
            <img
              className="w-36 md:w-40 lg:w-36"
              src={
                "https://assets-global.website-files.com/5d3ead70b1eba4033920a2bd/61a7c5ffe862e23e0a5dc735_4.9%20Stars.png"
              }
              alt="Ratings"
            />
            <span className="mt-2">4.92/5 Rating</span>
          </div>
          {isLoggedIn ? (
            <Link
              to={"/mentors"}
              className="bg-blue-700 text-white py-3 inline-block px-14 mt-7 rounded md:block lg:inline-block md:w-3/6 lg:w-full md:mx-auto md:text-center"
            >
              Our Mentors
            </Link>
          ) : (
            <Link
              to={"/signup"}
              className="bg-blue-700 text-white py-3 inline-block px-10 mt-7 rounded md:block lg:inline md:w-3/6 lg:w-full md:mx-auto md:text-center"
            >
              Become a Member
            </Link>
          )}
        </div>
        <img
          className="md:w-52"
          style={{ width: "57%" }}
          src="/assets/header/hero-background-2.png"
          alt="People in Call"
        />
      </div>
      <div className="hero-2 my-28">
        <div className="category-nav flex justify-center align-center gap-14">
          <button
            className="category-nav-link pb-2 text-sm"
            onClick={() => handleNavClick("Top Mentors")}
          >
            <FcApproval className="text-2xl m-auto mb-2" />
            Top Mentors
          </button>
          <button
            className="category-nav-link pb-2 text-sm"
            onClick={() => handleNavClick("Tech Mentors")}
          >
            <FcMultipleDevices className="text-2xl m-auto mb-2" />
            Tech Mentors
          </button>
          <button
            className="category-nav-link pb-2 text-sm"
            onClick={() => handleNavClick("Career Mentors")}
          >
            <FcRules className="text-2xl m-auto mb-2" />
            Career Mentors
          </button>
          <button
            className="category-nav-link pb-2 text-sm"
            onClick={() => handleNavClick("Business Mentors")}
          >
            <FcBullish className="text-2xl m-auto mb-2" />
            Business Mentors
          </button>
          <button
            className="category-nav-link pb-2 text-sm"
            onClick={() => handleNavClick("Finance Mentors")}
          >
            <FcCurrencyExchange className="text-2xl m-auto mb-2" />
            Finance Mentors
          </button>
          <button
            className="category-nav-link pb-2 text-sm"
            onClick={() => handleNavClick("Healthcare Mentors")}
          >
            <FcDepartment className="text-2xl m-auto mb-2" />
            Healthcare Mentors
          </button>
        </div>
        <div className="card-container flex align-center justify-between md:gap-10 my-12">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((mentor) => {
              return (
                <div
                  className="mentor-card bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-sm shadow-md max-w-xs min-h-64 block"
                  key={mentor.$id}
                >
                  <img
                    className="w-64 rounded-lg mb-2 cursor-pointer"
                    src={mentor.image || "https://via.placeholder.com/80x80"}
                    alt={mentor.userName}
                    onClick={() => handleProfileClick(mentor.$id)}
                  />
                  <div className="mentor-info flex justify-between px-1">
                    <p
                      className="cursor-pointer"
                      onClick={() => handleProfileClick(mentor.$id)}
                    >
                      {mentor.userName}
                    </p>
                    <div className="mentor-rating flex gap-2">
                      5.0{" "}
                      <img
                        src={
                          "https://assets-global.website-files.com/5d3ead70b1eba4033920a2bd/62ca00c609e7a23bc8e9e541_GreenStar.svg"
                        }
                        alt="1-Star"
                      />
                    </div>
                  </div>
                  <p className="text-xs px-1 mt-1">
                    {mentor.mentorBio || "N/A"}
                  </p>
                  <button
                    className="w-full bg-green-600 p-1 mt-3 rounded"
                    onClick={() => handleProfileClick(mentor.$id)}
                  >
                    Know More
                  </button>
                </div>
              );
            })
          ) : (
            <h3 className="my-3 text-center">No Data Found...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
