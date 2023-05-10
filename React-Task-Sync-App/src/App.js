import logo from './logo.svg';
import './App.css';
import HomePage from './Component/home';
import First from './Component/First.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route } from 'react-router-dom';
import Registration from './Component/Registration';
import RegisterPage from './Component/RegisterPage';
import CompanyRegistration from './Component/CompanyRegistration';
import ProjectWorkspace from './Component/ProjectWorkspace';
import TaskForm from './Component/TaskForm';
import TaskWorkSpace from './Component/TaskWorkSpace';
import Permission from './Component/Permission';
import NavigatetoLogin from './Component/NavigatetoLogin';
import { Component } from 'react';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path="Login" element={<First/>}></Route>
        <Route path="Register" element={<RegisterPage/>}> </Route>
        <Route path="CompanyRegistration" element={<CompanyRegistration/>}></Route>
        <Route path="UserRegistration" element={<Registration/>}></Route>
        <Route path="ProjectWorkspace" element={<ProjectWorkspace/>}></Route>
        <Route path="TaskForm" element={<TaskForm/>}></Route>
        
        <Route path="NavigatetoLogin" element={<NavigatetoLogin/>}></Route>

        <Route path="TaskWorkSpace/:val" element={<TaskWorkSpace/>}></Route>

      </Routes>
    </div>

  );
}

export default App;
