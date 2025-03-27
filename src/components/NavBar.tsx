import { Link } from "react-router";
import fifa17Logo from "../assets/fifa17-logo.jpg";
import { useState, useEffect, useContext } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { login, user, logout } = useContext(AuthContext);
  const navItems = [{ path: "/login", label: "Login" }];

  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-700 text-white shadow-lg transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="w-full border-b border-slate-700">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center hover:opacity-90 transition-opacity w-32 md:w-40"
            >
              <img
                src={fifa17Logo}
                alt="FIFA 17 Logo"
                className="h-12 object-contain"
              />
            </Link>

            {/* "The Best" Link */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <Link
                to="/best-players"
                className="px-4 py-2 rounded-md text-lg font-semibold relative group"
              >
                The Best
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-3/4"></span>
                <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 to-blue-600/20"></span>
              </Link>
            </div>

            <div className="hidden md:block">
              {user ? (
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-lg font-medium
              hover:text-blue-400 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={login}
                  className="px-4 py-2 rounded-md text-lg font-medium
              hover:text-blue-400 transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-700 px-4 py-2 space-y-2 border-t border-gray-600">
            <Link
              to="/best-players"
              className="block px-3 py-3 rounded-md text-base font-semibold bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              The Best
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-3 rounded-md text-base font-medium hover:bg-gray-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-20"></div>
    </>
  );
}

export default Navbar;
