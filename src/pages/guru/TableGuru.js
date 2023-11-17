import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../style/table.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import PageSidebar from "../../components/PageSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserFriends } from "@fortawesome/free-solid-svg-icons";

export default function TableGuru() {
  const [guru, setGuru] = useState([]);
  const [isChecked, setIsChecked] = useState([]);

  const [state, setState] = useState({
    options: {
      labels: ["Wanita", "Pria"],
      colors: ["lightpink", "lightblue"],
    },
    series: [],
  });

  AOS.init({ duration: 1750, once: true });

  $(document).ready(function () {
    setTimeout(function () {
      $("#example").DataTable();
    }, 1000);
  });

  const [religi, setReligi] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 15,
        },
      },
      labels: [
        "Islam",
        "Kristen",
        "Katholik",
        "Hindu",
        "Buddha",
        "Khonghucu",
        "Non",
      ],
      colors: [
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
        "#fffb03",
        "#000000",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });

  const [gelar, setGelar] = useState({
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      labels: [
        "S.Ag",
        "S.Sos",
        "S.Ikom",
        "S.Pd",
        "S.T",
        "S.Kom",
        "S.Si",
        "S.Mat",
        "S.Pd.I",
        "S.S",
        "S.Sn",
        "Lainnya",
      ],
      colors: [
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
        "#fffb03",
        "#000000",
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  });

  const [ageData, setAgeData] = useState({
    options: {
      labels: [
        "20-25 tahun",
        "25-30 tahun",
        "30-35 tahun",
        "35-40 tahun",
        "40-45 tahun",
        "45-50 tahun",
        "50-55 tahun",
        "55-60 tahun",
      ],
      colors: [
        "#007bff", // Blue
        "#3399ff", // Light Blue
        "#0056b3", // Dark Blue
        "#66a3ff", // Sky Blue
        "#003366", // Navy Blue
        "#99c2ff", // Baby Blue
        "#004080", // Royal Blue
        "#b3d9ff", // Ice Blue
      ],
    },
    series: [0, 0, 0, 0, 0, 0, 0, 0],
  });

  const dataa = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
      );
      setGuru(response.data);

      // Calculate age ranges
      const now = new Date();
      const ageRanges = [20, 25, 30, 35, 40, 45, 50, 55, 60];
      const ageCounts = Array(ageRanges.length).fill(0);

      response.data.forEach((guru) => {
        const birthDate = new Date(guru.tanggalLahir);
        const age = now.getFullYear() - birthDate.getFullYear();

        // Check if birthday has occurred this year
        const isBirthdayPassed =
          now.getMonth() > birthDate.getMonth() ||
          (now.getMonth() === birthDate.getMonth() &&
            now.getDate() >= birthDate.getDate());

        // Adjust age based on the current month and day
        const adjustedAge = isBirthdayPassed ? age : age - 1;

        for (let i = 0; i < ageRanges.length - 1; i++) {
          if (adjustedAge >= ageRanges[i] && adjustedAge < ageRanges[i + 1]) {
            ageCounts[i]++;
            break;
          }
        }
      });

      setAgeData({
        ...ageData,
        series: ageCounts,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const data = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
      );
      setGuru(response.data);
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

  const dta = async () => {
    try {
      const respon = await axios.get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
      );
      setGuru(respon.data);
      const islam = respon.data.filter((r) => r.agama === "Islam").length;
      const kristen = respon.data.filter((r) => r.agama === "Kristen").length;
      const katholik = respon.data.filter((r) => r.agama === "Katholik").length;
      const hindu = respon.data.filter((r) => r.agama === "Hindu").length;
      const buddha = respon.data.filter((r) => r.agama === "Buddha").length;
      const khonghucu = respon.data.filter(
        (r) => r.agama === "Khonghucu"
      ).length;
      const non = respon.data.filter((r) => r.agama === "Non").length;
      setReligi({
        ...religi,
        series: [islam, kristen, katholik, hindu, buddha, khonghucu, non],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const diagramgelar = async () => {
    try {
      const respon = await axios.get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
      );
      setGuru(respon.data);
      const sag = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Ag"
      ).length;
      const ssos = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Sos"
      ).length;
      const sikom = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Ikom"
      ).length;
      const spd = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Pd"
      ).length;
      const st = respon.data.filter((r) => r.gelarPendidikan === "S.T").length;
      const skom = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Kom"
      ).length;
      const ssi = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Si"
      ).length;
      const smat = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Mat"
      ).length;
      const spdi = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Pd.I"
      ).length;
      const ss = respon.data.filter((r) => r.gelarPendidikan === "S.S").length;
      const ssn = respon.data.filter(
        (r) => r.gelarPendidikan === "S.Sn"
      ).length;
      const lainnya = respon.data.filter(
        (r) => r.gelarPendidikan === "Lainnya"
      ).length;
      setGelar({
        ...gelar,
        series: [
          sag,
          ssos,
          sikom,
          spd,
          st,
          skom,
          ssi,
          smat,
          spdi,
          ss,
          ssn,
          lainnya,
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    await axios
      .get(
        "http://localhost:8080/api/guru/" +
          localStorage.getItem("sekolahId") +
          "/guru"
      )
      .then((res) => {
        setGuru(res.data);
      });
  };

  const deleteGuru = async (id) => {
    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data guru ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:8080/api/guru/" + id).then(() => {
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

  const alldelete = async () => {
    if (isChecked.length !== 0) {
      await Swal.fire({
        title: "Anda yakin?",
        text: "Yakin ingin menghapus data guru ini?",
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
              `http://localhost:8080/api/guru?ids=` + isChecked.toString()
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

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((e) => e !== value));
    }
  };

  useEffect(() => {
    getAll();
    data();
    dataa();
    dta();
    diagramgelar();
  }, []);

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };

  const totalGuruIcon = (
    <FontAwesomeIcon
      icon={faUserFriends}
      className="text-4xl text-black-600 mr-4"
    />
  );

  const averageAgeIcon = (
    <FontAwesomeIcon icon={faUsers} className="text-4xl text-black-600 mr-4" />
  );

  return (
    <>
      <div className="flex">
        <PageSidebar />
        <div className="p-4 sm:ml-64 mt-16">
          <div class="grid grid-cols-4 gap-4">
            {/* Total Guru Card tes */}
            <div className="rounded-xl bg-white p-1 h-[100px] ml-8">
              <div className="rounded-xl p-4 h-[100px] flex items-center">
                <div className="flex items-start">
                  <div className="self-start">
                    {" "}
                    {/* Tambahkan class self-start untuk ikon */}
                    {totalGuruIcon}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-lg text-black">Total Guru</p>
                  <p className="text-xl font-bold text-black">{guru.length}</p>
                </div>
              </div>
            </div>

            {/* Rata-rata Umur Card */}
            <div className="rounded-xl bg-white p-1  h-[100px] mx-3">
              <div className="rounded-xl p-4 h-[100px] flex items-center">
                {averageAgeIcon}
                <div>
                  <p className="text-lg text-black">Rata-rata Umur</p>
                  <p className="text-lg font-bold text-black">
                    {/* Calculate average age here */}
                    {guru.length > 0
                      ? (
                          guru.reduce(
                            (sum, { tanggalLahir }) =>
                              sum +
                              (new Date().getFullYear() -
                                new Date(tanggalLahir).getFullYear()),
                            0
                          ) / guru.length
                        ).toFixed(2)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 mt-5 mb-5">
            {/* Diagram Gender */}
            <div className="text-center">
              <div data-aos="fade-right">
                <div className=" rounded-2xl p-1 shadow-xl w-[370px] md:w-[490px] h-[330px]">
                  <div className="rounded-xl bg-white p-1  h-[320px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
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
                          Menampilkan presentase gender guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Diagram Age */}
            <div className="text-center">
              <div data-aos="fade-right">
                <div className=" rounded-2xl p-1 shadow-xl w-[370px] md:w-[490px] h-[330px]">
                  <div className="rounded-xl bg-white p-1  h-[320px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
                        <div>belum ada data</div>
                      ) : (
                        <Chart
                          options={ageData.options}
                          series={ageData.series}
                          type="donut"
                          width="380"
                          className="text-left"
                        />
                      )}
                      <div className=" rounded-xl text-left p-1">
                        <p className="text-black text-md font-bold">Umur</p>
                        <p className="text-black text-xs ">
                          Menampilkan presentase umur guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center gap-5 my-5">
            {/* Diagram Gelar */}
            <div className="text-center">
              <div data-aos="fade-left">
                <div className=" rounded-2xl p-1 shadow-xl w-[370px] md:w-[490px] h-[360px]">
                  <div className="rounded-xl bg-white p-1 h-[350px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
                        <div>belum ada data</div>
                      ) : (
                        <Chart
                          options={gelar.options}
                          series={[{ data: gelar.series }]}
                          type="bar"
                          width="400"
                          className="text-left"
                        />
                      )}
                      <div className=" rounded-xl text-left p-1">
                        <p className="text-black text-md font-bold">
                          Gelar Pendidikan
                        </p>
                        <p className="text-black text-xs ">
                          Menampilkan total gelar pendidikan guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagram Agama */}
            <div className="text-center">
              <div data-aos="fade-left">
                <div className=" rounded-2xl p-1 shadow-xl w-[370px] md:w-[490px] h-[360px]">
                  <div className="rounded-xl bg-white p-1 h-[350px]">
                    <div className="m-5 overflow-hidden overflow-x-auto">
                      {guru.length === 0 ? (
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
                          Menampilkan total agama guru
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          {/* tabel guru start */}

          <div className="p-5 bg-white">
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
                      Nama Guru
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
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {guru.map((val, idx) => {
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
                          {val.namaGuru}
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
                        <td className="whitespace-nowrap text-ceter py-2">
                          <div className="flex items-center -space-x-4 hover:space-x-1">
                            <a href={"/detail-guru/" + val.id}>
                              <button
                                className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                                type="button"
                              >
                                {/* Eye SVG */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2 12s3 7.5 10 7.5 10-7.5 10-7.5-3-7.5-10-7.5S2 12 2 12z"
                                  />
                                </svg>
                              </button>
                            </a>

                            <button
                              className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                              type="button"
                              onClick={() => deleteGuru(val.id)}
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
              {guru.length !== 0 ? (
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
          {/* tabel siswa end */}
        </div>
      </div>
    </>
  );
}
