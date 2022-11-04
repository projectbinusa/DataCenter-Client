import React, { useEffect, useState } from "react";
import NavComp from "../components/NavComp";
import "../css/form.css";
import AOS from 'aos';
import logo from "../assets/Home-Image.png"
import axios from "axios";



export default function Home() {
  const [namaSekolah, setNamaSekolah] = useState({ namaSekolah: "" });
  const [jumlahSiswa, setJumlahSiswa] = useState([]);

  const getNamaSekolah = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/${localStorage.getItem("sekolahId")}/sekolah`);
      setNamaSekolah(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getJumlahSiswa = async() => {
    try {
      const res = await axios.get(`http://localhost:8080/api/sekolah/${localStorage.getItem("sekolahId")}/siswa`);
      setJumlahSiswa(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNamaSekolah();
    getJumlahSiswa();
  }, [])

  AOS.init({ duration: 1750, once: true });
  return (
    <div className="">
      {localStorage.getItem("token") === null ? (
        <>
          <div className="p-16 w-screen h-full bg-gradient-to-r from-sky-800 to-blue-900 center content-center">
            <section className="overflow-hidden mt-16 content-center p-2 sm:grid sm:grid-cols-2 sm:items-center" data-aos="fade-right">
              <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-xl text-center sm:text-left">
                  <h2 className="text-4xl font-bold font-mono text-white md:text-3xl">
                    Selamat Datang Di Data Center
                  </h2>
                  <p className="text-white font-mono text-[16px] md:mt-4 md:block">
                    Silahkan Login/Register untuk mengakses Data Center
                  </p>
                  <div className="flex gap-5">
                    <div className="mt-4 md:mt-8 w-48">
                      <a href="/login" className="inline-block w-full rounded-full text-center border hover:from-cyan-400 via-sky-400 rounded px-12 py-3 text-lg font-medium text-white">
                        Login
                      </a>
                    </div>
                    <div className="mt-4 md:mt-8 w-48">
                      <a href="/registrasi" className="inline-block w-full rounded-full text-center border hover:from-cyan-400 via-sky-400 rounded px-12 py-3 text-lg font-medium text-white">
                        Register
                      </a>
                    </div>
                  </div>

                </div>
              </div>
              <div className="w-4/5 content-center">
                <img alt="Violin" src={logo} />
              </div>
            </section>
          </div>
        </>
      ) : (
        <>
          <NavComp />
          <div className="w-screen-2xl center content-center">
            <div className="m-10 p-10">
              <h2 className="text-2xl md:text-3xl pb-4 mb-5 border-b-2 border-[#0b409c]">
                Data Sekolah {namaSekolah.namaSekolah}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 p-5 justify-around gap-5">
                <div data-aos="fade-right">
                  <a
                    href="/table"
                    className="block h-80 overflow-hidden rounded-lg border-2 border-[#0b409c] hover:shadow-xl"
                  >
                    <span className="inline-block rounded-sm p-2 text-dark">
                      <svg className="h-32 w-32"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" /></svg>
                    </span>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">
                        JUMLAH SISWA
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        {jumlahSiswa.length} SISWA
                      </p>

                      <div
                        className="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600"
                      >
                        Lihat Lebih Detail
                        <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div data-aos="fade-left">
                  <a
                    href="/table"
                    className="block h-80 overflow-hidden rounded-lg border-2 border-[#0b409c] hover:shadow-xl"
                  >
                    <span className="inline-block rounded-sm p-2 text-dark">
                      <svg className="h-32 w-32"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" /></svg>
                    </span>
                    <div className="p-6">
                      <h3 className="text-lg md:text-xl font-bold">
                        STATISTIK DIAGRAM SISWA
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>

                      <div
                        className="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600"
                      >
                        Lihat Lebih Detail
                        <span aria-hidden="true">&rarr;</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}


