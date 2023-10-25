import React from "react";
import { Link } from "react-router-dom";
import "./smallcardstyles.css";
import {BsPlayCircle} from "react-icons/bs"

function SmallCard({ id, title, displayImage, onClick}) {
  return (
    <Link to={`/podcasts`}>
      <div className="podcast-card-smallcard">
        <img className="display-image-podcast-smallcard" src={displayImage} alt={title} />
        <p className="title-podcast-smallcard">{title}</p>
        <BsPlayCircle  onClick={()=>{
        
          {onClick(true)}
          console.log("clicked");
        }
          } color="white"/>
        
      </div>
    </Link>
  );
}

export default SmallCard;
