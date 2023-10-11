import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { setUser } from "./slices/userSlice";
import Header from "./components/common/Header";
import PrivateRoutes from "./components/common/PrivateRoutes";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePodcast from "./pages/CreatePodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetails from "./pages/PodcastDetails";
import CreateEpisode from "./pages/CreateEpisode";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            dispatch(
              setUser({
                name: userData.name,
                email: userData.email,
                uid: user.uid,
              })
            );
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        dispatch(setUser(null));
      }
    });
  }, []);

  return (
    <main className="App">
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-podcast" element={<CreatePodcast />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:id" element={<PodcastDetails />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateEpisode />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
