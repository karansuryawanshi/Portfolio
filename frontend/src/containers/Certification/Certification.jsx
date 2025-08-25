import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Certification.scss";
import Google from "../../assests/Google.png";
import Internshala from "../../assests/InternshalaLogo.png";

const Certification = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data);
    });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });
    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (item === "All") {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 100);
  };

  return (
    <>
      <div className="Certification_Container">
        <h2 className="head-text">
          <span>My</span>
          <span> Certifications</span>
        </h2>
        <section className="Certification_Cards">
          <article className="Certification_Card">
            <div className="Certification_Card_Heading">
              <img src={Google} alt="Google_Logo" />
              <div>
                <p>Google IT Support</p>
                <p>Google</p>
              </div>
            </div>
            <p className="Certification_Card_Description">
              Google-certified in IT support with skills in networking, system
              administration, troubleshooting, and software management.
            </p>
            <div className="Certification_Card_Footer">
              <span className="Certification_Card_Date">
                Completed May 2024
              </span>
              <button className="Certification_Card_Verify">
                <a
                  href="https://coursera.org/share/ea716214655104c9f582a879065f08c8"
                  target="_blank"
                >
                  Verify
                </a>
              </button>
            </div>
          </article>
          <article className="Certification_Card">
            <div className="Certification_Card_Heading">
              <img src={Internshala} alt="Internshala_Logo" />
              <div>
                <p>Full Stack Development</p>
                <p>Internshala</p>
              </div>
            </div>
            <p className="Certification_Card_Description">
              Certified Full Stack Developer from Internshala Trainings with
              hands-on projects in MERN, PHP, APIs, and DSA.
            </p>
            <div className="Certification_Card_Footer">
              <span className="Certification_Card_Date">
                Completed july 2025
              </span>
              <button className="Certification_Card_Verify">
                <a
                  href="https://trainings.internshala.com/s/v/3741549/c09ff810"
                  target="_blank"
                >
                  Verify
                </a>
              </button>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Certification, "app__Certifications"),
  "Certification",
  "app__whitebg"
);
