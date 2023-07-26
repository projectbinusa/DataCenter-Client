import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { base_url } from "../utils/baseURL";
// import Checkbox from "./Checkbox";

export default function TableSiswaAdmin() {
  const [siswa, setSiswa] = useState([]);
  // const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState([]);

  const totalPage = totalPages.length - 1;

  const allSiswa = async (keyword, page, size) => {
    try {
      const response = await axios.get(
        `${base_url}/siswa?nama=${keyword}&page=${page}&size=${size}`
      );
      setSiswa(response.data.content);
      const pages = [];
      for (let i = 0; i < response.data.totalPages; i++) {
        pages.push(i);
      }
      setTotalPages(pages);
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
        axios.delete(`${base_url}/siswa/${id}`).then(() => {
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

  // const handleSelectAll = () => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(siswa.map((li) => li.id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  const handleClick = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsCheck([...isCheck, value]);
    } else {
      setIsCheck(isCheck.filter((e) => e !== value));
    }
  };

  // console.log(isCheck);

  const alldelete = async () => {
    if (isCheck.length !== 0) {
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
          axios
            .delete(`${base_url}/siswa?ids=${isCheck.toString()}`)
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

  const search = (kw, pg, sz) => {
    setPage(0);
    allSiswa(kw, pg, sz);
  };

  const perPage = (size) => {
    setSize(size);
    setPage(0);
    allSiswa(keyword, page, size);
  };

  const curr = (pg) => {
    setPage(pg);
    allSiswa(keyword, pg, size);
  };

  const prev = () => {
    if (page <= 0) {
      return;
    }
    const prv = page - 1;
    setPage(prv);
    allSiswa(keyword, prv, size);
  };
  const next = () => {
    if (page >= totalPage) {
      return;
    }
    const nxt = page + 1;
    setPage(nxt);
    allSiswa(keyword, nxt, size);
  };

  useEffect(() => {
    allSiswa(keyword, page, size);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center">
        <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
          <div className="bg-[#10316b] rounded-lg mb-7 p-1">
            <div className="border-2 border-white rounded-lg px-16">
              <div className="text-md md:text-4xl text-white font-bold md:font-semibold my-7">
                Data Seluruh Siswa SMP di Wilayah Semarang
              </div>
            </div>
          </div>
          <div className="p-3 flex justify-between items-center">
            <div className="space-x-2">
              <label className="font-semibold">Show</label>
              <select
                className="border rounded"
                onClick={(e) => perPage(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </select>
              <label className="font-semibold">entries</label>
            </div>
            <form className="space-x-2">
              <label className="text-sm font-semibold">
                Search by Nama Siswa
              </label>
              <input
                type="text"
                id="Search"
                placeholder="Type here.."
                className="p-2 sm:text-sm rounded border focus:ring-0 focus:outline-none"
                onChange={(e) => search(e.target.value, page, size)}
              />
            </form>
          </div>
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full divide-gray-200 text-center p-5 border border-gray-200">
              <thead className="th-add">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                    {/* <Checkbox
                        className="h-5 w-5 rounded border-gray-200"
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        handleClick={handleSelectAll}
                        checked={isCheckAll}
                      /> */}
                    Pilih
                  </th>
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
              {siswa.length !== 0 ? (
                <tbody className="">
                  {siswa.map((val, idx) => {
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
                            checked={val.isCheck}
                            onChange={(e) => handleClick(e)}
                          />

                          {/* <Checkbox
                            className="h-5 w-5 rounded border-gray-200"
                            type="checkbox"
                            id={val.id}
                            name={val.namaSiswa}
                            handleClick={handleClick}
                            isChecked={isCheck.includes(val.id)}
                          /> */}
                        </td>
                        <td className="border-blue-300 left-0 py-2">
                          {page * size + idx + 1}
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
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td className="py-5" colSpan={8}>
                      Tidak ada data
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            {siswa.length !== 0 ? (
              <div className="flex justify-center md:justify-between mt-5">
                <button
                  className="text-red-700 bg-red-100 active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded hover:shadow outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="button"
                  onClick={alldelete}
                >
                  Hapus yang dipilih
                </button>
                <div className="flex gap-3">
                  <button
                    className={`w-10 h-10 border rounded-full flex justify-center items-center bg-gray-200 ${
                      page <= 0
                        ? "cursor-not-allowed"
                        : "hover:fill-white hover:bg-[#10316b]"
                    }`}
                    onClick={prev}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="inherit"
                      className="bi bi-chevron-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      />
                    </svg>
                  </button>
                  {totalPages.map((pg, idx) => (
                    <button
                      className={`w-10 h-10 border rounded-full ${
                        page === pg ? "bg-[#10316b] text-white" : "bg-gray-200"
                      }`}
                      key={idx}
                      onClick={() => curr(pg)}
                    >
                      {pg + 1}
                    </button>
                  ))}
                  <button
                    className={`w-10 h-10 border rounded-full flex justify-center items-center bg-gray-200 ${
                      page >= totalPage
                        ? "cursor-not-allowed"
                        : "hover:fill-white hover:bg-[#10316b]"
                    }`}
                    onClick={next}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="inherit"
                      className="bi bi-chevron-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-end gap-3 mt-3">
                <button
                  className={`w-10 h-10 border rounded-full flex justify-center items-center bg-gray-200 ${
                    page <= 0
                      ? "cursor-not-allowed"
                      : "hover:fill-white hover:bg-[#10316b]"
                  }`}
                  onClick={prev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="inherit"
                    className="bi bi-chevron-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
                {totalPages.map((pg, idx) => (
                  <button
                    className={`w-10 h-10 border rounded-full ${
                      page === pg ? "bg-[#10316b] text-white" : "bg-gray-200"
                    }`}
                    key={idx}
                    onClick={() => curr(pg)}
                  >
                    {pg + 1}
                  </button>
                ))}
                <button
                  className={`w-10 h-10 border rounded-full flex justify-center items-center bg-gray-200 ${
                    page >= totalPage
                      ? "cursor-not-allowed"
                      : "hover:fill-white hover:bg-[#10316b]"
                  }`}
                  onClick={next}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="inherit"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
