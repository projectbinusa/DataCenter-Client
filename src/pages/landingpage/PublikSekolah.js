import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import logo from "../../assets/school-icon.png";
import { useParams, Link } from "react-router-dom";
import PageNavbar from "../../components/PageNavbar";
import Logo from "../../assets/logo.jpg";
import Swal from "sweetalert2";

AOS.init({ duration: 1750, once: true });
const api = "http://localhost:8080/api/sekolah";

export default function PublikSekolah() {
  const [namaSekolah, setNamaSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [numSiswa, setNumSiswa] = useState("");
  const [numGuru, setNumGuru] = useState("");
  const [numKelas, setNumKelas] = useState("");
  const [status, setStatus] = useState("");
  const sekolahId = localStorage.getItem("sekolahId");
  const userId = localStorage.getItem("userId");
  const [UserId, setUserId] = useState("");

  const param = useParams();

  const getPublikSekolah = async () => {
    try {
      const response = await axios.get(`${api}/${param.id}`);

      const resData = response.data;
      setNamaSekolah(resData.namaSekolah);
      setInformasiSekolah(resData.informasiSekolah);
      setTeleponSekolah(resData.teleponSekolah);
      setEmailSekolah(resData.emailSekolah);
    } catch (error) {
      console.log(error);
    }
  };

  const kelas = async () => {
    try {
      const kelasResponse = await axios.get(
        `http://localhost:8080/api/kelas/${sekolahId}/kelas`
      );
      const dataKelas = kelasResponse.data;
      setNumKelas(dataKelas.length);
    } catch (error) {
      console.error("Errorr  data :", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      if (!sekolahId) {
        console.error("Error: sekolahId is undefined");
        return;
      }

      const studentResponse = await axios.get(
        `http://localhost:8080/api/sekolah/${sekolahId}/siswa`
      );
      const dataSiswa = studentResponse.data;
      setNumSiswa(dataSiswa.length);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchGuruData = async () => {
    try {
      if (!sekolahId) {
        console.error("Error: sekolahId is undefined");
        return;
      }

      const guruResponse = await axios.get(
        `http://localhost:8080/api/guru/${sekolahId}/guru`
      );
      const dataGuru = guruResponse.data;

      setNumGuru(dataGuru.length);
    } catch (error) {
      console.error("Error fetching guru data:", error);
    }
  };
  const sekolah = async () => {
    try {
      if (!userId || userId === null || userId === undefined) {
        console.error("userId is null or undefined");
        return;
      }
      setUserId(UserId);
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}/sekolah`
      );
      const dataSekolah = response.data;

      setNamaSekolah(dataSekolah.namaSekolah);
      setInformasiSekolah(dataSekolah.informasiSekolah);
      setEmailSekolah(dataSekolah.emailSekolah);
      setAlamatSekolah(dataSekolah.alamatSekolah);
      setTeleponSekolah(dataSekolah.teleponSekolah);
      setStatus(dataSekolah.status);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

  useEffect(() => {
    getPublikSekolah();
    kelas();
    sekolah();
    fetchStudentData();
    fetchGuruData();
  }, []);
  return (
    <div>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-white">
          <div className="flex items-center lg:order-2 md:flex justify-between flex-grow">
            <a href="" className="flex items-center">
              <img
                src={Logo}
                className="mr-3 h-6 sm:h-9"
                alt="The Data Center"
              />
              <span className="self-center text-sm font-semibold whitespace-nowrap text-black">
                THE DATA CENTER
              </span>
            </a>

            <div class="flex items-center lg:order-2">
              <a
                href="/login"
                class="text-gray-800 text-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </a>
              <a
                href="/registrasi"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Sign Up
              </a>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="p-4 md:mx-20 sm:ml-64 mt-16 ">
        <div data-aos="fade-up">
          <section className="bg-gray-50 dark:bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 lg:mb-16">
                <div
                  className="max-w-screen-md mb-8 lg:mb-16"
                  style={{ position: "relative" }}
                >
                  <center>
                    <img
                      src={logo}
                      alt=""
                      style={{
                        height: "70px",
                        width: "120px",
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        margin: "5px",
                      }}
                      className=""
                    />
                  </center>
                  <div style={{ paddingRight: "150px" }}>
                    <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
                      Informasi {namaSekolah}
                    </h2>

                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                      {informasiSekolah}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
                {/* First Column */}
                <div className="divide-solid p-4">
                  <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                    <svg
                      className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384V352h16V480c0 17.7 14.3 32 32 32s32-14.3 32-32V192h56 64 16c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64H576V256H384V224H320v48c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H368c-26.5 0-48 21.5-48 48v80H243.1 177.1c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9V480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">
                    GURU
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 flex justify-between items-center">
                    <span>{numGuru !== null ? numGuru : "0"} Guru</span>
                    <Link to={"/table-guru"}>
                      <span className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition">
                        Lihat Detail
                      </span>
                    </Link>
                  </p>
                </div>

                {/* Second Column */}
                <div className="divide-solid p-4">
                  <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                    <svg
                      className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 448 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />{" "}
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">
                    MURID
                  </h3>{" "}
                  <p className="text-gray-500 dark:text-gray-400 flex justify-between items-center">
                    <span>{numSiswa !== null ? numSiswa : "0"} Murid</span>
                    <Link to={"/table"}>
                      <span className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition">
                        Lihat Detail
                      </span>
                    </Link>
                  </p>
                </div>

                {/* Third Column */}
                <div className="divide-solid p-4">
                  <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                    <svg
                      className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 576 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M96 64c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V448h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H432 144 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96V64zM384 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">
                    Kelas
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 flex justify-between items-center">
                    <span>12 {/* {ruangKelas} */} Kelas</span>
                    <Link to={"/login"}>
                      <span className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition">
                        Lihat Detail
                      </span>
                    </Link>
                  </p>
                </div>
                <div className="divide-solid p-4">
                  <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                    <svg
                      className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 384 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />{" "}
                    </svg>
                  </div>
                  <h4 className="mb-2 text-xl font-bold dark:text-white flex ">
                    CONTACT
                  </h4>

                  <div className="relative text-gray-500 dark:text-gray-400">
                    <p style={{ fontSize: "0.6em" }} className="pr-20">
                      <svg
                        className="w-4 h-4 inline-block mr-2"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                      </svg>
                      {emailSekolah}
                    </p>
                    <p style={{ fontSize: "0.6em" }} className="pr-20">
                      <svg
                        className="w-4 h-4 inline-block mr-2"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                      </svg>
                      {teleponSekolah}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>{" "}
      </div>
    </div>
  );
}
