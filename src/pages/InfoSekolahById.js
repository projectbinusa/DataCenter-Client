import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import logo from "../assets/school-icon.png";
import "firebase/storage";
import "../App.css";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

AOS.init({ duration: 1750, once: true });

export default function InfoSekolah() {
  // Bagian UseState
  const param = useParams();
  const sekolahId = param.id;
  const [namaSekolah, setNamaSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");
  const [emailSekolah, setEmailSekolah] = useState("");
  const [informasiSekolah, setInformasiSekolah] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [akreditasiSekolah, setAkreditasiSekolah] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [UserId, setUserId] = useState("");

  const sekolah = async () => {
    try {
      if (!sekolahId || sekolahId === null || sekolahId === undefined) {
        console.error("sekolahId is null or undefined");
        return;
      }
      setUserId(sekolahId);
      const response = await axios.get(
        `http://localhost:8080/api/user/${sekolahId}/sekolah`
      );
      const dataSekolah = response.data;

      setNamaSekolah(dataSekolah.namaSekolah);
      setInformasiSekolah(dataSekolah.informasiSekolah);
      setEmailSekolah(dataSekolah.emailSekolah);
      setAlamatSekolah(dataSekolah.alamatSekolah);
      setTeleponSekolah(dataSekolah.teleponSekolah);
      setStatus(dataSekolah.status);
      setAkreditasiSekolah(dataSekolah.akreditasiSekolah);
      setVisi(dataSekolah.visi);
      setMisi(dataSekolah.misi);
      setImage(dataSekolah.image);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        text: "Gagal Mengambil Data",
      });
    }
  };

  // Render Crud
  useEffect(() => {
    sekolah();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="grid grid-rows-2  lg:grid-rows-2 gap-4">
            <section className=" bg-gray-50   rounded-lg">
              <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                  <center>
                    <h2 className="mb-4 text-2xl font-bold text-gray-700 dark:text-dark inline-block align-top">
                      Visi
                    </h2>
                  </center>

                  <p className="text-gray-500 sm:text-xl dark:text-gray-500">
                    {visi !== null ? visi : " Belum mengisi Visi  "}
                  </p>
                </div>
              </div>
            </section>
            <section className=" bg-gray-50   rounded-lg">
              <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                  <center>
                    <h2 className="mb-4 text-2xl font-bold text-gray-700 dark:text-dark inline-block align-top">
                      Misi
                    </h2>
                  </center>

                  <p className="text-gray-500 sm:text-xl dark:text-gray-500">
                    {misi !== null ? misi : " Belum mengisi Misi  "}
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-template-columns: repeat(1, 1fr) gap-4 md:grid-cols-1   gap-3">
            <section className="bg-gray-50 rounded-lg">
              <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                  <center>
                    <h2 className="mb-4 text-2xl font-bold text-gray-700 dark:text-dark inline-block align-top">
                      Informasi
                    </h2>
                  </center>

                  <p className="text-gray-500 sm:text-xl dark:text-gray-500 indent-6">
                    {informasiSekolah !== null
                      ? informasiSekolah
                      : " belum Mengisi Informasi"}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 rounded-lg">
              <div className="py-8 px-8 mx-auto max-w-screen-lg sm:py-16">
                <h2 className="mb-4 text-2xl font-bold text-gray-700 dark:text-dark inline-block align-top text-center">
                  Logo Sekolah
                </h2>

                <div className="flex items-center justify-center p-3 md:p-2">
                  <span className="object-contain rounded-full h-4/5">
                    <img
                      src={image === null ? logo : image}
                      alt="Logo Sekolah"
                      className=" w-2/6 object-contain  "
                    />
                  </span>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 rounded-lg">
              <div className="py-4 px-4 mx-auto max-w-screen-lg sm:py-16">
                <h2 className="mb-4 text-2xl font-bold text-gray-700 dark:text-dark inline-block align-top">
                  About
                </h2>

                <div className="text-gray-500 dark:text-gray-500 p-5 md:p-3">
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
                    <svg
                      className="w-4 h-4 inline-block mr-2"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    Email: {emailSekolah}
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
                    No Telepon: {teleponSekolah}
                  </p>
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
                    <svg
                      className="w-4 h-4 inline-block mr-2"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 576 512"
                    >
                      <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                    Akreditasi Sekolah: {akreditasiSekolah}
                  </p>
                  <p style={{ fontSize: "1em" }} className="p-2 md:p-1">
                    <svg
                      className="w-4 h-4 inline-block mr-2"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M211 7.3C205 1 196-1.4 187.6.8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.3-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z" />
                    </svg>
                    Status: {status}
                  </p>
                </div>
              </div>
              <div className="flex float-right justify-between px-5 py-2.5">
                <a
                  className="bottom-0 right-4 my-4 md:my-2 ml-4 md:ml-2 bg-blue-700 text-white px-4 py-2 rounded-md "
                  href={`/edit-sekolah/${UserId}/${sekolahId}`}
                >
                  Ubah Profile
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
