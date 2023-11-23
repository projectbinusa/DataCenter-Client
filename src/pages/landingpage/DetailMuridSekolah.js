import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserGraduate,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

export default function Table() {
  const [siswa, setSiswa] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [namaMurid, setNamaMurid] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [gender, setGender] = useState("");
  const [excel, setExcel] = useState("");
  const [agama, setAgama] = useState();
  const param = useParams();
  const [state, setState] = useState({
    options: {
      labels: ["Perempuan", "Laki-laki"],
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
  const [kelas, setKelas] = useState({
    options: {
      labels: ["X", "XI", "XII"],
      colors: ["#ff1500", "#0015ff", "#fffb03"],
    },
    series: [0, 0, 0],
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

  const dt = async () => {
    try {
      const respon = await axios.get(
        "http://localhost:8080/api/sekolah/" + param.id + "/siswa"
      );
      setSiswa(respon.data);
      const X = respon.data.filter((r) => r.kelas === "X").length;
      const XI = respon.data.filter((r) => r.kelas === "XI").length;
      const XII = respon.data.filter((r) => r.kelas === "XII").length;
      setKelas({
        ...kelas,
        series: [X, XI, XII],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    await axios
      .get("http://localhost:8080/api/sekolah/" + param.id + "/siswa")
      .then((res) => {
        setSiswa(res.data);
      });
  };

  useEffect(() => {
    getAll();
    data();
    dt();
  }, []);

  const male = {
    backgroundColor: "lightblue",
  };
  const female = {
    backgroundColor: "lightpink",
  };

  const calculateTotalStudentsByClass = () => {
    const totalStudents = siswa.length;
    const studentsByClass = {
      X: siswa.filter((student) => student.kelas === "X").length,
      XI: siswa.filter((student) => student.kelas === "XI").length,
      XII: siswa.filter((student) => student.kelas === "XII").length,
    };
    return { totalStudents, studentsByClass };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/sekolah/${localStorage.getItem(
            "sekolahId"
          )}/siswa`
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

  return (
    <>
      <div className="flex flex-col md:flex-row mx-0 my-auto">
        {/* <PageSidebar /> */}
        <div className=" rounded-xl p-4 mt-16 mx-auto  w-full max-w-[85%] shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Murid */}
            <div className="rounded-xl bg-white p-4 h-[150px] text-center flex items-center border-2">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-4xl text-black-600 mr-4"
              />
              <div className="text-left">
                <p className="font-bold mb-1 text-gray-800">Total Murid</p>
                <h1 className="text-3xl font-bold text-black-700">
                  {calculateTotalStudentsByClass().totalStudents} Murid
                </h1>
              </div>
            </div>

            {/* Total Murid per Kelas */}
            <div className="rounded-xl bg-white p-4 h-[150px] text-center flex items-center border-2">
              <FontAwesomeIcon
                icon={faUserFriends}
                className="text-4xl text-black-600 mr-4"
              />
              <div className="text-left">
                <p className="font-bold mb-1 text-gray-800">
                  Total Murid per Kelas
                </p>
                <div>
                  <p className="text-black-700">
                    Kelas X: {calculateTotalStudentsByClass().studentsByClass.X}
                  </p>
                  <p className="text-black-700">
                    Kelas XI:{" "}
                    {calculateTotalStudentsByClass().studentsByClass.XI}
                  </p>
                  <p className="text-black-700">
                    Kelas XII:{" "}
                    {calculateTotalStudentsByClass().studentsByClass.XII}
                  </p>
                </div>
              </div>
            </div>

            {/* Rata-Rata Umur */}
            <div className="rounded-xl bg-white p-4 h-[150px] text-center flex items-center border-2">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="text-4xl text-black-600 mr-4"
              />
              <div className="text-left">
                <p className="font-bold mb-1 text-gray-800">Rata-Rata Umur</p>
                <h1 className="text-3xl font-bold text-black-700">
                  {siswa.length > 0
                    ? (
                        siswa.reduce(
                          (sum, { tanggalLahir }) =>
                            sum +
                            (new Date().getFullYear() -
                              new Date(tanggalLahir).getFullYear()),
                          0
                        ) / siswa.length
                      ).toFixed(2)
                    : "N/A"}{" "}
                  Tahun
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-5 my-10">
            {/* Chart - Gender */}
            <div data-aos="fade-right">
              <div className=" rounded-2xl p-1 shadow-xl w-[380px] md:w-[400px]">
                <div className="rounded-xl bg-white p-1">
                  <div className=" rounded-xl p-1">
                    <p className="text-white text-2xl text-center">Gender</p>
                  </div>
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    <Chart
                      type="donut"
                      width={350}
                      className="text-center"
                      options={state.options}
                      series={state.series}
                    />
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

            {/* Chart - Kelas */}
            <div data-aos="fade-center">
              <div className=" rounded-2xl p-1 shadow-xl w-[350px] md:w-[400px]">
                <div className="rounded-xl bg-white p-1">
                  <div className=" rounded-xl p-1">
                    <p className="text-white text-2xl text-center">Kelas</p>
                  </div>
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    <Chart
                      options={kelas.options}
                      series={kelas.series}
                      type="donut"
                      width={300}
                      className="text-left"
                    />
                    <div className=" rounded-xl text-left p-1">
                      <p className="text-black text-md font-bold">Kelas</p>
                      <p className="text-black text-xs ">
                        Menampilkan presentase kelas murid
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-5 my-10">
            {/* Diagram Agama */}
            <div className="text-center">
              <div data-aos="fade-left">
                <div className="  rounded-2xl p-1 shadow-xl w-[370px] md:w-[490px] h-[400px]">
                  <div className="rounded-xl bg-white p-1 h-[390px]">
                    <div className=" rounded-xl p-1">
                      <p className="text-white text-2xl text-center">Agama</p>
                    </div>
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
                          Menampilkan presentase agama murid
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tabel siswa start */}
          <div className="p-5 bg-white">
            <div className="grid justify-center"></div>
            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 p-5">
              <table
                className="min-w-full divide-gray-200 text-center p-5 mb-10 md:w-full"
                id="example"
                data-aos="zoom-in"
              >
                <thead className="th-add">
                  <tr>
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
                  </tr>
                </thead>
                <tbody className="">
                  {siswa.map((val, idx) => {
                    return (
                      <tr key={idx}>
                        <td className="inset-y-0 left-0 bg-white px-4 py-2">
                          {idx + 1}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {val.namaMurid}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                            {val.agama}
                          </strong>
                        </td>{" "}
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* tabel siswa end */}
        </div>
      </div>
    </>
  );
}
