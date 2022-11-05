import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import Swal from "sweetalert2";

export default function TableSiswaAdmin() {
  const [siswa, setSiswa] = useState([]);

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const allSiswa = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/siswa/");
      setSiswa(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSiswa = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data siswa ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/api/siswa/" + id).then(() => {
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

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };

  useEffect(() => {
    allSiswa();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center">
        <main className="s-content w-[1125px] p-5">
          <div className="max-w p-5">
            <div className="border bg-[#10316b] mb-7 px-16">
              <div className="text-4xl text-white font-semibold my-7">
                Data Seluruh Siswa SMP di Wilayah Semarang
              </div>
            </div>
          </div>

          <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
            <table
              className="min-w-full divide-gray-200 text-center p-5"
              id="example"
            >
              <thead className="th-add">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Nama Siswa
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Tempat Lahir
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Tanggal Lahir
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Agama
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Gender
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Sekolah
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {siswa.map((val, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="sticky border-blue-300 left-0 py-2">
                        {idx + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {val.namaSiswa}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {val.tempatLahir}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {val.tanggalLahir}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                          {val.agama}
                        </strong>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <strong
                          className="rounded px-3 py-1.5 text-xs font-medium"
                          style={val.gender === "Laki-Laki" ? male : female}
                        >
                          {val.gender}
                        </strong>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                          {val.sekolah.namaSekolah}
                        </strong>
                      </td>
                      <td className="whitespace-nowrap text-ceter py-2">
                        <div className="flex items-center -space-x-4 hover:space-x-1">
                          <a href={"/edit-siswa-admin/" + val.id}>
                            <button
                              className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                              type="button"
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
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                          </a>
                          <button
                            className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                            type="button"
                            onClick={() => deleteSiswa(val.id)}
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
                {/* {siswa.map((data, idx) => (
                                ))} */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
