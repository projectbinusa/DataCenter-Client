import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Registrasi from "./pages/Registrasi";
import Home from "./pages/Home";
import Table from "./pages/TableSiswa";
import EditSiswa from "./pages/EditSiswa";
import SekolahById from "./pages/SekolahById";
import Registrasi2 from "./pages/Registrasi2";
import PrivateRoute from "./router/PrivateRoute";
import PrivateSuperAdmin from "./router/PrivateSuperAdmin";
import PrivateReg from "./router/PrivateReg"
import Dashboard from "./pages/Dashboard";
import TableSekolahAdmin from "./pages/TableSekolahAdmin";
import TableSiswaAdmin from "./pages/TableSiswaAdmin";
import EditSiswaByAdmin from "./pages/EditSiswaByAdmin";
import EditSiswaAdmin from "./pages/EditSiswaAdmin"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/registrasi2" element={
            <PrivateReg>
              <Registrasi2/>
            </PrivateReg>
          } />
          {/* super admin page start */}
          <Route
            path="/dashboard"
            element={
              <PrivateSuperAdmin>
                <Dashboard/>
              </PrivateSuperAdmin>
            }
          />
          <Route path="/table-sekolah-admin" element={<TableSekolahAdmin/>} />
          <Route path="/table-siswa-admin" element={<TableSiswaAdmin/>} />
          {/* super admin page end */}

          <Route
            path="/table"
            element={
              <PrivateRoute>
                <Table />
              </PrivateRoute>
            }
          />
          <Route path="/edit-siswa/:id" element={<EditSiswa />} />
          <Route path="/sekolah/:id" element={<SekolahById />} />
          <Route path="/edit-siswa-sekolah/:id" element={<EditSiswaByAdmin />} />
          <Route path="/edit-siswa-admin/:id" element={<EditSiswaAdmin />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
