import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-gray-800/90 rounded-xl border border-gray-700 backdrop-blur-sm overflow-hidden shadow-2xl">
 
          <div className="relative bg-gradient-to-r from-red-900/70 to-red-800/70 p-6">
            <div className="absolute top-4 right-4 w-12 h-12 border-4 border-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-800 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Error 404</h1>
            <p className="text-red-200 mt-2">
              The page you requested couldn't be found
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="hidden md:flex flex-col items-center justify-center w-1/3">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-red-600/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-red-600/30 rounded-full animate-pulse delay-75"></div>
                  <div className="absolute inset-8 bg-red-600/40 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">
                  Oops! Something went wrong
                </h2>
                <p className="text-gray-300 mb-6">
                  The page you're looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors text-center"
                  >
                    Return Home
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors text-center"
                  >
                    Report Issue
                  </Link>
                </div>

                {/* Synchronized Countdown */}
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-red-500 h-2.5 rounded-full"
                      style={{
                        width: `${(secondsRemaining / 10) * 100}%`,
                        transition: "width 1s linear",
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Redirecting in{" "}
                    <span className="text-red-400 font-mono">
                      {secondsRemaining}
                    </span>{" "}
                    second{secondsRemaining !== 1 ? "s" : ""}...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-900/50 p-4 text-center text-sm text-gray-400">
            FIFA 17 Ultimate Team &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
