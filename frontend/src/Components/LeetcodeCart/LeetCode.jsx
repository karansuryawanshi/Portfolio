import { useEffect, useRef, useState } from "react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import "./LeetCode.scss";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { CheckCheck } from "lucide-react";
import { ExternalLink } from "lucide-react";

const LeetCode = () => {
  const [userData, setUserData] = useState(null);
  const [recent, setRecent] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [weeks, setWeeks] = useState([]);

  const heatmapRef = useRef(null);
  const calRef = useRef(null);

  const username = "Karan_Suryawanshi";

  async function getUserData(username) {
    console.log("Function called");

    const res = await fetch(
      "https://leetcode-backend-0yu1.onrender.com/leetcode-profile",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      }
    );
    const data = await res.json();
    setUserData(data.data);
  }
  useEffect(() => {
    getUserData("Karan_Suryawanshi");
  }, []);

  useEffect(() => {
    async function fetchCalendar() {
      const res = await fetch(
        "https://leetcode-backend-0yu1.onrender.com/leetcode-calendar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "Karan_Suryawanshi" }),
        }
      );
      const data = await res.json();

      const submissionCalendar = JSON.parse(
        data.data.matchedUser.userCalendar.submissionCalendar
      );
      const heatmapData = Object.entries(submissionCalendar).map(
        ([time, count]) => ({
          date: new Date(parseInt(time) * 1000).toISOString().split("T")[0],
          count,
        })
      );

      setCalendarData(heatmapData);
      setWeeks(transformLeetCodeCalendar(submissionCalendar));
    }

    fetchCalendar();
  }, []);

  function transformLeetCodeCalendar(submissionCalendar) {
    const parsed = Object.entries(submissionCalendar).reduce(
      (acc, [time, count]) => {
        const date = new Date(parseInt(time) * 1000)
          .toISOString()
          .split("T")[0];
        acc[date] = count;
        return acc;
      },
      {}
    );

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 364);
    let days = [];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().split("T")[0];
      const count = parsed[iso] || 0;
      days.push({
        date: iso,
        contributionCount: count,
        color:
          count === 0
            ? "#ffffff15" // non-active visible as light gray
            : count < 2
            ? "#9be9a8"
            : count < 4
            ? "#40c463"
            : count < 6
            ? "#30a14e"
            : "#216e39",
      });
    }

    // Group into weeks (7 days each)
    let weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push({ contributionDays: days.slice(i, i + 7) });
    }
    return weeks;
  }

  useEffect(() => {
    async function fetchRecent() {
      const res = await fetch(
        "https://leetcode-backend-0yu1.onrender.com/leetcode-recent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "Karan_Suryawanshi" }),
        }
      );
      const data = await res.json();
      setRecent(data?.recent?.slice(0, 3));
    }

    fetchRecent();
  }, []);

  return (
    <>
      {/* <h2 className="Leetcode_profile_header">LeetCode Profile</h2> */}
      <SpotlightCard backgroundColor="#ff8c00ff" spotlightColor="#ffffff5c">
        <div className="Leetcode_profiles_card_header">
          <img
            src={userData?.matchedUser?.profile?.userAvatar}
            width={50}
            height={50}
            alt="Profile_Image"
          />
          <div className="Leetcode_profiles_name">
            <h3>Karan Suryawanshi</h3>
            <p>
              <span>
                <a
                  style={{ textDecoration: "none", color: "inherit" }}
                  target="_blank"
                  href="https://leetcode.com/u/Karan_Suryawanshi/"
                >
                  @{username}
                </a>
              </span>
              <span>
                <ExternalLink width={16} height={16} />
              </span>
            </p>
          </div>
        </div>

        <div className="Leetcode_profile_stats">
          <p>
            <span>
              {userData?.matchedUser?.submitStats?.acSubmissionNum[0].count}
            </span>{" "}
            All
          </p>
          <p>
            <span>
              {userData?.matchedUser?.submitStats?.acSubmissionNum[1].count}
            </span>{" "}
            Easy
          </p>
          <p>
            <span>
              {userData?.matchedUser?.submitStats?.acSubmissionNum[2].count}
            </span>{" "}
            Medium
          </p>
          <p>
            <span>
              {userData?.matchedUser?.submitStats?.acSubmissionNum[3].count}
            </span>{" "}
            Hard
          </p>
        </div>
        <div className="CalendarHeatmap" style={{ width: "100%" }}>
          <div className="leetcode_chart">
            <div
              // className="leetcode_chart"
              style={{ display: "flex", gap: "2px" }}
            >
              {weeks.map((week, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    {week.contributionDays.map((day, idx2) => {
                      // console.log("Day is :- ", day);
                      return (
                        <div
                          key={idx2}
                          title={`${day.date}: ${day.contributionCount} submissions`}
                          className="LeetcodeChart_day"
                          style={{
                            backgroundColor: `${
                              day.contributionCount == 0
                                ? "#ffffff2b"
                                : day.color
                            }`,
                            borderRadius: "2px",
                          }}
                        ></div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="Recent_Activity"
            style={{
              color: "aliceblue",
              fontSize: "1.1rem",
              margin: "10px 5px 10px 5px",
            }}
          >
            <p>Recent Activity</p>
          </div>
          {recent.map((item) => {
            // console.log(item);

            const num = item?.beatPercentage;
            const formatted = parseFloat(num.toFixed(3));

            function getTimeAgo(timestamp) {
              const now = Date.now();
              const past = timestamp * 1000;
              const diff = now - past;

              const seconds = Math.floor(diff / 1000);
              const minutes = Math.floor(seconds / 60);
              const hours = Math.floor(minutes / 60);
              const days = Math.floor(hours / 24);

              if (seconds < 60) return `${seconds} sec ago`;
              if (minutes < 60) return `${minutes} min ago`;
              if (hours < 24) return `${hours} hr ago`;
              return `${days} day${days > 1 ? "s" : ""} ago`;
            }

            let ans = getTimeAgo(item?.timestamp);

            return (
              <div className="Leetcode_commits">
                <div className="Arrows">
                  <CheckCheck />
                </div>
                <p className="Leetcode_commit">
                  <p className="Leetcode_commit_action">
                    <span>{item?.questionId} </span>
                    <span>{item?.title}</span>
                  </p>
                  <span className="Leetcode_commit_time">
                    Beats :- {formatted} • {ans}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </SpotlightCard>
    </>
  );
};

export default LeetCode;
