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
        <>
          <div className=" w-screen h-[100vh] bg-gradient-to-r from-sky-800 to-blue-900 justify-center overflow-hidden">
            <section
              className="overflow-hidden mt-16 justify-center p-2 sm:grid sm:grid-cols-2 sm:items-center"
            >
              <div  className="p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="mx-auto max-w-xl text-center sm:text-left">
                  <h2 className="text-xl md:text-3xl font-bold font-mono text-white">
                    Selamat Datang Di Data Center
                  </h2>
                  <p className="text-white font-mono text-sm md:text-[16px] md:mt-4 md:block">
                    Silahkan Masuk/Daftar untuk mengakses Data Center
                  </p>
                  <div className="flex gap-5 a-log">
                      <a
                        href="/login"
                        className="inline-block w-full rounded-full text-center border hover:from-cyan-400 via-sky-400 rounded px-10 py-3 text-md md:px-12 md:py-3 md:text-lg font-medium text-white mt-4 md:mt-8 w-48"
                      >
                        Masuk
                      </a>
                      <a
                        href="/registrasi"
                        className="inline-block w-full rounded-full text-center border hover:from-cyan-400 via-sky-400 rounded px-10 py-3 text-md md:px-12 md:py-3 md:text-lg font-medium text-white mt-4 md:mt-8 w-48"
                      >
                        Daftar
                      </a>
                  </div>
                </div>
              </div>
              <div data-aos="fade-left" className="w-4/5  mx-auto grid md:justify-center">
                <img alt="Violin" src={logo} />
              </div>
            </section>
          </div>
        </>
        <>
        </>
    </div>
  );
}
