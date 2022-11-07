import React, { useEffect, useState } from "react";
import NavComp from "../components/NavComp";
import "../style/home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/Home-Image.png";
import axios from "axios";

export default function Home() {
  const [namaSekolah, setNamaSekolah] = useState({ namaSekolah: "" });
  const [jumlahSiswa, setJumlahSiswa] = useState([]);

  const getNamaSekolah = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/user/${localStorage.getItem(
          "sekolahId"
        )}/sekolah`
      );
      setNamaSekolah(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJumlahSiswa = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/sekolah/${localStorage.getItem(
          "sekolahId"
        )}/siswa`
      );
      setJumlahSiswa(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNamaSekolah();
    getJumlahSiswa();
  }, []);

  AOS.init({ duration: 1750, once: true });
  return (
    <div className="">
      {localStorage.getItem("token") === null ? (
        <>
          <div className="p-16 w-screen h-full bg-gradient-to-r from-sky-800 to-blue-900 content-center">
            <section
              className="overflow-hidden mt-16 content-center p-2 sm:grid sm:grid-cols-2 sm:items-center"
            >
              <div data-aos="fade-right" className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-xl text-center sm:text-left">
                  <h2 className="text-4xl font-bold font-mono text-white md:text-3xl">
                    Selamat Datang Di Data Center
                  </h2>
                  <p className="text-white font-mono text-[16px] md:mt-4 md:block">
                    Silahkan Masuk/Daftar untuk mengakses Data Center
                  </p>
                  <div className="flex gap-5">
                    <div className="mt-4 md:mt-8 w-48">
                      <a
                        href="/login"
                        className="inline-block w-full rounded-full text-center border hover:from-cyan-400 via-sky-400 rounded px-12 py-3 text-lg font-medium text-white"
                      >
                        Masuk
                      </a>
                    </div>
                    <div className="mt-4 md:mt-8 w-48">
                      <a
                        href="/registrasi"
                        className="inline-block w-full rounded-full text-center border hover:from-cyan-400 via-sky-400 rounded px-12 py-3 text-lg font-medium text-white"
                      >
                        Daftar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div data-aos="fade-left" className="w-4/5 content-center">
                <img alt="Violin" src={logo} />
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <NavComp />
          <div className="w-screen-2xl center content-center">
            <div className="flex justify-start">
              <div className="w-[500px] py-52 px-5">
                <h2 className="text-2xl md:text-3xl pb-4 mb-5">
                  Data Sekolah {namaSekolah.namaSekolah}
                </h2>
                  <div data-aos="fade-right" className="flex justify-center">
                    <div className="grid grid-cols-3 w-80 shadow-xl">
                      <div className="bg-[#10316b] rounded-l-md col-span-2 py-3">
                        <h3 className="text-sm text-white font-bold">
                          JUMLAH SISWA
                        </h3>

                        <p className="mt-2 text-sm text-gray-200">
                          {jumlahSiswa.length} SISWA
                        </p>
                      </div>
                      <a
                        href="/table"
                        className="text-2xl bg-[#f2f7ff] rounded-r-md flex justify-center items-center"
                      >
                        <span aria-hidden>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="currentColor"
                            className="bi bi-arrow-right-short"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                            />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  );
}
