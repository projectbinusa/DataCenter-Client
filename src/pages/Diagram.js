import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function Diagram() {
  const [siswa, setSiswa] = useState([]);
  const [state, setState] = useState({
    options: {
      labels: ['Perempuan', 'Laki-laki'],
      colors: ['lightpink', 'lightblue']
    },
    series: [0, 0],
  });
  const [agama, setAgama] = useState({
    options: {
        labels: ['Islam', 'Kristen', 'Katholik', 'Hindu', 'Buddha', 'Konghuchu', 'none'],
    },
    series: [0, 0, 0, 0, 0, 0, 0],
  })

  const data = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/siswa");
      setSiswa(response.data);
      const totalPerempuan = response.data.filter(x => x.gender === "Perempuan").length
      setState({...state, series: [totalPerempuan, response.data.length - totalPerempuan]})
    } catch (error) {
      console.log(error);
    }
  };

  const dta = async () => {
    try {
        const respon = await axios.get("http://localhost:8080/api/siswa");
        setSiswa(respon.data);
        const islam = respon.data.filter(r => r.agama === "Islam").length
        const kristen = respon.data.filter(r => r.agama === "Kristen").length
        const katholik = respon.data.filter(r => r.agama === "Katholik").length
        const hindu = respon.data.filter(r => r.agama === "Hindu").length
        const buddha = respon.data.filter(r => r.agama === "Buddha").length
        const konghuchu = respon.data.filter(r => r.agama === "Konghuchu").length
        const none = respon.data.filter(r => r.agama === "none").length
        setAgama({...agama, series: [islam, kristen, katholik, hindu, buddha, konghuchu, none]})
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    data();
    dta();
  }, []);

  return (
    <div className="diagram">
        <div className="pie">
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width="380"
      />
      {siswa.map((wa) => (
        <div key={wa.id}></div>
      ))}
      </div>
      <div className="pie">
        <Chart
        options={agama.options}
        series={agama.series}
        type="pie"
        width="380" />
        {siswa.map((rel) => (
            <div key={rel.id}></div>
        ))}
      </div>
    </div>
  );
}
