import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import "./styles.css";

const Header = () => {
  const user = useSelector((state) => state.user?.user);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      {user?.profileImage && (
        <NavLink to="/profile">
          <div className="profileImage">
            <img src={user?.profileImage} alt="user" />
            <p className="hideInMobile">{user.name}</p>
          </div>
        </NavLink>
      )}
      <div className="gradient" />
      <div className={`links ${menuOpen ? "fade-in-text" : "hideInMobile"}`}>
        <NavLink to="/">Signup</NavLink>
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/create-podcast">
          Create <span className="hideInMobile">Podcast</span>
        </NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div
        className="menuIcon hideInDesktop"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <AiOutlineClose /> : <RxHamburgerMenu />}
      </div>
    </nav>
  );
};

export default Header;
