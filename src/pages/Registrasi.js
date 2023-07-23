import React, { useState } from "react";
import "../style/registrasi.css";
import logo from "../assets/dc-logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Registrasi() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typePass, setTypePass] = useState("password");

  const togglePass = () => {
    if (typePass === "password") {
      setTypePass("text");
    } else {
      setTypePass("password");
    }
  };

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
      <div className="sec-reg h-[100%] md:h-[100vh]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <div className="img-reg">
                <img
                  src={logo}
                  alt="logo-dc"
                  className="w-[270px] h-[165px] md:w-[370px] md:h-[225px]"
                />
              </div>
            </div>
            <div className="rounded-lg shadow-lg lg:col-span-3 lg:p-12 body-reg p-10">
              <div className="flex justify-center items-center mx-10 md:mx-24 mb-7">
                <div>
                  <div className="text-xl md:text-2xl font-semibold">
                    Buat Akun Baru
                  </div>
                </div>
              </div>

              {/* step start */}
              <div className="flex justify-center">
                <div className="w-full mt-1 md:mt-3">
                  <div className="flex">
                    <div className="w-1/2">
                      <div className="relative mb-2">
                        <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-[#f2f7ff] rounded-full text-lg text-white flex items-center">
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

                        <div className="w-7 h-7 md:w-10 md:h-10 mx-auto bg-[#94add8a9] border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                          <span className="text-center text-white text-lg font-semibold w-full">
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
              </div>
              {/* step end */}

              <div className="border rounded-lg mt-5 mx-auto md:mt-10 md:mx-20 p-5">
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
                      <div className="flex gap-2">
                        <input
                          type={typePass}
                          id="UserPassword"
                          placeholder="Password"
                          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent  focus:outline-none focus:ring-0 sm:text-sm"
                          required
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span onClick={togglePass} className="pt-0.5">
                          {typePass === "password" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye-slash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                            </svg>
                          )}
                        </span>
                      </div>

                      <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                  </div>
                  <div className="flex justify-center md:justify-end mt-5">
                    <button
                      type="submit"
                      className="rounded-lg w-[50%] md:w-[30%] bg-[#f2f7ff] text-sm md:text-base text-center text-black p-3"
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
