import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import '../Staticfiles/Edit.css'
import { useState,useEffect } from 'react';
import { Gear } from 'react-bootstrap-icons';


import ProjectForm from './ProjectForm'
import Permission from './Permission';
function SideBarNav({ value }) {
  const [fstate,fsetstate]=useState(false);
  const [sstate,ssetstate]=useState(false);
   const[user,setuser]=useState();

  //  useEffect(() => {
  //   const timeoutId = setTimeout(async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/getuser', {
  //         credentials: 'include',
  //         method: 'GET'
  //       });
  //       const data = await response.json();
  //       setuser(data);
  //     } catch (error) {
  //       console.log('Error fetching user:', error);
  //     }
  //   }, 1000);
  
  //   return () => clearTimeout(timeoutId);
  // }, []);

    return (
    <div>
      <div style={{zIndex:"2400"}}>
      {fstate && <ProjectForm ></ProjectForm> }
      {sstate && <Permission></Permission> }

      </div>
<div style={{display:"flex",alignItems:"center",flexDirection:'row', minWidth:"300px",marginLeft:"400px"}}>
    <Navbar bg='light' expand='lg'>
        <Nav >
        <Nav.Link href="/">
          <FaHome /> Home
        </Nav.Link>
        <br></br>
        <Nav.Link href="/profile">
          <FaUser />Company Profile
        </Nav.Link>
        <br></br>
        <Nav.Link href="/profile">
          <FaUser />User Profile
        </Nav.Link>
        <NavDropdown title="Project" id="settings-dropdown">
            <NavDropdown.Item href="./?status=backlog">
              Backlog
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="./?status=active">
              Current Projects
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="./?status=completed">
              completed projects
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="./?status=myprofile">
              MY Projects
            </NavDropdown.Item>
          </NavDropdown>
          <NavItem>

     { value.allowChangePermission &&
  <Gear label="change permission" size={32} onClick={()=>{ssetstate(!sstate)}}> </Gear > }
          </NavItem>
          
        <NavItem>
   {value.allowAddProject && <button className="btn btn-info" onClick={()=>{fsetstate(!fstate)}}>add project</button> }
      </NavItem>
      </Nav>
      </Navbar>
      </div>
      </div>
    );
  }
  
  export default SideBarNav;