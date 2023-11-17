import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import AOS from "aos";
import PageSidebar from "../../components/PageSidebar";

export default function Dashboard() {
 
  return (
    <div>
      <PageSidebar />
      <div className="flex my-20">
        <div className="flex justify-center w-[100%]">
          <main className="s-content w-[390px] md:w-[1125px] px-5 md:px-10 py-5">
            <h2>
              ini dashboard
            </h2>
          </main>
        </div>
      </div>
    </div>
  );
}
