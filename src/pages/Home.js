import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavComp from "../components/NavComp";
import "../css/form.css";
import AOS from 'aos';


export default function Home() {
  const [sekolah, setSekolah] = useState([])
  const [searchTerm, setsearchTerm] = useState("");

  AOS.init({ duration: 1750, once: true });

  const getAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/useraall")
      setSekolah(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <NavComp />
      <div className="p-5">
        <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center" data-aos="fade-right">
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Data Sekolahan
              </h2>
              <p className="hidden text-gray-500 md:mt-4 md:block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas
                tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et
                fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt
                duis.
              </p>
              <div className="mt-4 md:mt-8">
                <a href="#" className="inline-block rounded bg-sky-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-sky-700 focus:outline-none focus:ring focus:ring-yellow-400">
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
          <img alt="Violin" src="https://medias-cite.coop/wp-content/uploads/2019/06/1026-scaled.jpg" className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-tl-[30px] md:h-[calc(100%_-_4rem)] md:rounded-tl-[60px]"/>
        </section>
        <div className="my-20 bg-gray-50 p-10">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Data Sekolah Menengah Pertama Di Kota Semarang
            <div className="mt-4 border-t-2 border-indigo-100 pt-2">
            </div>
          </h2>
          <div className="flex p-5 justify-around gap-5">
            <div data-aos="fade-left">
            <a
                href="#"
                className="block overflow-hidden rounded-lg border border-gray-100 shadow-sm"
              >
                <span className="inline-block rounded-sm p-2 text-dark">
                <svg className="h-32 w-32 text-dark"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4l-139 92.7L37.6 126C15.6 130.9 0 150.3 0 172.8V464c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V172.8c0-22.5-15.6-42-37.6-46.9L476.8 98.1 337.8 5.4zM256 416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H256V416zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM408 176c0 48.6-39.4 88-88 88s-88-39.4-88-88s39.4-88 88-88s88 39.4 88 88zm-88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z"/></svg>
                </span>
                <div className="p-6">
                  <h3 className="text-xl font-bold">
                      JUMLAH SMP
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>

                  <div
                    className="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600"
                  >
                    Find out more
                    <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </a>
            </div>
            <div  data-aos="fade-right">
              <a
                href="#"
                className="block overflow-hidden rounded-lg border border-gray-100 shadow-sm"
              >
                <span className="inline-block rounded-sm p-2 text-dark">
                <svg className="h-32 w-32"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" /></svg>
                </span>
                <div className="p-6">
                  <h3 className="text-xl font-bold">
                      JUMLAH SISWA SMP
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>

                  <div
                    className="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600"
                  >
                    Find out more
                    <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </a>
            </div>
            <div>
            <a
                href="#"
                className="block overflow-hidden rounded-lg border border-gray-100 shadow-sm"
              >
                <span className="inline-block rounded-sm p-2 text-dark">
                <svg className="h-32 w-32"
                  stroke="currentColor"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z"/></svg>
                </span>
                <div className="p-6">
                  <h3 className="text-xl font-bold">
                      STATISTIK DIAGRAM SEKOLAH 
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </p>

                  <div
                    className="mt-4 inline-block border-b border-blue-500 pb-1 font-medium text-blue-600"
                  >
                    Find out more
                    <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


