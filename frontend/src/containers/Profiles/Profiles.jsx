import { AppWrap, MotionWrap } from "../../wrapper";
import { useEffect, useState } from "react";
import SpotlightCard from "../../Components/SpotlightCard/SpotlightCard";
import "./Profiles.scss";
import GitHubChart from "../../Components/GitHubChart";
import { ArrowLeftRight } from "lucide-react";
import Github from "../../Components/GithubCart/Github";
import LeetCode from "../../Components/LeetcodeCart/LeetCode";

const Profiles = () => {
  return (
    <>
      <div className="Profiles_Container">
        <h2 className="head-text">
          {/* <span></span> */}
          <span>My Developer Profiles</span>
        </h2>
        <div className="Profile_container">
          <div className="Profile">
            <Github />
          </div>
          <div className="Profile">
            <LeetCode />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Profiles, "app__Profiles"),
  "Profiles",
  "app__whitebg"
);
