import './App.css';
import { RecoilRoot, useRecoilState } from 'recoil';
import EmployeeSearch from './components/employee-search-component';
import EmployeeForm from './components/employee-form-component';
import EmployeeList from './components/employee-list-component';
import { Employee } from './models/employee';
import { useState } from 'react';
import NavBarComponent from './components/navbar-component';
import SideBarComponent from './components/sidebar-component';
import { Route, Routes } from 'react-router-dom';
import path from 'path';

function App() {
  const [selectedEmployee,setSelectedEmployee]=useState<Employee | null>(null);

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
     <RecoilRoot>
     {/* <!-- NAVBAR --> */}
     {/* <NavBarComponent /> */}
<div className="has-background-light">
  <div className="container">
    <div className="section">
      <div className="rows">
        <div className="row is-3">
        <EmployeeForm selectedEmployee={selectedEmployee}  onCancel={handleCancel}/>
        </div>
      </div>
      <div className="columns">
        <div className="column is-3">
          <div className="box">
          <EmployeeSearch />
          <SideBarComponent />
          </div>
        </div>
        <div className="column is-9">
        {/* <EmployeeSearch /> */}
        
        <EmployeeList onEdit={handleEdit}/>
        </div>
      </div>
    </div>
  </div>
</div>
    {/* <Routes>
      <Route path='/' element={<EmployeeForm selectedEmployee={selectedEmployee}  onCancel={handleCancel}/>} />
      <Route path='/list' element={ <EmployeeList onEdit={handleEdit}/>} />
      <Route path='/search' element={<EmployeeSearch />} />
    </Routes> */}
    </RecoilRoot>
     </>
  );
}

export default App;
