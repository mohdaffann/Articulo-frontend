import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import authStore from "../store/authStore"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthLoading } = authStore();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (

    <header className="w-full  bg-white/60 backdrop-blur-sm  fixed top-0">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold">BlogName</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/posts"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
            }
          >
            About
          </NavLink>
        </nav>

        {/* Auth Links - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-[180px] flex justify-end items-center h-10 relative">

            {
              isAuthLoading ?
                (<div className="animate-pulse">Loading...</div>)
                : user ? (
                  <div className="flex items-center gap-2">
                    <NavLink
                      to="/write"
                      className={({ isActive }) =>
                        `px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
                      }
                    >
                      Write
                    </NavLink>
                    <img src={user.profile || user.userName} className="w-8 h-8 rounded-full" />
                    <button onClick={logout} className="text-sm font-medium border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100">Logout</button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="text-sm font-medium mr-1.5 border border-black text-black px-4 py-1.5 rounded-md hover:bg-gray-100">
                      Log In
                    </Link>

                    <Link to="/register" className="text-sm font-medium bg-black text-white px-4 py-1.5 rounded-md hover:bg-gray-800">
                      Register
                    </Link>

                  </>
                )
            }
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-600 cursor-pointer" /> : <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-600 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block text-center px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `block text-center px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Posts
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `block text-center px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block text-center px-3 py-2 rounded-md text-base font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                to="/login"
                className="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/contact"
                className="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/register"
                className="flex text-center justify-center mt-2 px-[12px] py-[6px] rounded-md text-base font-medium bg-black text-white hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header