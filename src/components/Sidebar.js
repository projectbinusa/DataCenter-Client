import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login")
  };

  return (
    <div>
      <div className="s-layout">
        <div className="s-layout__sidebar">
          <NavLink activeClassName="active" className="s-sidebar__trigger flex items-center">
            <span className="text-gray-400 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-full fill-current"
                width="30"
                height="30"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </span>
          </NavLink>

          <nav className="s-sidebar__nav">
            <ul>
              <li>
                <NavLink activeClassName="active" className="s-sidebar__nav-link focus:bg-[#f2f7ffa8] focus:text-[#10316b]" to="/dashboard">
                  <span className="text-center text-inherit w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      className="w-full fill-current mt-4"
                      viewBox="0 0 120 16"
                    >
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                    </svg>
                  </span>
                  <em>Home</em>
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active"
                  className="s-sidebar__nav-link"
                  to="/table-sekolah-admin"
                >
                  <span className="text-center text-inherit w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="w-full fill-current mt-5"
                      viewBox="0 0 130 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                    </svg>
                  </span>
                  <em>Tabel Sekolah</em>
                </NavLink>
              </li>
              <li>
                <NavLink activeClassName="active"
                  className="s-sidebar__nav-link"
                  to="/table-siswa-admin"
                >
                  <span className="text-center text-inherit w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="w-full fill-current mt-5"
                      viewBox="0 0 130 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                    </svg>
                  </span>
                  <em>Tabel Siswa</em>
                </NavLink>
              </li>

             <li>
                <a className="s-sidebar__nav-link side-out cursor-pointer" onClick={logout} >
                  <span className="text-center text-inherit w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      className="w-full fill-current mt-5"
                      viewBox="0 0 130 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                      />
                    </svg>
                  </span>
                  <em>Logout</em>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
