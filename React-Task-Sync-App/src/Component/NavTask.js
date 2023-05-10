import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { Form, Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import '../Staticfiles/Edit.css'
import { useState ,useEffect} from 'react';
import TaskForm from './TaskForm'
function NavTask({user}) {
  const [fstate,fsetstate]=useState(false);
  // const[user,setuser]=useState();

  // useEffect(()=>{
  //   const fetchuser = async () => {
  //     const response = await fetch(`http://localhost:3001/getuser`);
  //     const data = await response.json();
  //     setuser(data);
  //     };
  //     fetchuser()
  // },[]);
    return (
    <div>
      {fstate && <TaskForm></TaskForm> }
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
            <NavDropdown.Item href="/ProjectWorkspace/?status=backlog">
              Backlog
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/ProjectWorkspace/?status=active">
              Current Projects
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/ProjectWorkspace/?status=completed">
              completed projects
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/ProjectWorkspace/?status=myprofile">
              My Project
            </NavDropdown.Item>
          </NavDropdown>
        <Nav.Link href="/settings">
          <FaCog /> Settings
        </Nav.Link>
        <NavItem>
     {user.allowDeleteTask &&<button className="btn btn-info" onClick={()=>{fsetstate(!fstate)}}>Add New Task</button>}
      </NavItem>
      </Nav>
      </Navbar>
      </div>
      </div>
    );
  }
  
  export default NavTask;