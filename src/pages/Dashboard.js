import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../style/dash.css";
import Chart from "react-apexcharts";
import axios from "axios";
import school from "../assets/school-icon.png";
import student from "../assets/student-icon.png";

export default function Dashboard() {
  const [siswa, setSiswa] = useState([]);
  const [sekolah, setSekolah] = useState([]);
  const [state, setState] = useState({
    options: {
      labels: ["Perempuan", "Laki-laki"],
      colors: ["lightpink", "lightblue"],
    },
    series: [0, 0],
  });

  const [religi, setReligi] = useState({
    options: {
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

  const allSiswa = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/siswa/");
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

  const allSekolah = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/sekolah/");
      setSekolah(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allAgama = async () => {
    try {
      const respon = await axios.get("http://localhost:8080/api/siswa/");
      setSiswa(respon.data);
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

  const [grafik, setGrafik] = useState({
    options: {
      chart: {
        id: "bar",
      },
      xaxis: {
        categories: [2016, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "jumlah siswa",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  useEffect(() => {
    allSiswa();
    allSekolah();
    allAgama();
  }, []);

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <main className="s-layout__content">
          <div className="p-8">
            <div className="grid grid-cols-1 p-5">
              <div className="col-span-2">
                <div className="pie rounded-2xl p-1 shadow-xl">
                  <div className="rounded-xl items-center bg-white p-1">
                    <div className="pie rounded-xl p-1">
                      <p className="text-white text-2xl">
                        Grafik Jumlah Siswa Pertahun
                      </p>
                    </div>
                    <div className="m-3">
                      <Chart
                        options={grafik.options}
                        series={grafik.series}
                        type="bar"
                        width="850"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-5 p-5">
              <div className="pie rounded-2xl p-1 shadow-xl">
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="m-5">
                    <img
                      src={student}
                      alt="student-icon"
                      className="w-28 h-24"
                    />
                    <h2 class="mt-4 text-xl font-bold">Jumlah Seluruh Siswa</h2>

                    <p class="mt-1 text-lg text-gray-700">
                      {siswa.length} Siswa
                    </p>
                    <a href="/table-siswa-admin">
                      <div className="mt-4 p-2 inline-block border-blue-500 font-medium text-blue-600 hover:border rounded-lg rounded-blue-500">
                        Lihat Lebih Detail
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="pie rounded-2xl p-1 shadow-xl">
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="m-5">
                    <img
                      src={school}
                      alt="student-icon"
                      className="w-28 h-24"
                    />
                    <h2 class="mt-4 text-xl font-bold">
                      Jumlah Seluruh Sekolah
                    </h2>

                    <p class="mt-1 text-lg text-gray-700">
                      {sekolah.length} Sekolah
                    </p>
                    <a href="/table-sekolah-admin">
                      <div className="mt-4 p-2 inline-block border-blue-500 font-medium text-blue-600 hover:border rounded-lg rounded-blue-500">
                        Lihat Lebih Detail
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
              <div className="pie rounded-2xl p-1 shadow-xl w-[450px]">
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="pie rounded-xl p-1">
                    <p className="text-white text-2xl">
                      Data Gender Seluruh Siswa
                    </p>
                  </div>
                  <div className="m-5">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={state.options}
                        series={state.series}
                        type="pie"
                        width="380"
                        className="text-left"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="pie rounded-2xl p-1 shadow-xl w-[450px]">
                <div className="rounded-xl bg-white p-1">
                  <div className="pie rounded-xl p-1">
                    <p className="text-white text-2xl">
                      Data Agama Seluruh Siswa
                    </p>
                  </div>
                  <div className="m-5">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={religi.options}
                        series={religi.series}
                        type="pie"
                        width="380"
                        className="text-center"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
