import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import ManagerPage from './pages/Manager/manager'
import AdminPage from './pages/admin'
import EmployeePage from './pages/employee'
import Requests from './pages/Manager/requests'
import Employees from './pages/Manager/employees'
import EmployeeInfo from './pages/Manager/employees/employeeInfo'
import RequestInfo from './pages/Manager/requests/requestsInfo'
import Payment from './pages/Manager/payment/payment'
import ErrorPage from './pages/errorPage'
import AddAdvances from './pages/Manager/advances/addAdvances'
import RecordAdvance from './pages/Manager/advances/recordAdvance'
import AddExtra from './pages/Manager/extras/addExtra'
import RecordExtra from "./pages/Manager/extras/recordExtra"

import './App.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Manager/:id/" element={<ManagerPage />}>
        <Route path="/Manager/:id/employees" element={<Employees />} />
        <Route path="/Manager/:id/employees/:employeeId" element={<EmployeeInfo />} />
        <Route path="/Manager/:id/requests" element={<Requests />} />
        <Route path="/Manager/:id/requests/:requestId" element={<RequestInfo />} />
        <Route path="/Manager/:id/payment" element={<Payment />} />
        <Route path="/Manager/:id/addAdvance" element={<AddAdvances />} />
        <Route path="/Manager/:id/recordAdvance" element={<RecordAdvance />} />
        <Route path="/Manager/:id/addExtra" element={<AddExtra />} />
        <Route path="/Manager/:id/recordExtra" element={<RecordExtra />} />
      </Route>
      <Route path="/Admin/:id/:page" element={<AdminPage />} />
      <Route path="/User/:id" element={<EmployeePage />} />
      <Route path="/Error" element={<ErrorPage />} />
      
    </Routes>
  )
}

export default App
