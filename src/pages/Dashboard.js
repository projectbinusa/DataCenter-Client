import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../style/dash.css";
import Chart from "react-apexcharts";
import axios from "axios";
import school from "../assets/school-icon.png";
import student from "../assets/student-icon.png";
import AOS from "aos";

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

  AOS.init({ duration: 1750, once: true });

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
      const { data } = await axios.get("http://localhost:8080/api/siswa/");
      setSiswa(data);
      const totalPerempuan = data.filter(
        (x) => x.gender === "Perempuan"
      ).length;
      setState({
        ...state,
        series: [totalPerempuan, data.length - totalPerempuan],
      });
      const islam = data.filter((r) => r.agama === "Islam").length;
      const kristen = data.filter((r) => r.agama === "Kristen").length;
      const katholik = data.filter((r) => r.agama === "Katholik").length;
      const hindu = data.filter((r) => r.agama === "Hindu").length;
      const buddha = data.filter((r) => r.agama === "Buddha").length;
      const khonghucu = data.filter((r) => r.agama === "Khonghucu").length;
      const non = data.filter((r) => r.agama === "Non").length;
      setReligi({
        ...religi,
        series: [islam, kristen, katholik, hindu, buddha, khonghucu, non],
      });
      const now = new Date();
      const values = [];
      const years = [];
      for (let i = now.getFullYear() - 7; i <= now.getFullYear(); i++) {
        values.push(data.filter((x) => x.tahunDaftar === i).length);
        years.push(i);
      }
      setGrafik({ x: years, y: values });
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

  const [grafik, setGrafik] = useState({
    x: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    y: [3, 3, 5, 1, 2, 5, 6],
  });

  useEffect(() => {
    allSiswa();
    allSekolah();
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="z-10">
        <Sidebar />
        </div>
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="col-span-2">
                <div
                  className="pie rounded-2xl p-1 shadow-xl"
                  data-aos="fade-right"
                >
                  <div className="rounded-xl items-center h-full md:h-[580px] bg-white p-1">
                    <div className="pie rounded-xl p-1">
                      <p className="text-white text-2xl">
                        Grafik Jumlah Siswa Pertahun
                      </p>
                    </div>
                    <div className="m-3 h-auto">
                      <Chart
                        options={{
                          chart: {
                            id: "bar",
                          },
                          xaxis: {
                            categories: grafik.x,
                          },
                        }}
                        series={[
                          {
                            name: "jumlah siswa",
                            data: grafik.y,
                          },
                        ]}
                        type="bar"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5">
                <div
                  className="pie rounded-2xl p-1 shadow-xl w-[21.8rem] md:w-80"
                  data-aos="fade-left"
                >
                  <div className="rounded-xl items-center bg-white p-1">
                    <div className="m-5">
                      <img
                        src={student}
                        alt="student-icon"
                        className="w-28 h-24"
                      />
                      <h2 className="mt-4 text-xl font-bold">
                        Jumlah Seluruh Siswa
                      </h2>

                      <p className="mt-1 text-lg text-gray-700">
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
                <div
                  className="pie rounded-2xl p-1 shadow-xl w-[21.8rem] md:w-80"
                  data-aos="fade-left"
                >
                  <div className="rounded-xl items-center bg-white p-1">
                    <div className="m-5">
                      <img
                        src={school}
                        alt="student-icon"
                        className="w-28 h-24"
                      />
                      <h2 className="mt-4 text-xl font-bold">
                        Jumlah Seluruh Sekolah
                      </h2>

                      <p className="mt-1 text-lg text-gray-700">
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
            </div>
            <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
              <div
                className="pie rounded-2xl p-1 shadow-xl"
                data-aos="fade-right"
              >
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="pie rounded-xl px-2 md:p-1">
                    <p className="text-white text-2xl">
                      Data Gender Seluruh Siswa
                    </p>
                  </div>
                  <div className="m-5 overflow-hidden overflow-x-auto">
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
              <div
                className="pie rounded-2xl p-1 shadow-xl"
                data-aos="fade-left"
              >
                <div className="rounded-xl bg-white p-1">
                  <div className="pie rounded-xl px-2 md:p-1">
                    <p className="text-white text-2xl">
                      Data Agama Seluruh Siswa
                    </p>
                  </div>
                  <div className="m-5 overflow-hidden overflow-x-auto">
                    {siswa.length === 0 ? (
                      <div>belum ada data</div>
                    ) : (
                      <Chart
                        options={religi.options}
                        series={religi.series}
                        type="pie"
                        width="380"
                        className="text-left"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
