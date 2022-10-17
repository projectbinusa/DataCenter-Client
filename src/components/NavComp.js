import React from "react";
import logo from "../assets/dc-logo.png";
import "../css/nav.css";

export default function NavComp() {
  const logout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <header className="navbar">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a className="block text-teal-600" href="/">
            <img src={logo} alt="" style={{ height: "70px", width: "120px" }} />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav
              className="hidden md:block"
              aria-labelledby="header-navigation"
            >
              <h2 className="sr-only" id="header-navigation">
                Header navigation
              </h2>

              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/table"
                  >
                  Table
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    History
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Services
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Projects
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {localStorage.getItem("token") === null ? (
                  <>
                    <a
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      href="/login"
                    >
                      Login
                    </a>
                    <a
                      className="hidden rounded-md nav-reg px-5 py-2.5 text-sm font-medium transition  sm:block"
                      href="/registrasi"
                    >
                      Register
                    </a>
                  </>
                ) : (
                  <a
                    className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                    href="/"
                    onClick={logout}
                  >
                    Logout
                  </a>
                )}
              </div>

              <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
