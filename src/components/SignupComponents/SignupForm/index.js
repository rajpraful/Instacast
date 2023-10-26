import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { auth, db, storage } from "../../../firebase";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FileInput from "../../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileImageHandle = (file) => {
    setProfileImage(file);
  };

  const handleSignup = async () => {
    setLoading(true);
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        const profileImageRef = ref(storage, `users/${email}/${Date.now()}`);
        await uploadBytes(profileImageRef, profileImage);
        const profileImageUrl = await getDownloadURL(profileImageRef);

        // Creating user's account.
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        // Saving user's details.
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          profileImage: profileImageUrl,
        });

        // Save data in the redux, call the redux action
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            profileImage: user.profileImage,
          })
        );
        toast.success("User has been created!");
        setLoading(false);
        navigate("/podcasts");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password != confirmPassword) {
        toast.error(
          "Please Make Sure your password and Confirm Password matches!"
        );
      } else if (password.length < 6) {
        toast.error(
          "Please Make Sure your password is more than 6 digits long!"
        );
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="brandingsignup">
        <img className="logosignup" src="/LogoTrans.png" alt="Logo" />
      </div>
      <h1>Signup</h1>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="profile-image-input"
        fileHandleFnc={profileImageHandle}
        text={"Profile Image Upload"}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}

export default SignupForm;
