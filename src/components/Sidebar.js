import React from "react";
import {useNavigate } from "react-router-dom";
import "../style/sidebar.css";
import Swal from "sweetalert2";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // Navigasi ke halaman home setelah logout
    navigate("/");
  };

  const logout = () => {
    Swal.fire({
      title: "Keluar",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } else {
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
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
              <h1 className="text-white">The Data Center</h1>
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
                    Masuk
                  </a>
                  <a
                    className="hidden rounded-md nav-reg px-5 py-2.5 text-sm font-medium transition sm:block"
                    href="/registrasi"
                  >
                    Daftar
                  </a>
                </>
              ) : (
                <>
                  <div className="sm:flex sm:gap-4">
                    {localStorage.getItem("token") === null ? (
                      <>
                        <a
                          className="hover:text-blue-600 hover:bg-[#dfecff] text-blue-900 bg-[#dfecff] focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  focus:outline-none "
                          href="/login"
                        >
                          Masuk
                        </a>
                        <a
                          className="hidden rounded-md nav-reg px-5 py-2.5 text-sm font-medium transition  sm:block"
                          href="/registrasi"
                        >
                          Daftar
                        </a>
                      </>
                    ) : (
                      <button
                        className="hover:text-blue-600 hover:bg-[#dfecff] text-blue-900 bg-[#dfecff] focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  focus:outline-none "
                        onClick={logout}
                      >
                        Keluar
                      </button>
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
                href="/dashboard"
                className="flex items-center p-2 rounded-lg text-white hover:text-blue-600 hover:bg-[#dfecff] group"
              >
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="/table-sekolah-admin"
                className="flex items-center p-2 rounded-lg text-white hover:text-blue-600 hover:bg-[#dfecff] group"
              >
                <span className="ms-3">Table Sekolah</span>
              </a>
            </li>
            <li>
              <a
                href="/ver-registrasi"
                className="flex items-center p-2 rounded-lg text-white hover:text-blue-600 hover:bg-[#dfecff] group"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                 Verifikasi Registrasi
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
  );
}
