import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/table.css";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";

export default function DataKelas() {
  const param = useParams();
  const [extra, setExtra] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const navigate = useNavigate();

  const getAll = async () => {
    await axios
      .get(`http://localhost:8080/api/extra/${param.id}/extra`)
      .then((res) => {
        setExtra(res.data);
      });
  };

  const de = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data extra ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/api/extra/" + id).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menghapus!!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        });
      }
    });
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };
  const alldelete = async () => {
    if (isChecked.length !== 0) {
      await Swal.fire({
        title: "Anda yakin?",
        text: "Yakin ingin menghapus data extra ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `http://localhost:8080/api/extra?ids=` + isChecked.toString()
            )
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Berhasil Menghapus!!",
                showConfirmButton: false,
                timer: 1500,
              });
              window.location.reload();
            });
        }
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tidak ada data yang dipilih",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="flex my-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="p-5 bg-white">
              <div className="grid justify-center mb-5">
                <h3 className="text-4xl  "> Data Extra</h3>
              </div>
              <div className="grid justify-end mb-5 w-auto">
                <div className="grid grid-cols-1 md:flex gap-3 mt-6 ">
                  <a
                    href={"/tambah-extra-sekolah/" + param.id}
                    className="text-center text-white w-auto add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    Tambah
                  </a>
                </div>
              </div>
              <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                <table
                  className="min-w-full divide-gray-200 text-center p-5"
                  id="example"
                  data-aos="zoom-in"
                >
                  <thead className="th-add">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Pilih
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        No
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Nama Extra
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 text-left font-medium">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {extra.map((val, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="inset-y-0 left-0 bg-white px-4 py-2">
                            <label className="sr-only" htmlFor="Row1">
                              checkbox
                            </label>

                            <input
                              className="h-5 w-5 rounded border-gray-200"
                              type="checkbox"
                              id="Row1"
                              value={val.id}
                              checked={val.isChecked}
                              onChange={(e) => handlecheckbox(e)}
                            />
                          </td>

                          <td className="border-blue-300 left-0 py-2">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.namaExtra}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {val.status}
                          </td>

                          <td className="whitespace-nowrap text-center py-2">
                            <div className="flex items-center -space-x-5 hover:space-x-1">
                              <a
                                className="z-30 block rounded-full border-2 border-white bg-green-100 p-4 text-green-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-green-50"
                                href={
                                  "/edit-extra-sekolah/" +
                                  val.id +
                                  "/" +
                                  param.id
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="1em"
                                  viewBox="0 0 512 512"
                                >
                                  {" "}
                                  <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                                </svg>
                              </a>
                              <button
                                className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                                type="button"
                                onClick={() => de(val.id)}
                              >
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {extra.length !== 0 ? (
                  <div className="grid justify-center md:justify-start">
                    <button
                      className="text-red-700 bg-red-100 active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none my-5 md:my-2 ease-linear transition-all duration-150"
                      type="button"
                      onClick={alldelete}
                    >
                      Hapus yang dipilih
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
