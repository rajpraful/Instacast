import React from "react";
import { Link } from "react-router-dom";
import "./smallcardstyles.css";
import {BsPlayCircle} from "react-icons/bs"

function MediumCard({ id, title, displayImage }) {
  return (
    <Link to={`/podcasts`}>
      <div className="podcast-card-mediumcard">
        <img className="display-image-podcast-mediumcard" src={displayImage} alt={title} />
        <p className="title-podcast-mediumcard">{title}</p>
        <BsPlayCircle style={{marginLeft:"5px"}} color="white"/>
        
      </div>
    </Link>
  );
}

export default MediumCard;
