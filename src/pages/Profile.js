import React from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Button from "../components/common/Button";

function Profile() {
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.email}</p>
      <Button text={"Logout"} onClick={handleLogout} />
    </div>
  );
}

export default Profile;
