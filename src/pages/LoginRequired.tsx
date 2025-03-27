import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginRequired() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-gray-800/90 rounded-xl border border-gray-700 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-900/70 to-blue-800/70 p-6">
            <div className="absolute top-4 right-4 w-12 h-12 border-4 border-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Access Restricted</h1>
            <p className="text-blue-200 mt-2">
              You need to be logged in to view this content
            </p>
          </div>

          {/* Main Content Area */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* design */}
              <div className="hidden md:flex flex-col items-center justify-center w-1/3">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-blue-600/30 rounded-full animate-pulse delay-75"></div>
                  <div className="absolute inset-8 bg-blue-600/40 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text and Buttons */}
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">
                  Unlock Premium Content
                </h2>
                <p className="text-gray-300 mb-6">
                  The page you're trying to access requires authentication.
                  Please sign in to your account or create a new one to view the
                  complete list of FIFA 17's top players with all their detailed
                  stats and attributes.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-colors text-center"
                  >
                    Create Account
                  </Link>
                </div>

                {user && (
                  <div className="mt-4 text-sm text-yellow-400">
                    <p>
                      You're seeing this page because your session may have
                      expired.
                    </p>
                    <p>Please try signing in again.</p>
                  </div>
                )}
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

export default LoginRequired;
