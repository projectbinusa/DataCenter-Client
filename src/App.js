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
import PrivateReg from "./router/PrivateReg";
import PrivateHome from "./router/PrivateHome";
import Dashboard from "./pages/Dashboard";
import TableSekolahAdmin from "./pages/TableSekolahAdmin";
import TableSiswaAdmin from "./pages/TableSiswaAdmin";
import EditSiswaByAdmin from "./pages/EditSiswaByAdmin";
import EditSiswaAdmin from "./pages/EditSiswaAdmin";
// import PrivateBack from "./router/PrivateBack";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />

          <Route
            path="/"
            element={
              <PrivateHome>
                <Home />
              </PrivateHome>
            }
          />

          <Route
            path="/registrasi2"
            element={
              // <PrivateBack>
                <PrivateReg>
                  <Registrasi2 />
                </PrivateReg>
              // </PrivateBack>
            }
          />

          {/* super admin page start */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <PrivateSuperAdmin>
                  <Dashboard />
                </PrivateSuperAdmin>
              </PrivateRoute>
            }
          />

          <Route
            path="/sekolah/:id"
            element={
              <PrivateRoute>
                <SekolahById />
              </PrivateRoute>
            }
          />

          <Route
            path="/table-sekolah-admin"
            element={
              <PrivateRoute>
                <TableSekolahAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-siswa-sekolah/:id"
            element={
              <PrivateRoute>
                <EditSiswaByAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/table-siswa-admin"
            element={
              <PrivateRoute>
                <TableSiswaAdmin />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-siswa-admin/:id"
            element={
              <PrivateRoute>
                <EditSiswaAdmin />
              </PrivateRoute>
            }
          />
          {/* super admin page end */}

          <Route
            path="/table"
            element={
              <PrivateRoute>
                <PrivateHome>
                  <Table />
                </PrivateHome>
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-siswa/:id"
            element={
              <PrivateRoute>
                <EditSiswa />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
