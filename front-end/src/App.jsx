import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/authenticationContext'
import ProtectedRoute from './components/protectRoute'
import Login from './pages/login'
import ManagerPage from './pages/Manager/manager'
import AdminPage from './pages/Admin/admin'
import EmployeePage from './pages/employeePage/employee'
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
import Hiring from "./pages/Manager/hiring/hiring";
import AddEmployee from './pages/Manager/hiring/addEmployee'
import RecomendCandidate from './pages/Manager/hiring/recomendCandidate'

import './App.css'


function App() {
  return (
    <AuthProvider>
      <Routes>


        <Route path="/" element={<Login />} />

        <Route path="/Manager/:id/" element={
          <ProtectedRoute role={'Manager'}>
            <ManagerPage />
          </ProtectedRoute>
        }>
          {/* <Route path="/Manager/:id/employees" element={
            
              <Employees />

          } /> */}
          <Route path="/Manager/:id/employees" element={
            <ProtectedRoute role={'Manager'}>
              <Employees />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/dashboard" element={
            <ProtectedRoute role={'Manager'}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/hiring" element={
            <ProtectedRoute role={'Manager'}>
              <Hiring />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/hiring/addEmployee" element={
            <ProtectedRoute role={'Manager'}>
              <AddEmployee />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/hiring/recomendCandidate" element={
            <ProtectedRoute role={'Manager'}>
              <RecomendCandidate />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/employees/:employeeId" element={
            <ProtectedRoute role={'Manager'}>
              <EmployeeInfo />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/requests" element={
            <ProtectedRoute role={'Manager'}>
              <Requests />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/requests/:requestId" element={
            <ProtectedRoute role={'Manager'}>
              <RequestInfo />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/payment" element={
            <ProtectedRoute role={'Manager'}>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/payment/:paymentId" element={
            <ProtectedRoute role={'Manager'}>
              <PaymentInfo />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/addAdvance" element={
            <ProtectedRoute role={'Manager'}>
              <AddAdvances />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/recordAdvance" element={
            <ProtectedRoute role={'Manager'}>
              <RecordAdvance />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/addExtra" element={
            <ProtectedRoute role={'Manager'}>
              <AddExtra />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/recordExtra" element={
            <ProtectedRoute role={'Manager'}>
              <RecordExtra />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/addVacations" element={
            <ProtectedRoute role={'Manager'}>
              <AddVacations />
            </ProtectedRoute>
          } />
          <Route path="/Manager/:id/recordVacations" element={
            <ProtectedRoute role={'Manager'}>
              <RecordVacations />
            </ProtectedRoute>
          } />

        </Route>
        <Route path="/Admin/:id/:page" element={<AdminPage />} />

        <Route path="/User/:id" element={
          <ProtectedRoute role={'User'}>
            <EmployeePage />
          </ProtectedRoute>

        } >
          {/* <Route path="/User/:id/mainPage" element={
          <ProtectedRoute role={'User'}>
            <MainPage />
          </ProtectedRoute>} /> */}


          <Route path="/User/:id/addRequest" element={
            <ProtectedRoute role={'User'}>
              <AddRequest />
            </ProtectedRoute>} />
          <Route path="/User/:id/recordRequest" element={<ProtectedRoute role={'User'}>
            <RecordRequest />
          </ProtectedRoute>} />
        </Route>
        <Route path="/Error" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
