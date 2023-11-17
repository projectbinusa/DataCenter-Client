import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import logo from "../../assets/school-icon.png";
import dataCenter from "../../assets/dc-logo.png";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import Swal from "sweetalert2";

AOS.init({ duration: 1750, once: true });

export default function InfoSekolah() {
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { userId, sekolahId } = useParams();
  const [namaSekolah, setNamaSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [status, setStatus] = useState("");
  const [ruangKelas, setRuangKelas] = useState("");
  const [akreditasiSekolah, setAkreditasiSekolah] = useState("");
  const [numSiswa, setNumSiswa] = useState("");
  const [numGuru, setNumGuru] = useState("");
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

  useEffect(() => {
    axios
    .get(`http://localhost:8080/api/user/${userId}/sekolah`)
    .then((response) => {
      const dataSekolah = response.data;
      setNamaSekolah(dataSekolah.namaSekolah);
      setInformasiSekolah(dataSekolah.informasiSekolah);
      setEmailSekolah(dataSekolah.emailSekolah);
      setAlamatSekolah(dataSekolah.alamatSekolah);
      setTeleponSekolah(dataSekolah.teleponSekolah);
      setStatus(dataSekolah.status);
    })
    .catch((error) => {
     Swal.fire({
      icon:"warning",
      text:"Gagal Mengambil Data",
     })
    });
     fetchStudentData();
    fetchGuruData();
  }, [userId, sekolahId]);

  return (
    <div>
      <PageSidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div data-aos="fade-up">
          <section className="bg-gray-50 dark:bg-gray-800">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 lg:mb-16">
                <div
                  className="max-w-screen-md mb-8 lg:mb-16"
                  style={{ position: "relative" }}
                >
                  <div className="flex items-center">
                    <h2 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
                      Informasi <i>{namaSekolah}</i>
                    </h2>

                    <img
                      src={logo}
                      alt=""
                      style={{
                        height: "40px",
                        width: "70px",
                        marginLeft: "10px",
                      }}
                    />
                  </div>

                  <p className="text-gray-500  text-xs sm:text-base dark:text-gray-400">
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
                    <a
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      href="/table-guru"
                    >
                      Lihat Detail
                    </a>
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
                    <a
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      href="/table-siswa"
                    >
                      Lihat Detail
                    </a>
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
                    <span>
                      12
                      {/* {ruangKelas} */} Kelas
                    </span>
                    <a
                      className="block rounded-md nav-log px-5 py-2.5 text-sm font-medium transition"
                      href="/"
                    >
                      Lihat Detail
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <button
            className="  bottom-0 right-4 my-4 md:my-2  bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleEditButtonClick()}
          >
            Ubah Data
          </button>
        </div>{" "}
      </div>
      <div className="p-4 sm:ml-64 mt-36">
        <Footer bgDark>
          <div className="w-full">
            {/* <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-3">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Binusa</Footer.Link>
                  <Footer.Link href="#">Extrakurikuler</Footer.Link>
                  <Footer.Link href="#">Osis Binusa</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Contact Us" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">Binusa@gmail.com</Footer.Link>
                  <Footer.Link href="#">smk_bina_nusantara_smg</Footer.Link>
                  <Footer.Link href="#">+6287367264</Footer.Link>
                </Footer.LinkGroup>
              </div>

              <div>
                <Footer.Title title="Location" />
                <Footer.LinkGroup col>
                  <Footer.Link href="#">
                    Jl. Kemantren Raya No.5, RT.02/RW.04, Wonosari, Kec.
                    Ngaliyan, Kota Semarang, Jawa Tengah 50186
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div> */}
            <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright href="#" by="Data Center" year={2023} />
              <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center bg-  hover:bg-bluesky-200">
                <Footer.Icon href="#" icon={BsFacebook} />
                <Footer.Icon href="#" icon={BsInstagram} />
                <Footer.Icon href="#" icon={BsTwitter} />
                <Footer.Icon href="#" icon={BsGithub} />
                <Footer.Icon href="#" icon={BsDribbble} />
              </div>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  );
}
