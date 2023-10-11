import React, { useState, useEffect } from "react";
import { doc, getDoc, collection, query, onSnapshot } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, auth } from "../firebase";
import Button from "../components/common/Button";
import EpisodeDetails from "../components/Podcast/EpisodeDetails";
import AudioPlayer from "../components/Podcast/AudioPlayer";

function PodcastDetails() {
  const [details, setDetails] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [playingFile, setPlayingFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const podcastDoc = await getDoc(doc(db, "podcasts", id));
          if (podcastDoc.exists()) {
            const podcastData = podcastDoc.data();
            setDetails({ id: id, ...podcastData });
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    const fetchEpisodes = async () => {
      if (id) {
        try {
          onSnapshot(
            query(collection(db, "podcasts", id, "episodes")),
            (querySnapshot) => {
              const episodesData = [];
              querySnapshot.forEach((doc) => {
                episodesData.push({ id: doc.id, ...doc.data() });
              });
              setEpisodes(episodesData);
            },
            (error) => {
              console.error("Error fetching episodes:", error);
            }
          );
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    fetchData();
    fetchEpisodes();
  }, [id]);

  return (
    <div>
      <div className="input-wrapper" style={{ marginTop: "0rem" }}>
        {details && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "1rem",
              }}
            >
              <h1 className="podcast-title-heading">{details.title}</h1>
              {details.createdBy === auth.currentUser.uid && (
                <Button
                  width={"200px"}
                  text={"Create Episode"}
                  onClick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper">
              <img src={details.bannerImage} alt={details.title} />
            </div>
            <p className="podcast-description">{details.description}</p>
            <h1 className="podcast-title-heading">Episodes</h1>
            {episodes.length > 0 ? (
              <>
                {episodes.map((episode, index) => {
                  return (
                    <EpisodeDetails
                      key={index}
                      index={index + 1}
                      title={episode.title}
                      description={episode.description}
                      audioFile={episode.audioFile}
                      onClick={(file) => setPlayingFile(file)}
                    />
                  );
                })}
              </>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && (
        <AudioPlayer audioSrc={playingFile} image={details.displayImage} />
      )}
    </div>
  );
}

export default PodcastDetails;
