import "../node_modules/papercss/dist/paper.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation/Navigation";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import Followers from "./pages/Followers/Followers";
import FollowerBoard from "./pages/FollowerBoard/FollowerBoard";

const App = () => {
  const { user } = useAuthContext();

  return (
    <>
      <div className="App">
        <div className="">
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route
                path="/"
                element={user ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <LogInPage /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <SignUpPage /> : <Navigate to="/" />}
              />
              <Route
                path="/followers"
                element={user ? <FriendsPage /> : <Navigate to="/" />}
              />
              <Route
                path="/followers/board"
                element={user ? <Followers /> : <Navigate to="/" />}
              />
              <Route
                path="/followers/board/:followerId"
                element={user ? <FollowerBoard /> : <Navigate to="/" />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};

export default App;
