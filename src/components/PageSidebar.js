import React, { useEffect, useState } from "react";
import logo from "../assets/dc-logo.png";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export default function PageSidebar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const sekolahId = localStorage.getItem("sekolahId");

  const handleLogout = () => {
    localStorage.clear();
    // Navigasi ke halaman home setelah logout
    navigate("/");
  };

  const logout = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } else {
        Swal.fire("Cancelled", "Logout has been cancelled", "info");
      }
    });
  };
 
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-[#0b409c] border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden bg-white hover:bg-[#dfecff] focus:outline-none focus:ring-2 focus:ring-gray-200 "
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fileRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="" className="flex ms-5 md:me-24 text-white">
                <h1>The Data Center</h1>
              </a>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              {" "}
              {/* Use ml-auto to move it to the right */}
              <div className="sm:flex sm:gap-4">
                {localStorage.getItem("token") === null ? (
                  <>
                    <a
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      href="/login"
                    >
                      <img
                        src="your-login-image-url"
                        alt="Login"
                        className="w-6 h-6 mr-2" // Adjust the width and height accordingly
                      />
                      Login
                    </a>
                    <a
                      className="hidden rounded-md nav-reg px-5 py-2.5 text-sm font-medium transition sm:block"
                      href="/registrasi"
                    >
                      Register
                    </a>
                  </>
                ) : (
                  <>
                    <div className="sm:flex sm:gap-4">
                      {localStorage.getItem("token") === null ? (
                        <>
                          <a
                            class="hover:text-blue-600 hover:bg-[#dfecff] text-blue-900 bg-[#dfecff] hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  focus:outline-none "
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
                          class="hover:text-blue-600 hover:bg-[#dfecff] text-blue-900 bg-[#dfecff] hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  focus:outline-none "
                          onClick={logout}
                        >
                          Logout
                        </a>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#0b409c] border-r border-gray-200 sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full py-4 px-3 pb-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="/dash"
                  className="flex items-center p-2 rounded-lg text-white hover:text-blue-600 hover:bg-[#dfecff] group"
                >
                  <span className="ms-3">Dashboard Utama</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:text-blue-600 hover:bg-[#dfecff]"
                  aria-controls="dropdown-example1"
                  data-collapse-toggle="dropdown-example1"
                >
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Guru
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul id="dropdown-example1" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="/table-guru"
                      className="flex items-center w-full p-2 transition duration-75 text-white hover:text-blue-600 rounded-lg pl-11 group hover:bg-[#dfecff]"
                    >
                      Data Guru
                    </a>
                  </li>
                  <li>
                    <a
                      href="/add-guru"
                      className="flex items-center w-full p-2 transition duration-75 text-white hover:text-blue-600 rounded-lg pl-11 group hover:bg-[#dfecff]"
                    >
                      Tambah Guru
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  type="button" 
                  className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:text-blue-600 hover:bg-[#dfecff]"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Siswa
                  </span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <ul id="dropdown-example" className="hidden py-2 space-y-2">
                  <li>
                    <a
                      href="/table"
                      className="flex items-center w-full p-2 transition duration-75 text-white hover:text-blue-600 rounded-lg pl-11 group hover:bg-[#dfecff]"
                    >
                      Data Murid
                    </a>
                  </li>
                  <li>
                    <a
                      href="/add-murid"
                      className="flex items-center w-full p-2 transition duration-75 text-white hover:text-blue-600 rounded-lg pl-11 group hover:bg-[#dfecff]"
                    >
                      Tambah Murid
                    </a>
                  </li>
                </ul>
              </li>
              <li>
              <Link to={`/info-sekolah`}>

                  <a className="flex items-center p-2 rounded-lg text-white hover:text-blue-600 hover:bg-[#dfecff] group">
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Info Sekolah
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
