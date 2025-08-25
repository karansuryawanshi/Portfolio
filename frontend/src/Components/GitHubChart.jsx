import React, { useEffect, useState } from "react";

const GitHubChart = ({ username, token }) => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      const query = `
      {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }`;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const fetchedWeeks =
        data.data.user.contributionsCollection.contributionCalendar.weeks;
      setWeeks(fetchedWeeks);
    };

    fetchContributions();
  }, [username, token]);

  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {weeks.map((week, idx) => (
        <div
          key={idx}
          style={{ display: "flex", flexDirection: "column", gap: "2px" }}
        >
          {week.contributionDays.map((day, idx2) => {
            return (
              <div
                key={idx2}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className="GithubChart_day"
                style={{
                  // width: "8px",
                  // height: "8px",
                  backgroundColor:
                    day.contributionCount === 0 ? "#ffffff15" : day.color,
                  borderRadius: "2px",
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GitHubChart;
