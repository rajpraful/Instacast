import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const Header = () => {
  return (
    <nav className="navbar">
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
