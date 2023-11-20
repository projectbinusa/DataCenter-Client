import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import logo from "../../assets/school-icon.png";
import dataCenter from "../../assets/dc-logo.png";
import {
  Navigate,
  useNavigate,
  useParams,
  Link,
  NavLink,
} from "react-router-dom";
import "../../App.css";
import Swal from "sweetalert2";

AOS.init({ duration: 1750, once: true });

export default function InfoSekolah() {
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const sekolahId = localStorage.getItem("sekolahId");
  const [namaSekolah, setNamaSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [status, setStatus] = useState("");
   const [akreditasiSekolah, setAkreditasiSekolah] = useState("");
  const [numSiswa, setNumSiswa] = useState("");
  const [numGuru, setNumGuru] = useState("");
  const [numKelas, setNumKelas] = useState("");
  const [UserId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    Swal.fire({
      title: "Ubah Data Sekolah?",
      text: "Anda yakin ingin mengubah data sekolah?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Ubah!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/edit-sekolah/${userId}/${sekolahId}`);
      } else {
        Swal.fire({
          title: "Tidak Jadi Mengubah",
          text: "",
          icon: "warning",
        });
      }
    });
  };

  const kelas = async () => {
    try {
      const kelasResponse = await axios.get(
        `http://localhost:8080/api/kelas/${sekolahId}/kelas`
      );
      const dataKelas = kelasResponse.data;
      setNumKelas(dataKelas.length);
    } catch (error) {
      console.error("Errorr  data :" , error)
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
    kelas();
    sekolah();
    fetchStudentData();
    fetchGuruData();
  }, []);

  return (
    <div>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div data-aos="fade-up">
          <section className="bg-gray-50 dark:bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 lg:mb-16">
                <center>
                  <img
                    src={logo}
                    alt=""
                    style={{
                      height: "70px",
                      width: "120px",
                      position: "absolute bottom-0 right-4",
                      top: "50%",

                      transform: "translateY(-50%)",
                      margin: "5px",
                    }}
                  />
                </center>
                <div
                  className="max-w-screen-md mb-8 lg:mb-16"
                  style={{ position: "relative" }}
                >
                  <center>
                    <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white  ">
                      Informasi <i>{namaSekolah} </i>
                    </h2>
                  </center>

                  <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                    {informasiSekolah}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                 <span
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                     >
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
                    <span>
                      <span>{numSiswa !== null ? numSiswa : "0"} Murid</span>
                    </span>
                    <Link to={"table"}>
                    <span
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      >
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
                        fillRule="evenodd"
                        d="M96 64c0-35.3 28.7-64 64-64H416c35.3 0 64 28.7 64 64V448h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H432 144 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96V64zM384 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold dark:text-white">
                    Kelas
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 flex justify-between items-center">
                    {numKelas} Kelas
                    <Link to={"data-kelas"}>
                    <span
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      >
                      Lihat Detail
                    </span>
                       </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bottom-0 right-4 my-4 md:my-2 ml-4 md:ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleEditButtonClick()}
              >
                Ubah Data
              </button>
              <div className="  text-gray-500 dark:text-gray-400 p-5 md:p-3">
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
                <p style={{ fontSize: "0.6em" }}>
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
          </section>
        </div>{" "}
      </div>
    </div>
  );
}
