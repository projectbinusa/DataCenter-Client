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
  const [image, setImage] = useState("");
  const [akreditasiSekolah, setAkreditasiSekolah] = useState("");
  const [numSiswa, setNumSiswa] = useState("");
  const [numGuru, setNumGuru] = useState("");
  const [numExtra, setNumExtra] = useState("");
  const [numGelar, setNumgelar] = useState("");
  const [numKelas, setNumKelas] = useState("");
  const [UserId, setUserId] = useState("");
  const navigate = useNavigate();

  const ubahProfile = () => {
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
        window.location.href = `/edit-sekolah/${userId}/${sekolahId}`;  
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
      console.error("Errorr  data :", error);
    }
  };
  const extra = async () => {
    try {
      const extrResponse = await axios.get(
        `http://localhost:8080/api/extra/${sekolahId}/extra`
      );
      const datExtra = extrResponse.data;
      setNumExtra(datExtra.length);
    } catch (error) {
      console.error("Errorr  data :", error);
    }
  };
  const gelar = async () => {
    try {
      const gelarResponse = await axios.get(
        `http://localhost:8080/api/gelarPendidikan/${sekolahId}/gelarPendidikan`
      );
      const dataGelar = gelarResponse.data;
      setNumgelar(dataGelar.length);
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
      setAkreditasiSekolah(dataSekolah.akreditasiSekolah);
       setImage(dataSekolah.image);
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
    extra();
    gelar();
    sekolah();
    fetchStudentData();
    fetchGuruData();
  }, []);

  return (
    <div>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div data-aos="fade-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
            <section className=" bg-gray-50   rounded-lg">
              <div className="py-8 px-8 mx-auto max-w-screen-xl sm:py-16">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-dark">
                  Logo Sekolah
                </h2>

                <div className="flex items-center justify-center">
                  <button
                    className="obeject-contain rounded-full"
                    
                  >
                    <img
                      src={image === null ? logo : image}
                      alt="Logo Sekolah"
                      className="h-86 w-4/6 object-contain rounded-full"
                    />
                  </button>
                </div>

              

                <div className="  text-gray-500 dark:text-gray-900 p-5 md:p-3">
                  <i style={{ fontSize: "1.5em" }} className="p-2 md:p-1">
                    Contact
                  </i>
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
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
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
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
              <div className="flex items-center justify-between float-left px-5 py-2.5 ">
                <span
                  className="bottom-0 right-4 my-4 text-sm italic md:my-2 ml-4 md:ml-2  text-dark dark:text-dark px-4 py-2 rounded-md "
                 >
                 Akreditasi Sekolah :  {akreditasiSekolah}
                </span>
              </div>
              <div className="flex items-center justify-between float-right px-5 py-2.5 ">
                <button
                  className="bottom-0 right-4 my-4 md:my-2 ml-4 md:ml-2 bg-blue-700 text-white px-4 py-2 rounded-md "
                  onClick={() => ubahProfile()}
                >
                  Ubah Profile
                </button>
              </div>
            </section>
            <section className=" bg-gray-50   rounded-lg">
              <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                  <center>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-dark">
                      Informasi <i>{namaSekolah} </i>
                    </h2>
                  </center>

                  <p className="text-gray-500 sm:text-xl dark:text-gray-900">
                    {informasiSekolah}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 p-3 lg:grid-cols-3 gap-3 p-5">
            {/* First Column */}
            <div className="divide-solid p-4 bg-gray-50    rounded-lg">
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
              <h3 className="mb-2 text-xl font-bold dark:text-dark">GURU</h3>
              <p className="text-gray-500 dark:text-gray-900 flex justify-between items-center">
                <span>{numGuru !== null ? numGuru : "0"} Guru</span>

                <a
                  href="/table-guru"
                  className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                >
                  Lihat Detail
                </a>
              </p>
            </div>

            {/* Second Column */}
            <div className="divide-solid p-4  bg-gray-50    rounded-lg">
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
              <h3 className="mb-2 text-xl font-bold dark:text-dark">MURID</h3>{" "}
              <p className="text-gray-500 dark:text-gray-900 flex justify-between items-center">
                <span>
                  <span>{numSiswa !== null ? numSiswa : "0"} Murid</span>
                </span>

                <a
                  href="/table"
                  className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                >
                  Lihat Detail
                </a>
              </p>
            </div>

            {/* Third Column */}
            <div className="divide-solid p-4  bg-gray-50   rounded-lg">
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
              <h3 className="mb-2 text-xl font-bold dark:text-dark">Kelas</h3>
              <p className="text-gray-500 dark:text-gray-900 flex justify-between items-center">
                {numKelas !== null ? numKelas : "0"} Kelas
                <a
                  href="/data-kelas"
                  className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                >
                  Lihat Detail
                </a>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 p-3 lg:grid-cols-2 gap-3 p-5">
            <div className="divide-solid p-4  bg-gray-50   rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  {" "}
                  <path d="M384 348c-1.75 10.75-13.75 110-15.5 132-117.879-4.299-219.895-4.743-368.5 0v-25.5c45.457-8.948 60.627-8.019 61-35.25 1.793-72.322 3.524-244.143 0-322-1.029-28.46-12.13-26.765-61-36v-25.5c73.886 2.358 255.933 8.551 362.999-3.75-3.5 38.25-7.75 126.5-7.75 126.5H332C320.947 115.665 313.241 68 277.25 68h-137c-10.25 0-10.75 3.5-10.75 9.75V241.5c58 .5 88.5-2.5 88.5-2.5 29.77-.951 27.56-8.502 40.75-65.251h25.75c-4.407 101.351-3.91 61.829-1.75 160.25H257c-9.155-40.086-9.065-61.045-39.501-61.5 0 0-21.5-2-88-2v139c0 26 14.25 38.25 44.25 38.25H263c63.636 0 66.564-24.996 98.751-99.75H384z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-dark">Extra</h3>
              <p className="text-gray-500 dark:text-gray-900 flex justify-between items-center">
                {numExtra !== null ? numExtra : "0"} Extra
                <a
                  href="/extra"
                  className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                >
                  Lihat Detail
                </a>
              </p>
            </div>
            <div className="divide-solid p-4  bg-gray-50   rounded-lg">
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                <svg
                  className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                >
                  {" "}
                  <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-dark">
                Gelar Pendidikan
              </h3>
              <p className="text-gray-500 dark:text-gray-900 flex justify-between items-center">
                {numGelar === null ? "0" : numGelar} Gelar
                <a
                  href="/gelar"
                  className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                >
                  Lihat Detail
                </a>
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
