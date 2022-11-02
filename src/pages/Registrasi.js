import React, { useState } from "react";
import "../css/registrasi.css";
import logo from "../assets/dc-logo.png";
import {  useNavigate } from "react-router-dom";
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
                  <div className="text-xs">
                    enter your email and password to create account
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="step bg-[#f2f7ff] text-black">1</div>
                <div className="flex items-center justify-center w-96">
                  <div className="border-t border-gray-400 w-full h-0"></div>
                </div>
                <div className="step">2</div>
              </div>

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
                    <button type="submit" className="rounded-lg w-[30%] bg-[#f2f7ff] text-black p-3">
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
