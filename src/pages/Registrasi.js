import React, { useState } from "react";
import "../style/registrasi.css";
import logo from "../assets/dc-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registrasi() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const reg = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:8080/api/register", reg);
      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Registrasi telah berhasil!",
      });
      localStorage.setItem("id", res.data.id);
      navigate("/registrasi2");
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
                  <div className="text-2xl font-semibold">Buat Akun Baru</div>
                </div>
              </div>

              {/* step start */}
              <div className="w-full mt-3">
                <div className="flex">
                  <div className="w-1/2">
                    <div className="relative mb-2">
                      <div className="w-10 h-10 mx-auto bg-[#f2f7ff] rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-black text-lg font-semibold w-full ">
                          1
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-center md:text-base">
                      Step 1
                    </div>
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
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="w-10 h-10 mx-auto bg-[#94add8a9] border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-white text-xl font-semibold w-full">
                          2
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-center md:text-base">
                      Step 2
                    </div>
                  </div>
                </div>
              </div>
              {/* step end */}

              <div className="border rounded-lg mt-10 mx-20 p-5">
                <form action="" className="p-5" onSubmit={register}>
                  <div className="mb-5">
                    <label
                      htmlFor="UserEmail"
                      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="email"
                        id="UserEmail"
                        placeholder="Email"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Email
                      </span>
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="UserPassword"
                      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="password"
                        id="UserPassword"
                        placeholder="Password"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="rounded-lg w-[30%] bg-[#f2f7ff] text-black p-3"
                    >
                      Next
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
