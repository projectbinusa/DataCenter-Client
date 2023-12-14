import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../style/dash.css";
import Chart from "react-apexcharts";
import axios from "axios";
import AOS from "aos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faSchool,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [siswa, setSiswa] = useState([]);
  const [sekolah, setSekolah] = useState([]);
  const [guru, setGuru] = useState([]);

  const allSiswaPertahun = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/siswa/");
      setSiswa(data);
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

  const allGuru = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/guru/");
      setGuru(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [grafik, setGrafik] = useState({
    x: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    y: [3, 3, 5, 1, 2, 5, 6],
  });

  useEffect(() => {
    allSiswaPertahun();
    allSekolah();
    allGuru();
  }, []);

  const guruIcon = (
    <FontAwesomeIcon
      icon={faChalkboardUser}
      className="w-28 h-24 text-center"
    />
  );

  const sekolahIcon = (
    <FontAwesomeIcon icon={faSchool} className="w-28 h-24 text-center" />
  );

  const muridIcon = (
    <FontAwesomeIcon icon={faUserGraduate} className="w-28 h-24 text-center" />
  );

  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex justify-center w-[100%] mt-20">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="pie rounded-2xl p-1 shadow-xl w-[21.8rem] md:w-80"
                data-aos="fade-left"
              >
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="m-5 text-center">
                    {muridIcon}
                    <h2 className="mt-4 text-xl font-bold text-left">
                      Jumlah Seluruh Siswa
                    </h2>

                    <p className="mt-1 text-lg text-gray-700 text-left">
                      {siswa.length} Siswa
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="pie rounded-2xl p-1 shadow-xl w-[21.8rem] md:w-80"
                data-aos="fade-left"
              >
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="m-5 text-center">
                    {sekolahIcon}
                    <h2 className="mt-4 text-xl font-bold text-left">
                      Jumlah Seluruh Sekolah
                    </h2>

                    <p className="mt-1 text-lg text-gray-700 text-left">
                      {sekolah.length} Sekolah
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="pie rounded-2xl p-1 shadow-xl w-[21.8rem] md:w-80"
                data-aos="fade-left"
              >
                <div className="rounded-xl items-center bg-white p-1">
                  <div className="m-5 text-center">
                    {guruIcon}
                    <h2 className="mt-4 text-xl font-bold text-left">
                      Jumlah Seluruh Guru
                    </h2>

                    <p className="mt-1 text-lg text-gray-700 text-left">
                      {guru.length} Guru
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <div
                  className="pie rounded-2xl p-1 shadow-xl"
                  data-aos="fade-right"
                >
                  <div className="rounded-xl items-center h-full md:h-[700px] bg-white p-1">
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
