import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [guru, setGuru] = useState([]);
  const [siswa, setSiswa] = useState([]);

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

  const getAllMurid = async () => {
    await axios
      .get(
        "http://localhost:8080/api/sekolah/" +
          localStorage.getItem("sekolahId") +
          "/siswa"
      )
      .then((res) => {
        setSiswa(res.data);
      });
  };

  useEffect(() => {
    getAll();
    getAllMurid();
  }, []);

  const totalGuruIcon = (
    <FontAwesomeIcon
      icon={faUserFriends}
      className="text-4xl text-black-600 mr-4"
    />
  );

  const muridIcon = (
    <FontAwesomeIcon icon={faUsers} className="text-4xl text-black-600 mr-4" />
  );

  return (
    <div>
      <PageSidebar />
      <div className="flex my-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-1 flex">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {totalGuruIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-black">Total Guru</p>
                    <p className="text-xl font-bold text-black">
                      {guru.length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-1 flex">
                <div className="rounded-xl p-4 h-[120px] flex items-center">
                  <div className="flex items-start">
                    <div className="self-start">
                      {" "}
                      {/* Tambahkan class self-start untuk ikon */}
                      {muridIcon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg text-black">Total Murid</p>
                    <p className="text-xl font-bold text-black">
                      {siswa.length}
                    </p>
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
