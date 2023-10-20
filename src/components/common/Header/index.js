import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";

const Header = () => {
  const user = useSelector((state) => state.user?.user);
  return (
    <nav className="navbar">
      {user?.profileImage && (
        <NavLink to="/profile">
          <div className="profileImage">
            <img src={user?.profileImage} alt="user" />
            <p>{user.name}</p>
          </div>
        </NavLink>
      )}
      <div className="gradient" />
      <div className="links">
        <NavLink to="/">Signup</NavLink>
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/create-podcast">Create Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
};

export default Header;
