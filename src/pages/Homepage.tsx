import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import ToTopBtn from "../components/ToTopBtn";

function Homepage() {
  const navigate = useNavigate();
  const { user, userData } = useContext(AuthContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    setTimeout(() => navigate(path), 0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="relative h-screen overflow-hidden -mt-[1px]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/yYjD78X1d9Q?autoplay=1&mute=1&loop=1&playlist=yYjD78X1d9Q&controls=0"
              title="FIFA 17 Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="md:hidden relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          {user ? (
            <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700 backdrop-blur-sm w-full max-w-md">
              <h1 className="text-3xl font-bold text-white mb-4">
                Welcome back, {userData?.username || "User"}!
              </h1>
              <p className="text-lg text-blue-300 mb-6">
                Ready to explore the top 30 players of FIFA 17?
              </p>
              <button
                onClick={() => handleNavigation("/best-players")}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
              >
                View Top Players
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  FIFA 17 Ultimate Team
                </h1>
                <p className="text-lg text-blue-300">
                  Discover the top 30 players of the season
                </p>
              </div>

              <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700 backdrop-blur-sm w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Unlock the Best Players
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  Sign in to view the complete list of the top 30 FIFA 17
                  players with all their detailed stats and attributes.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigation("/register")}
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hidden md:flex relative z-10 h-full flex-col items-center justify-center pb-0">
          <div className="text-center px-4 w-full max-w-2xl">
            {user ? (
              <div className="bg-gray-800/90 p-8 rounded-lg border border-gray-700 backdrop-blur-sm">
                <h1 className="text-5xl font-bold mb-6 text-white">
                  Welcome back, {userData?.username || "User"}!
                </h1>
                <p className="text-2xl mb-8 text-blue-300">
                  Ready to explore the top 30 players of FIFA 17?
                </p>
                <button
                  onClick={() => handleNavigation("/best-players")}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                >
                  View Top Players
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-6xl font-bold mb-4 text-white">
                  FIFA 17 Ultimate Team
                </h1>
                <p className="text-2xl mb-8 text-blue-300">
                  Discover the top 30 players of the season
                </p>
                <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700 backdrop-blur-sm">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Unlock the Best Players
                  </h2>
                  <p className="text-base text-gray-300 mb-6">
                    Sign in to view the complete list of the top 30 FIFA 17
                    players with all their detailed stats and attributes.
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleNavigation("/register")}
                      className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

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
              className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors text-left w-full"
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
  );
}

export default Homepage;
