// import { AppWrap, MotionWrap } from "../../wrapper";
import { useEffect, useState } from "react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import "./Github.scss";
import GitHubChart from "../GitHubChart";
import { ArrowLeftRight, ExternalLink } from "lucide-react";

const Github = () => {
  const [repos, setRepos] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [commit, setCommit] = useState([]);
  const [timeline, setTimeline] = useState("");
  const [totalContributions, setTotalContributions] = useState();

  async function getGitHubProfile(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      console.log("Response of github is :- ", data);
      setRepos(data.public_repos);
      setFollowers(data.followers);
      setFollowing(data.following);
      setAvatar(data.avatar_url);
    } catch (error) {
      console.error(error.message);
    }
  }
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  async function getGitHubCommit(username) {
    const query = `
    {
      user(login: "karansuryawanshi") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
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
    }
    `;

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log("Data is :- ", data);
  }

  async function commits() {
    const response = await fetch(
      "https://api.github.com/users/karansuryawanshi/events",
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const result = await response.json();
    setCommit(result.slice(0, 3));
  }

  useEffect(() => {
    commits();
    getGitHubCommit("karansuryawanshi");
    getGitHubProfile("karansuryawanshi");
  }, []);

  useEffect(() => {
    const fetchTotalContributions = async () => {
      const query = `
      {
        user(login: "karansuryawanshi") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
    `;

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      // console.log("Total Contributions:", data);

      const total =
        data?.data?.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions || 0;

      // console.log(total);
      setTotalContributions(total);
    };

    fetchTotalContributions();
  }, []);

  return (
    <>
      {/* <h2 className="Github_profile_header">Github Profile</h2> */}
      <SpotlightCard
        className="spotlightCard"
        backgroundColor="rgba(0, 0, 0, 0.84)"
      >
        <div className="Github_profiles_card_header">
          <img src={avatar} width={50} height={50} alt="Profile_Image" />
          <div className="Github_profiles_name">
            <h3> Karan Suryawanshi</h3>
            <p>
              <span>
                <a
                  style={{ textDecoration: "none", all: "unset" }}
                  target="_blank"
                  href="https://github.com/karansuryawanshi"
                >
                  @karansuryawanshi
                </a>
              </span>
              <span>
                <ExternalLink width={16} height={16} />
              </span>
            </p>
          </div>
        </div>
        <div className="Github_profile_stats">
          <p className="Github_profile_repositories">
            <span>{repos}</span>
            <span>Repositories</span>
          </p>
          <p className="Github_profile_contributions">
            <span>{totalContributions}</span>
            <span>Contributions</span>
          </p>
          <p className="Github_profile_followers">
            <span>{followers}</span>
            <span>Followers</span>
          </p>
          <p className="Github_profile_following">
            <span>{following}</span>
            <span>Following</span>
          </p>
        </div>
        <div className="g_chat">
          <GitHubChart username="karansuryawanshi" token={token} />
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

        {commit?.map((item, index) => {
          function getTimeAgoFromISO(isoString) {
            const past = new Date(isoString).getTime();
            const now = Date.now();
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

          // safe access
          const commitMessage =
            item?.payload?.commits && item.payload.commits.length > 0
              ? item.payload.commits[0].message
              : null;

          return (
            <div className="Github_commits" key={index}>
              <div className="Arrows">
                <ArrowLeftRight />
              </div>
              <div className="Github_commit">
                <p className="Github_commit_action">
                  <span>{item?.type} </span>
                  <span>{item?.repo?.name?.split?.("/")[1]}</span>
                </p>
                {commitMessage ? (
                  <span className="Github_commit_time">
                    {commitMessage} • {getTimeAgoFromISO(item.created_at)}
                  </span>
                ) : (
                  <p className="Github_commit_time">No Commit Available</p>
                )}
              </div>
            </div>
          );
        })}
      </SpotlightCard>
    </>
  );
};

export default Github;
