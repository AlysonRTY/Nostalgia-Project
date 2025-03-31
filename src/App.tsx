import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Login from "./pages/LogIn";
import Navbar from "./components/NavBar";
import BestPlayers from "./pages/BestPlayers";
import PlayerDetails from "./pages/PlayerDetails";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginRequired from "./pages/LoginRequired";
import Register from "./pages/Register";
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route element={<Navbar />} /> */}
            <Route index element={<Homepage />} />
            <Route
              path="best-players"
              element={
                <ProtectedRoute>
                  <BestPlayers />
                </ProtectedRoute>
              }
            />
            <Route
              path="player-details/:playerName"
              element={
                <ProtectedRoute>
                  <PlayerDetails />
                </ProtectedRoute>
              }
            />
            <Route path="loginrequired" element={<LoginRequired />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="loading" element={<LoadingSpinner />} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
