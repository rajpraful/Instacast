import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastsSlice";
import PodcastCard from "../components/Podcast/PodcastCard";
import InputComponent from "../components/common/Input";

function Podcasts() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
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
    <div className="input-wrapper" style={{ marginTop: "1rem" }}>
      <h1>discover podcasts</h1>
      <InputComponent
        state={search}
        setState={handleSearch}
        placeholder="Search by Title"
        type="text"
      />
      <div style={{ textAlign: "right", width: "100%" }}>
        <select
          name="genre"
          id="genre"
          value={genre}
          onChange={(e) => {
            handleFilter(e.target.value);
          }}
          className="custom-input"
          style={{ width: "150px" }}
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
      ) : search ? (
        <p>No podcasts found</p>
      ) : (
        <p>No podcasts on platform</p>
      )}
    </div>
  );
}

export default Podcasts;
