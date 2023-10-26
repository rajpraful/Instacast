import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastsSlice";
import PodcastCard from "../components/Podcast/PodcastCard";
import InputComponent from "../components/common/Input";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsCast } from "react-icons/bs";
import { GoLinkExternal } from "react-icons/go";
import { BiSolidArrowFromTop, BiSolidArrowToTop } from "react-icons/bi";
import SmallCard from "../components/Podcast/SmallCard";
import MediumCard from "../components/Podcast/MediumCard";
import Loader from "../components/common/Loader";
import AudioPlayer from "../components/Podcast/AudioPlayer";

function Podcasts() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [spotify, setSpotify] = useState("");
  const [playingFile, setPlayingFile] = useState("");
  const [toggle, setToggle] = useState(false);

  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
        setFilteredPodcasts(podcastsData);
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    const spotifysearch = async () => {
      const url =
        "https://spotify81.p.rapidapi.com/top_200_tracks?country=IN&period=weekly&date=2023-09-21";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7be0011a10mshe705355d9d78470p1c6866jsnd5b80830d00a",
          "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const playlist = [];
        let count = 0;
        console.log(typeof result);
        result.forEach((item) => {
          if (count > 10) {
            return;
          }
          playlist.push(item.trackMetadata);
          count++;
        });
        console.log(playlist);
        setSpotify(playlist);
      } catch (error) {
        console.error(error);
      }
    };
    spotifysearch();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const filteredData = podcasts.filter((item) =>
      item.title.trim().toLowerCase().includes(text.trim().toLowerCase())
    );
    setFilteredPodcasts(filteredData);
  };

  const handleFilter = (value) => {
    setGenre(value);
    if (value !== "all") {
      const filteredData = podcasts.filter(
        (item) => item.genre?.toLowerCase() === value.toLowerCase()
      );
      setFilteredPodcasts(filteredData);
    } else {
      setFilteredPodcasts(podcasts);
    }
  };

  return (
    <div className="discover-sidebar-flex">
      <div className="input-wrapper-podcast" style={{ marginTop: "1rem" }}>
        <div className="discover-header">
          <div>
            <h1>Discover</h1>
          </div>
          <div className="discover-icons">
            <BiDotsHorizontalRounded />
            <BsCast />
            <GoLinkExternal />
          </div>
        </div>
        <InputComponent
          state={search}
          setState={handleSearch}
          placeholder="Search by Title"
          type="text"
          className={"podcast-search-bar"}
        />
        <div className="genre-filter" style={{}}>
          <select
            name="genre"
            id="genre"
            value={genre}
            onChange={(e) => {
              handleFilter(e.target.value);
            }}
            className="custom-input-filter"
            style={{ width: "100%", height: "100%" }}
          >
            <option value="tech">Tech</option>
            <option value="business">Business</option>
            <option value="finance">Finance</option>
            <option value="personal">Personal</option>
            <option value="others">Others</option>
            <option value="all">Genre - All</option>
          </select>
        </div>
        {filteredPodcasts.length > 0 ? (
          <>
            <div className="podcasts-flex" style={{ marginTop: "1.5rem" }}>
              {filteredPodcasts.map((data, i) => {
                return (
                  <PodcastCard
                    key={i}
                    title={data.title}
                    id={data.id}
                    displayImage={data.displayImage}
                  />
                );
              })}
            </div>
          </>
        ) : search ? (
          <p>No podcasts found</p>
        ) : (
          <p>No podcasts on platform</p>
        )}

        {spotify && (
          <>
            <h2 className="spotifyHeading">Current Top Charts of the week</h2>
            <div
              className="podcasts-flex-medium"
              style={{ marginTop: "1.5rem" }}
            >
              {spotify.map((data, i) => {
                return (
                  <MediumCard
                    key={i}
                    title={data.trackName}
                    id={data.id}
                    displayImage={data.displayImageUri}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      <div
        className={`sidebar hideInMobile ${
          toggle ? "toggle-out" : "toggle-in"
        }`}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <h5
            style={{
              marginTop: "15px",
              color: "grey",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            Trending now
          </h5>
          <div onClick={() => setToggle(!toggle)}>
            {toggle ? <BiSolidArrowToTop /> : <BiSolidArrowFromTop />}
          </div>
        </div>
        <div
          className="podcasts-flex-sidebar"
          style={{
            marginTop: "1.5rem",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {spotify ? (
            spotify.map((data, i) => {
              return (
                <SmallCard
                  key={i}
                  title={data.trackName}
                  id={data.tackName}
                  displayImage={data.displayImageUri}
                  onClick={(state) => setPlayingFile(state)}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>

      {playingFile && (
        <AudioPlayer audioSrc={"/audiosample.mp3"} image={"/audioImage.jpg"} />
      )}
    </div>
  );
}

export default Podcasts;
