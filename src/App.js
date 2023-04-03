import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthContext } from "./hooks/useAuthContext";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation/Navigation";
import LogInPage from "./pages/LogInPage/LogInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const App = () => {
  const { user } = useAuthContext();

  return (
    <>
      <div className="App">
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
