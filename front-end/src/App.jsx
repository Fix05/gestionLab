import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import ManagerPage from './pages/Manager/manager'
import AdminPage from './pages/admin'
import EmployeePage from './pages/employeePage/employee'
import MainPage from './pages/employeePage/mainPage'
import AddRequest from './pages/employeePage/addRequest'
import RecordRequest from './pages/employeePage/recordRequests'
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
import PaymentInfo from './pages/Manager/payment/paymentInfo'
import AddVacations from './pages/Manager/vacations/addVacations'
import RecordVacations from './pages/Manager/vacations/recordVacations'
import Dashboard from './pages/Manager/dashboard/dashboard'
import Search from './pages/text'

import './App.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Manager/:id/" element={<ManagerPage />}>
        <Route path="/Manager/:id/employees" element={<Employees />} />
        <Route path="/Manager/:id/dashboard" element={<Dashboard />} />
        <Route path="/Manager/:id/employees/:employeeId" element={<EmployeeInfo />} />
        <Route path="/Manager/:id/requests" element={<Requests />} />
        <Route path="/Manager/:id/requests/:requestId" element={<RequestInfo />} />
        <Route path="/Manager/:id/payment" element={<Payment />} />
        <Route path="/Manager/:id/payment/:paymentId" element={<PaymentInfo />} />
        <Route path="/Manager/:id/addAdvance" element={<AddAdvances />} />
        <Route path="/Manager/:id/recordAdvance" element={<RecordAdvance />} />
        <Route path="/Manager/:id/addExtra" element={<AddExtra />} />
        <Route path="/Manager/:id/recordExtra" element={<RecordExtra />} />
        <Route path="/Manager/:id/addVacations" element={<AddVacations />} />
        <Route path="/Manager/:id/recordVacations" element={<RecordVacations />} />
      </Route>
      <Route path="/Admin/:id/:page" element={<AdminPage />} />

      
      <Route path="/User/:id" element={<EmployeePage />} >
        <Route path="/User/:id/mainPage" element={<MainPage />}/>
        <Route path="/User/:id/addRequest" element={<AddRequest />}/>
        <Route path="/User/:id/recordRequest" element={<RecordRequest />}/>
      </Route>




      <Route path="/Error" element={<ErrorPage />} />
      <Route path="/test" element={<Search />} />

    </Routes>
  )
}

export default App
