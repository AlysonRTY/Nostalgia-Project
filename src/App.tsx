import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Login from "./pages/LogIn";
import Navbar from "./components/NavBar";
import BestPlayers from "./pages/BestPlayers";
import PlayerDetails from "./pages/PlayerDetails";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route element={<Navbar />} /> */}
            <Route index element={<Homepage />} />
            <Route path="best-players" element={<BestPlayers />} />
            <Route
              path="player-details/:playerName"
              element={<PlayerDetails />}
            />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
