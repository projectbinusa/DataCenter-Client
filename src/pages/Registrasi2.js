import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/step.css";
import logo from "../assets/dc-logo.png";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Step2() {
  const [namaSekolah, setNamaSekolah] = useState("");
  const [alamatSekolah, setAlamatSekolah] = useState("");
  const [teleponSekolah, setTeleponSekolah] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const reg = {
      namaSekolah: namaSekolah,
      alamatSekolah: alamatSekolah,
      teleponSekolah: teleponSekolah,
    };

    try {
      await axios.post(
        `http://localhost:8080/api/user/${localStorage.getItem(
          "id"
        )}/add-sekolah`,
        reg
      );
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Success Cuy!",
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="sec-reg h-[100%] md:h-[100vh]">
        <div className="mx-auto max-w-screen-xl px-4 py-5 md:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <div className="img-reg">
                <img
                  src={logo}
                  alt=""
                  className="w-[270px] h-[165px] md:w-[370px] md:h-[225px]"
                />
              </div>
            </div>
            <div className="rounded-lg shadow-lg lg:col-span-3 lg:p-12 body-reg p-10">
            <div className="flex justify-center items-center mx-10 md:mx-24 mb-7">
                <div>
                  <div className="text-xl md:text-2xl font-semibold">Buat Akun Baru</div>
                </div>
              </div>

              {/* step start */}
              <div className="flex justify-center">
              <div className="w-full mt-1 md:mt-3">
                <div className="flex">
                  <div className="w-1/2">
                    <div className="relative mb-2">
                      
                      <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-[#f2f7ff] rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-black w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="w-full fill-current"
                            viewBox="1 0 16 15"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-center md:text-base">Step 1</div>
                  </div>

                  <div className="w-1/2">
                    <div className="relative mb-2">
                      <div
                        className="absolute flex align-center items-center align-middle content-center"
                        style={{
                          width: "calc(100% - 2.5rem - 1rem)",
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="w-full bg-[#94add8a9] rounded items-center align-middle align-center flex-1">
                          <div
                            className="w-0 bg-[#f2f7ff] py-1 rounded"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-[#f2f7ff] border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-black text-lg font-semibold w-full">2
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-center md:text-base">Step 2</div>
                  </div>

                </div>
              </div>
              </div>
              {/* step end */}

              <div className="border rounded-lg mt-5 mx-auto md:mt-10 md:mx-20 p-5">
                <form action="" className="p-5" onSubmit={register}>
                  <div className="mb-5">
                    <label
                      htmlFor="namaSekolah"
                      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="namaSekolah"
                        placeholder="Nama Sekolah"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
                        autoComplete="off"
                        value={namaSekolah}
                        onChange={(e) => setNamaSekolah(e.target.value)}
                      />

                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Nama Sekolah
                      </span>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="alamatSekolah"
                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          type="text"
                          id="alamatSekolah"
                          placeholder="Alamat Sekolah"
                          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          required
                          autoComplete="off"
                          value={alamatSekolah}
                          onChange={(e) => setAlamatSekolah(e.target.value)}
                        />

                        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                          Alamat Sekolah
                        </span>
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="teleponSekolah"
                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          type="number"
                          id="teleponSekolah"
                          placeholder="No. Telp Sekolah"
                          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          required
                          autoComplete="off"
                          value={teleponSekolah}
                          onChange={(e) => setTeleponSekolah(e.target.value)}
                        />

                        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                          No. Telp Sekolah
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end mt-5">
                    <button
                      type="submit"
                      className="rounded-lg w-[50%] md:w-[30%] bg-[#f2f7ff] text-sm md:text-base text-center text-black p-3"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
