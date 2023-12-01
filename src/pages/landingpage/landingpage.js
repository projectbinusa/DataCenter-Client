import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../assets/logo.png";

const api = "http://localhost:8080/api/sekolah";

export default function LandingPage() {
  const [getSekolah, setGetSekolah] = useState([]);
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [error, setError] = useState(null);

  const sekolah = async () => {
    try {
      const response = await axios.get(`${api}`);
      setGetSekolah(response.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setGetSekolah([]);
      setError("Error fetching data");
    }
  };

  console.log(getSekolah);

  const handleSubmit = (e) => {
    if (selectedSekolah) {
      window.location.href = `/publik-sekolah/${selectedSekolah.id}`;
    }
  };
  
  const searchInput = document.getElementById("searchSekolah");
  const schoolList = document.getElementById("schoolList");
  let inputTimeout;
  
  const handleSearch = (e) => {
    clearTimeout(inputTimeout);
  
    const searchTerm = e.target.value.toLowerCase();
  
    inputTimeout = setTimeout(() => {
      schoolList.innerHTML = "";
  
      if (searchTerm) {
        const loadingIndicator = document.createElement("div");
        loadingIndicator.textContent = "Loading..."; // Add loading indicator text
        schoolList.appendChild(loadingIndicator);
  
        const suggestions = getSuggestions(searchTerm);
  
        // Remove the loading indicator
        schoolList.removeChild(loadingIndicator);
  
        suggestions.forEach((suggestion) => {
          const listItem = document.createElement("div");
          listItem.classList.add("list-item");
          listItem.textContent = suggestion.value;
  
          listItem.addEventListener("click", () => {
            setSelectedSekolah(suggestion.data);
  
            searchInput.value = suggestion.value;
  
            // If needed, you can call handleSubmit here
            // handleSubmit();
          });
  
          schoolList.appendChild(listItem);
        });
      }
    }, 500);
  };
  const getSuggestions = (searchTerm) => {
    const suggestions = [];
    for (const sekolah of getSekolah) {
      if (sekolah.namaSekolah.toLowerCase().startsWith(searchTerm)) {
        suggestions.push({
          data: sekolah,
          value: sekolah.namaSekolah,
        });
      }
    }
    return suggestions;
  };
  useEffect(() => {
    sekolah();
  }, []);

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
          <div className="flex items-center lg:order-2 md:flex justify-between flex-grow">
            <a href="" className="flex items-center">
              <img
                src={Logo}
                className="mr-3 h-6 sm:h-9"
                alt="The Data Center"
              />
              <span className="self-center text-sm font-semibold whitespace-nowrap text-white">
                THE DATA CENTER
              </span>
            </a>

            <div className="flex items-center lg:order-2">
              <a
                href="/login"
                className=" text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </a>
              <a
                href="/registrasi"
              >
                Sign Up
              </a>
              
            </div>
          </div>
        </nav>
      </header>
      <section className="bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-white">
              Data Center
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Informasi Data Sekolah Yang ada Di Seluruh Indonesia.
            </p>

            <div className="w-75 pt-4 flex items-center">
              {" "}
              {/* Menambahkan flex container */}
              <div className="mr-4 flex-grow">
                {" "}
                {/* Menambahkan margin-right dan flex-grow untuk elemen select */}
                <input
                  id="searchSekolah"
                  type="text"
                  className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Cari sekolah"
                  onChange={handleSearch}
                />
                <div
                  id="schoolList"
                  className="text-white dark:text-white "
                ></div>
              </div>
              <button
                id="submitButton"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Mulai
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://www.pointstar.co.id/wp-content/uploads/2020/12/Data-Center-Racks_0.jpg"
              alt="mockup"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 bg-gray-800">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl font-extrabold text-white-900 text-white">
              The Data Center adalah
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-100">
              sebuah pusat pengelolaan informasi yang bertujuan untuk
              menyediakan data sekolah di seluruh wilayah Indonesia. Dengan
              menggunakan teknologi canggih, Data Center ini mengumpulkan,
              menyimpan, dan memproses informasi mengenai sekolah-sekolah.
            </p>
          </div>
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.75 6a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 3a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm-1.75 14a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H3.25zM15.25 18a.75.75 0 100 1.5h1.5a.75.75 0 100-1.5h-1.5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {" "}
                Info Sekolah: Menggali Detail Pendidikan Indonesia
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                The Data Center memperkenalkan fitur Info Sekolah, yang
                memungkinkan pengguna menjelajahi halaman detail sekolah dengan
                mudah. Dengan kemampuan CRUD, informasi sekolah dapat diperbarui
                secara real-time, memberikan gambaran yang akurat dan terkini
                tentang lembaga pendidikan di seluruh Indonesia.
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {" "}
                Data Murid: Menyelusuri Demografi Murid Dengan Detail
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Fitur Data Murid membuka pintu ke dunia demografi murid dengan
                tabel dan CRUD untuk memudahkan pengelolaan informasi. Detail
                profil murid memberikan wawasan mendalam, sedangkan diagram
                berdasarkan gender, agama, dan kelas memvisualisasikan
                distribusi murid secara informatif.
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Data Guru: Manajemen Guru yang Efisien dan Transparan
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Tabel Data Guru dan fungsi CRUD mempermudah pengelolaan data
                guru, sementara detail profil dan diagram berdasarkan gender,
                agama, dan umur memberikan informasi lengkap. Fitur ini
                menciptakan manajemen guru yang efisien dan transparan di
                lingkungan pendidikan.
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Dashboard Utama: Gambaran Menyeluruh Pendidikan Indonesia
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Dengan Dashboard Utama, pengguna dapat dengan cepat melihat
                jumlah total murid, jumlah total guru, serta diagram yang
                memberikan pemahaman mendalam tentang distribusi murid dan guru.
                Profil sekolah yang terintegrasi pada dashboard memberikan
                informasi terkini tentang visi-misi dan program unggulan.
              </p>
            </div>

            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="4"
                    height="10"
                    x="1"
                    y="5"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></rect>
                  <rect
                    width="4"
                    height="15"
                    x="7"
                    y="0"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></rect>
                  <rect
                    width="4"
                    height="6"
                    x="13"
                    y="9"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></rect>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Visualisasi Data: Diagram yang Informatif
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                The Data Center ini memanfaatkan diagram sebagai alat
                visualisasi data yang informatif. Diagram murid dan guru
                berdasarkan berbagai kriteria seperti gender, agama, dan kelas
                memberikan wawasan yang mudah dipahami tentang karakteristik
                populasi di dunia pendidikan.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-7 lg:h-7 dark:text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2L2 7l10 5 10-5-10-5zM2 14l10 5 10-5M2 7l10 5 10-5"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Profil Sekolah: Mendalam ke Visi-Misi dan Keunggulan Pendidikan
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Fitur Profil Sekolah memberikan wawasan mendalam ke visi-misi,
                kurikulum, dan program unggulan suatu sekolah. Ini memberikan
                gambaran menyeluruh tentang keunggulan pendidikan yang
                ditawarkan, menjadikan The Data Center sebagai sumber rujukan
                utama bagi pihak yang terlibat dalam dunia pendidikan di
                Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-white-900 text-white">
              The Data Center adalah
            </h2>
            <p className="mb-4">
              tonggak penting dalam mendukung pengelolaan dan pengembangan
              sistem pendidikan nasional, memastikan bahwa informasi yang
              diperlukan untuk meningkatkan kualitas pendidikan dapat diakses
              dengan mudah dan aman.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <footer className="p-4 bg-gray-50 sm:p-6 bg-gray-800">
        <div className="mx-auto max-w-screen-xl">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                <img
                  src={Logo}
                  className="mr-3 h-6 sm:h-9"
                  alt="The Data Center"
                />
                <span className="self-center text-sm font-semibold whitespace-nowrap text-white">
                  THE DATA CENTER
                </span>
              </a>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2022{" "}
              <a href="#" className="hover:underline">
                Your website
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a
                href=""
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
