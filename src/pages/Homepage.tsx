import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import ToTopBtn from "../components/ToTopBtn";
import { AuthContext } from "../context/AuthContext";

function Homepage() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // andler that scrolls to top
  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    setTimeout(() => navigate(path), 0);
  };

  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section with Video */}
        <section className="relative h-screen overflow-hidden -mt-[1px]">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/yYjD78X1d9Q?autoplay=1&mute=1&loop=1&playlist=yYjD78X1d9Q&controls=0"
              title="FIFA 17 Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Title - positioned lower on mobile */}
          <div className="md:hidden relative z-10 pt-16 px-4 text-center">
            <h1 className="text-4xl font-bold text-white">
              FIFA 17 Ultimate Team
            </h1>
            <p className="text-lg text-blue-300 mt-2">
              Discover the top 30 players of the season
            </p>
          </div>

          {/* Centered content container - positioned with more space */}
          <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 md:justify-center md:pb-0">
            <div className="text-center px-4 w-full max-w-2xl">
              {/* Hidden on mobile, shown on desktop */}
              <div className="hidden md:block">
                <h1 className="text-6xl font-bold mb-4 text-white">
                  FIFA 17 Ultimate Team
                </h1>
                <p className="text-2xl mb-8 text-blue-300">
                  Discover the top 30 players of the season
                </p>
              </div>

              <div className="bg-gray-800/90 p-4 md:p-6 rounded-lg border border-gray-700 backdrop-blur-sm mx-auto md:mt-0">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                  Unlock the Best Players
                </h2>
                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                  Sign in to view the complete list of the top 30 FIFA 17
                  players with all their detailed stats and attributes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="px-6 py-2 md:px-8 md:py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors text-sm md:text-base"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation("/register")}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors text-sm md:text-base"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator - only shown on desktop */}
          <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              ></path>
            </svg>
          </div>
        </section>

        {/* Additional content section */}
        <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
            About FIFA 17 Ultimate Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <h3 className="text-lg md:text-xl font-semibold text-blue-400">
                  The Journey
                </h3>
                <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-md">
                  Coming Soon
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Experience Alex Hunter's story - a brand new cinematic campaign
                where your choices shape the career of a rising football star.
              </p>
            </div>
            <div>
              <button
                onClick={() => handleNavigation("/best-players")}
                className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors text-left w-full text-left"
              >
                Player Ratings
              </button>
              <p className="text-sm md:text-base text-gray-300">
                Our exclusive list showcases the best 30 players from FIFA 17,
                complete with detailed stats and special attributes.
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-center pb-8 md:pb-12">
          <ToTopBtn onClick={scrollToTop} />
        </div>
      </div>
      <h2>welcome {user?.userName}</h2>
    </>
  );
}

export default Homepage;
