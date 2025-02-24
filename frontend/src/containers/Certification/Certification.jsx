import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Certification.scss";
import Certification1 from "../../assests/certification1.png";
import Certification2 from "../../assests/certification4.png";
import Certification3 from "../../assests/certification3.png";

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
          {/* Certifications */}
          <span>Certifications</span>
        </h2>
        <div className="Certification_Cards">
          <div className="Certification_Card">
            <img className="Certification_Image" src={Certification1} alt="" />
            <p>
              <h4>Data Structure and Algorithm</h4>
              <p>
                Completed Data Structures and Algorithms course, mastering
                sorting, searching, recursion, dynamic programming, and
                problem-solving for optimized code efficiency.
              </p>
            </p>
            <div className="Certification_Buttons">
              {/* <a href="">
              <button>Preview</button>
              </a> */}
              <a
                href="https://drive.google.com/file/d/1wxrdTyMLUiZfsI7rOtp_RGtFuFyLZxh9/view?usp=sharing"
                target="_blank"
              >
                <button>View</button>
              </a>
            </div>
          </div>
          <div className="Certification_Card">
            <img className="Certification_Image" src={Certification2} alt="" />
            <p>
              <h4>Git and GitHub: Mastering Version Control</h4>
              <p>
                Completed Git and GitHub: Mastering Version Control from
                Internshala, learning branching, merging, pull requests, and
                repository management for efficient collaboration.
              </p>
            </p>
            <div className="Certification_Buttons">
              {/* <a href="">
                <button>Preview</button>
              </a> */}
              <a
                href="https://trainings.internshala.com/view_certificate/3pqgfofth6i/49j7rouilxi/"
                target="_blank"
              >
                <button>View</button>
              </a>
            </div>
          </div>
          <div className="Certification_Card">
            <img className="Certification_Image" src={Certification3} alt="" />
            <p>
              <h4>Google IT Automation</h4>
              <p>
                Google IT Support Certificate covers troubleshooting,
                networking, OS, system administration, security, and customer
                service for entry-level IT roles.
              </p>
            </p>
            <div className="Certification_Buttons">
              {/* <a href="">
                <button>Preview</button>
              </a> */}
              <a
                href="https://www.coursera.org/account/accomplishments/professional-cert/4U8F2FR8UAQ5?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=prof"
                target="_blank"
              >
                <button>View</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Certification, "app__Certifications"),
  "Certification",
  "app__primarybg"
);
