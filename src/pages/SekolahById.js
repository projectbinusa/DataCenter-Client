import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useNavigate, useParams } from "react-router-dom";
import "../style/table.css";
import $ from "jquery";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserGraduate,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export default function SekolahById() {
  const param = useParams();
  const [namaSekolah, setNamaSekolah] = useState([]);
  const [siswa, setSiswa] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [namaSiswa] = useState("");
  const [tempatLahir] = useState("");
  const [tanggalLahir] = useState("");
  const [excel, setExcel] = useState("");
  const [agama] = useState("");
  const [gender] = useState("");
  const [modal, setModal] = useState(false);
  const [state, setState] = useState({
    options: {
      labels: ["Perempuan", "Laki-Laki"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [religi, setReligi] = useState({
    options: {
      labels: ["Islam", "Kristen", "Katholik", "Hindu", "Buddha", "Khonghucu"],
      colors: [
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
        "#fffb03",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });
  const [extra, setExtra] = useState({
    options: {
      labels: [
        "Olahraga",
        "Seni",
        "Kebahasaan",
        "IT",
        "Olimpiade",
        "Renang",
        "Tari",
      ],
      colors: [
        "#fffb03",
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });

  const addSiswa = async (e) => {
    e.preventDefault();
    e.persist();

    try {
      await Swal.fire({
        title: "Yakin Ingin Menambahkan?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "tambahkan",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(
            `http://localhost:8080/api/sekolah/${param.id}/add-siswa`,
            {
              namaSiswa: namaSiswa,
              tanggalLahir: tanggalLahir,
              tempatLahir: tempatLahir,
              agama: agama,
              gender: gender,
            }
          );
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Menambahkan!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        }
      });
    } catch (error) {
      console.log("error", error);
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

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      setSiswa(response.data);
      const totalPerempuan = response.data.filter(
        (x) => x.gender === "Perempuan"
      ).length;
      setState({
        ...state,
        series: [totalPerempuan, response.data.length - totalPerempuan],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getAllUserData = () => {
    axios
      .get("http://localhost:8080/api/sekolah/" + param.id + "/siswa/")
      .then((response) => {
        setSiswa(response.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan " + error);
      });
  };

  const getNamaSekolah = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id
      );
      setNamaSekolah(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const download = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, download it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "http://localhost:8080/api/excel/download/" + param.id,
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "data-siswa.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
        Swal.fire("Download!", "Your file has been download.", "success");
      }
    });
  };

  const downloadFormat = async () => {
    await Swal.fire({
      title: "Yakin ingin mendownload?",
      text: "Ini adalah file format excel untuk mengimport data siswa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0b409c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, download!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          url: "http://localhost:8080/api/excel/download/",
          method: "GET",
          responseType: "blob",
        }).then((response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "format-excel.xlsx");
          document.body.appendChild(fileLink);

          fileLink.click();
        });
        Swal.fire("Download!", "File berhasil di download.", "success");
      }
    });
  };

  const importExcel = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", excel);

    await axios
      .post("http://localhost:8080/api/excel/upload/user/" + param.id, formData)
      .then(() => {
        Swal.fire("Sukses!", " berhasil ditambahkan.", "success");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
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
            .delete(
              `http://localhost:8080/api/siswa?ids=` + isChecked.toString()
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
    data();
    getAllUserData();
    getNamaSekolah();
  }, []);

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };
// Calculate average age
const calculateAverageAge = () => {
  const today = new Date();
  const totalAges = siswa.reduce((acc, student) => {
    const birthDate = new Date(student.tanggalLahir);
    const age = today.getFullYear() - birthDate.getFullYear();
    return acc + age;
  }, 0);
  const averageAge = totalAges / (siswa.length || 1); // To avoid division by zero
  return Math.round(averageAge);
};

useEffect(() => {
  const fetchData = async () => {
    try {
     const response = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      setSiswa(response.data);

      // Menghitung jumlah siswa berdasarkan agama
      const agamaCounts = {
        Islam: 0,
        Kristen: 0,
        Katholik: 0,
        Hindu: 0,
        Buddha: 0,
        Khonghucu: 0,
      };

      response.data.forEach((student) => {
        // Asumsikan 'agama' adalah atribut yang menyimpan agama siswa dalam respons dari API
        agamaCounts[student.agama]++;
      });

      // Mendapatkan labels yang memiliki jumlah siswa lebih dari 0
      const labelsWithCount = Object.keys(agamaCounts).filter(
        (agama) => agamaCounts[agama] > 0
      );

      // Update state dengan labels yang memiliki data
      setReligi({
        ...religi,
        options: {
          labels: labelsWithCount,
        },
        series: labelsWithCount.map((agama) => agamaCounts[agama]),
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
const [kelas, setKelas] = useState({
  options: {
    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },
    labels: [],
    colors: [
      "#0099cc",
      "#0015ff",
      "#0056ff",
      "#0087ff",
      "#00b8ff",
      "#00eaff",
      "#66ffcc",
    ],
  },
  series: [],
});
useEffect(() => {
  const fetchData = async () => {
    try {
      const kelasResponse = await axios.get(
        "http://localhost:8080/api/kelas/" + param.id + "/kelas"
      );
      const kelasData = kelasResponse.data;

      const muridResponse = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      const muridData = muridResponse.data;

      const kelasCounts = {};
      muridData.forEach((r) => {
        kelasCounts[r.kelas] = 0;
      });

      muridData.forEach((r) => {
        kelasCounts[r.kelas]++;
      });

      const labelsWithCount = Object.keys(kelasCounts).filter(
        (kelas) => kelasCounts[kelas] > 0
      );

      setKelas({
        ...kelas,
        options: {
          ...kelas.options,
          labels: labelsWithCount,
        },
        series: labelsWithCount.map((kelas) => kelasCounts[kelas]),
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const muridResponse = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      const muridData = muridResponse.data;

      const extrakulikulerCounts = {};

      muridData.forEach((student) => {
        extrakulikulerCounts[student.extrakulikuler] = 0;
      });

      muridData.forEach((student) => {
        extrakulikulerCounts[student.extrakulikuler]++;
      });

      const labelsWithCount = Object.keys(extrakulikulerCounts).filter(
        (extrakulikuler) => extrakulikulerCounts[extrakulikuler] > 0
      );

      setExtra({
        ...extra,
        options: {
          ...extra.options,
          labels: labelsWithCount,
        },
        series: labelsWithCount.map(
          (extrakulikuler) => extrakulikulerCounts[extrakulikuler]
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
const calculateTotalStudentsByClass = () => {
  // Assuming 'siswa' contains student data with 'kelas' as the class attribute
  const classCounts = {};

  siswa.forEach((student) => {
    classCounts[student.kelas] = (classCounts[student.kelas] || 0) + 1;
  });

  return classCounts;
};
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="md:px-14 sm:ml-64 mt-24">
            <div className="bg-[#10316b] rounded-lg mb-7 p-1">
              <div className="border-2 border-white rounded-lg px-16">
                <div className="text-md md:text-4xl mt-10 text-white font-bold md:font-semibold my-7">
                  Data Siswa Sekolah {namaSekolah.namaSekolah}
                </div>
              </div>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14">
          {/* Total Murid */}
          <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
            <FontAwesomeIcon
              icon={faUsers}
              className="text-4xl text-blue-600 mr-4"
            />
            <div className="text-left">
              <p className="font-bold mb-1 text-gray-800">Total Murid:</p>
              <h1 className="text-3xl font-bold text-blue-700">
              {siswa.length}
              </h1>
            </div>
          </div>

          {/* Total Murid per Kelas */}
          <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
            <FontAwesomeIcon
              icon={faUserFriends}
              className="text-4xl text-blue-600 mr-4"
            />
            <div className="text-left">
              <p className="font-bold mb-1 text-gray-800">
                Total Murid per Kelas:
              </p>
              <div>
                {Object.entries(calculateTotalStudentsByClass()).map(([kelas, total]) => (
                  <p key={kelas} className="text-blue-700">
                    Kelas {kelas}: {total} Murid
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Rata-Rata Umur */}
          <div className="rounded-xl bg-white p-4 h-[120px] text-center flex items-center shadow-md border border-blue-500 border-2">
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="text-4xl text-blue-600 mr-4"
            />
            <div className="text-left">
              <p className="font-bold mb-1 text-gray-800">Rata-Rata Umur:</p>
              <h1 className="text-3xl font-bold text-blue-700">
                {calculateAverageAge()} Tahun
              </h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-5 mt-5 mb-5">
          {/* Diagram Gender */}
          <div className="text-center md:flex-1">
            <div data-aos="fade-right">
              <div className="rounded-2xl p-1 shadow-xl w-full md:w-[490px] h-[330px]">
                <div className="rounded-xl bg-white p-1  h-[320px]">
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={state.options}
                        series={state.series}
                        type="donut"
                        width="355"
                        className="text-left"
                      />
                    )}
                    <div className=" rounded-xl text-left p-1">
                      <p className="text-black text-md font-bold">Gender</p>
                      <p className="text-black text-xs ">
                        Menampilkan presentase gender murid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Diagram Age */}
          <div className="text-center md:flex-1">
            <div data-aos="fade-right">
              <div className="rounded-2xl p-1 shadow-xl w-full md:w-[490px] h-[330px]">
                <div className="rounded-xl bg-white p-1  h-[320px]">
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={kelas.options}
                        series={kelas.series}
                        type="donut"
                        width="312"
                        className="text-left"
                      />
                    )}
                    <div className=" rounded-xl text-left p-1">
                      <p className="text-black text-md font-bold">Kelas</p>
                      <p className="text-black text-xs ">
                        Menampilkan presentase Kelas murid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-5 my-5">
          {/* Diagram Gelar */}
          <div className="text-center md:flex-1">
            <div data-aos="fade-left">
              <div className="rounded-2xl p-1 shadow-xl w-full md:w-[490px] h-[360px]">
                <div className="rounded-xl bg-white p-1 h-[350px]">
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={extra.options}
                        series={[{ data: extra.series }]}
                        type="bar"
                        width="400"
                        className="text-left"
                      />
                    )}
                    <div className=" rounded-xl text-left p-1">
                      <p className="text-black text-md font-bold">
                        Extrakulikuler
                      </p>
                      <p className="text-black text-xs ">
                        Menampilkan total extrakulikuler murid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagram Agama */}
          <div className="text-center md:flex-1">
            <div data-aos="fade-left">
              <div className="rounded-2xl p-1 shadow-xl w-full md:w-[490px] h-[360px]">
                <div className="rounded-xl bg-white p-1 h-[350px]">
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={religi.options}
                        series={[{ data: religi.series }]}
                        type="bar"
                        width="400"
                        className="text-left"
                      />
                    )}
                    <div className=" rounded-xl text-left p-1">
                      <p className="text-black text-md font-bold">Agama</p>
                      <p className="text-black text-xs ">
                        Menampilkan total agama murid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

              <div className="p-5 bg-white">
          <div className="grid justify-center">
            <div className="grid grid-cols-1 md:flex gap-3 mt-6">
              {siswa.length === 0 ? (
                <></>
              ) : (
                <button
                  className="text-white w-56 add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={download}
                >
                  Download Data
                </button>
              )}
              <button
                className="text-white w-56 add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModal(true)}
              >
                Import Data
              </button>
            </div>
          </div>
          {/* tombol import export dan add end */}

                <div className="p-5 pt-1">
                <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
                  <table className="min-w-full divide-gray-200 text-center p-5" id="example" data-aos="zoom-in">
                    <thead className="th-add">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Pilih
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          No
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Nama Murid
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Agama
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Gender
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Kelas
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 text-center font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-left">
                      {siswa.map((val, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="inset-y-0 left-0 bg-white px-4 py-2">
                              <label className="sr-only" htmlFor={`Row${idx + 1}`}>
                                checkbox
                              </label>
                              <input
                                className="h-5 w-5 rounded border-gray-200"
                                type="checkbox"
                                id={`Row${idx + 1}`}
                                value={val.id}
                                checked={val.isChecked}
                                onChange={(e) => handlecheckbox(e)}
                              />
                            </td>
                            <td className="border-blue-300 left-0 py-2">{idx + 1}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.namaMurid}
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
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {val.kelas}
                            </td>
                            <td className="whitespace-nowrap text-ceter py-2">
                              <div className="flex items-center -space-x-4 hover:space-x-1">
                              <a href={"/edit-siswa-sekolah/" + val.id}>
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
                  </table>
                  {siswa.length !== 0 ? (
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

                {/* modal import dan download format data start */}
                {modal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Import Data</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 opacity-20 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setModal(false)}
                      >
                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative flex-auto">
                      <form
                        action=""
                        className="space-y-4 p-3"
                        onSubmit={importExcel}
                      >
                        <div>
                          <p className="m-5 text-lg font-medium">
                            download file dibawah untuk menginput data siswa
                            anda. (format sudah tertulis)
                          </p>
                          <button
                            className="text-white add-siswa active:bg-slate-300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button"
                            onClick={downloadFormat}
                          >
                            Download File
                          </button>
                        </div>
                        <div className="py-3">
                          <p className="text-lg font-medium mt-5">
                            nb: file excel tidak boleh ada kolom yang blank
                          </p>
                          <p className="mb-5 text-lg font-medium">
                            jika sudah menginputkan data siswa ke dalam file
                            yang sudah anda download tadi, selanjutnya bisa anda
                            importkan dengan menekan tombol dibawah:
                          </p>
                          <input
                            autoComplete="off"
                            type="file"
                            accept=".xlsx"
                            onChange={(e) => setExcel(e.target.files[0])}
                            className="border-2 rounded-md p-3"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-5 p-3 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-white bg-red-700 font-bold uppercase px-6 py-3.5 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setModal(false)}
                          >
                            Batal
                          </button>
                          <button
                            className="bg-gradient-to-r from-[#0b409c] to-[#10316b] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                          >
                            Import
                          </button>
                        </div>
                      </form>
                    </div>
                    {/*footer*/}
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

                {/* modal import dan download format data end */}
              </div>
            </div>
            </div>
            </div>
  );
}
