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
  return (
    <div className="input-wrapper" style={{ marginTop: "1rem" }}>
      <h1>discover podcasts</h1>
      <InputComponent
        state={search}
        setState={handleSearch}
        placeholder="Search by Title"
        type="text"
      />
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
