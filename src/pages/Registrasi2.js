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
      <div className="sec-reg">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <div className="img-reg">
                <img
                  src={logo}
                  alt=""
                  style={{ width: "370px", height: "220px" }}
                />
              </div>
            </div>
            <div className="rounded-lg shadow-lg lg:col-span-3 lg:p-12 body-reg p-10">
              <div className="flex justify-center items-center mx-24 mb-7">
                <div>
                  <div className="text-2xl font-semibold">
                    Create New Account
                  </div>
                  <div className="text-xs">
                    enter your email and password to create account
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="step bg-[#f2f7ff] text-black">1</div>
                <div className="flex items-center justify-center w-96">
                  <div className="border-t border-gray-100 w-full h-0"></div>
                </div>
                <div className="step bg-[#f2f7ff] text-black">2</div>
              </div>

              <div className="border rounded-lg mt-10 mx-20 p-5">
                <form action="" className="p-5" onSubmit={register}>
                  <div className="mb-5">
                    <label
                      for="namaSekolah"
                      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="text"
                        id="namaSekolah"
                        placeholder="Nama Sekolah"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
                        value={namaSekolah}
                        onChange={(e) => setNamaSekolah(e.target.value)}
                      />

                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Nama Sekolah
                      </span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label
                        for="alamatSekolah"
                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          type="text"
                          id="alamatSekolah"
                          placeholder="Alamat Sekolah"
                          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          required
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
                        for="teleponSekolah"
                        className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                      >
                        <input
                          type="number"
                          id="teleponSekolah"
                          placeholder="No. Telp Sekolah"
                          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                          required
                          value={teleponSekolah}
                          onChange={(e) => setTeleponSekolah(e.target.value)}
                        />

                        <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                          No. Telp Sekolah
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="rounded-lg w-[30%] bg-[#f2f7ff] text-black p-3"
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
