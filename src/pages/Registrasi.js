import React, { useState } from "react";
import "../css/registrasi.css";
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
                  <div className="text-2xl font-semibold">
                    Create New Account
                  </div>
                </div>
              </div>
              {/* <div className="flex">
                <div className="step bg-[#f2f7ff] text-black">1</div>
                <div className="flex items-center justify-center w-96">
                  <div className="border-t border-gray-400 w-full h-0"></div>
                </div>
                <div className="step">2</div>
              </div> */}

              {/* step start */}
              <div className="w-full mt-3">
                <div className="flex">
                  <div className="w-1/2">
                    <div className="relative mb-2">
                      <div className="w-10 h-10 mx-auto bg-[#f2f7ff] rounded-full text-lg text-white flex items-center">
                        <span className="text-center text-black w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="w-full fill-current"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-center md:text-base">
                      Add Email
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
                        <span className="text-center text-white w-full">
                          <svg
                            className="w-full fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              className="heroicon-ui"
                              d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-center md:text-base">Setting</div>
                  </div>
                </div>
              </div>
              {/* step end */}

              <div className="border rounded-lg mt-10 mx-20 p-5">
                <form action="" className="p-5" onSubmit={register}>
                  <div className="mb-5">
                    <label
                      for="UserEmail"
                      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="email"
                        id="UserEmail"
                        placeholder="Email"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
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
                      for="UserPassword"
                      className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        type="password"
                        id="UserPassword"
                        placeholder="Password"
                        className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        required
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
