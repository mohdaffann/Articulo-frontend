import { useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { Menu, X, Settings, LogOutIcon } from "lucide-react"
import authStore from "../store/authStore"
import Dropdown from "./Dropdown"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = authStore((state) => state.user)
  const logout = authStore((state) => state.logout)
  const isAuthLoading = authStore((state) => state.isAuthLoading)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (

    <header className="w-full  bg-white/70 backdrop-blur-sm  fixed top-0 z-40">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <span className="text-xl text-black font-bold">Articulo</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink
            to="/home"
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
                        `flex items-center  px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
                      }
                    >

                      Write
                    </NavLink>

                    <Dropdown userName={user.userName} handleLogout={logout} Id={user._id} />


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
          <div className="relative">
            <Menu className={`h-6 w-6 text-gray-600 cursor-pointer transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
            <X className={`h-6 w-6 text-gray-600 cursor-pointer absolute top-0 left-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="md:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-600 ">
            <NavLink
              to="/home"
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
              {user ?
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/write"
                    className={({ isActive }) =>
                      `flex items-center  px-3 py-1 rounded-md text-sm font-medium ${isActive ? "text-black" : "text-gray-600 hover:text-black"}`
                    }
                  >

                    Write
                  </NavLink>

                  <Dropdown userName={user.userName} handleLogout={logout} Id={user._id} />


                </div> :
                <>
                  <Link
                    to="/login"
                    className="block text-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log In
                  </Link>

                  <Link
                    to="/register"
                    className="flex text-center justify-center mt-2 px-[12px] py-[6px] rounded-md text-base font-medium bg-black text-white hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              }

            </div>
          </div>
        </div>

      </div>


    </header>
  )
}

export default Header