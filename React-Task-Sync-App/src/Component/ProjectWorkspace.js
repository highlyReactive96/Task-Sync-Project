import React, { Fragment, useEffect, useState,useRef } from 'react'
import ProjectNavbar from './ProjectNavbar'
import SideBarNav from './SideBarNav'
import {Link,useLocation} from 'react-router-dom'

import '../Staticfiles/Edit.css'
import Button from 'react-bootstrap/Button'
function ProjectWorkspace() {
  const hasFetchedUser = useRef(false);

const[projectdata,setprojectdata]=useState([])
const[deletecard,setdeletedata]=useState(false)
const[getstatus,setstatusdata]=useState("")
const[user,setuser]=useState();

const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const status = searchParams.get('status');
console.log(status);


useEffect(()=>{
  if (!hasFetchedUser.current) {

  const fetchuser = async () => {
    const response = await fetch("http://localhost:3001/getuser",{
      credentials: 'include',
      method:"get"
    });
    const data = await response.json();
    console.log("data is:",data);
    setuser(data); 
    hasFetchedUser.current = true;
    };
    fetchuser()
}},[]);

useEffect(() => {
  const fetchProject = async () => {
    if (status == null) {
      status = null;
    }
    setstatusdata(status);

    setTimeout(async () => {
      const response = await fetch(`http://localhost:3001/dataproject/${status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      setprojectdata(data);
    }, 1000); // 1000 ms delay
  };

  fetchProject();
}, []);


// useEffect(() => {
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

useEffect(()=>{
  const fetchProject = async () => {
    if(status==null){
      status=null;
    }
    setstatusdata(status);
    const response = await fetch(`http://localhost:3001/dataproject/${status}`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
    );
    const data = await response.json();
    setprojectdata(data);
    };
    fetchProject()
},[deletecard]);

//





const deletedata =(id)=>async ()=>{
  setdeletedata(!deletecard);

  await fetch('http://localhost:3001/deletedata', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({_id:id})
  })

 
}

const markascomplete=(ProjectId)=>async()=>{
  console.log(ProjectId);
  await fetch('http://localhost:3001/markascomplete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ProjectId})
  });
}
  return (
    
    <Fragment>
 <ProjectNavbar></ProjectNavbar> 
<br></br>
{user && <SideBarNav value={user}></SideBarNav>}
{deletecard && <p>Deleted successfully</p>}
<div className='my-container' >

{projectdata.map((item)=>(
<div className="card text-black customcard  mb-3 " key={item._id}style={{maxWidth:"350px",display:"inline-block", margin:"20px"}} >
  <div className="card-data"> </div>
  <div className="card-body ">
    <h5 className="card-title">Project Name:{item.projectName}</h5>
     <p className="card-text">Project Id:{item._id}</p> 
     <p className="card-text">Project description:{item.descriptiondata}</p>  
    <p className="card-text">Deadline :{new Date(item.deadline).toLocaleDateString()}{}{' '}
                {new Date(item.deadline).toLocaleTimeString()}</p>
 {user.allowDeleteProject  &&  <button className="outline-dark" size="sm" onClick={deletedata(item._id)}>   Delete  </button> }
 {user.allowMarkAscomplete && <button className="outline-dark" size="sm" onClick={markascomplete(item.ProjectId)}> Complete Task  </button>}

  { status=="myprofile" && <Link to={`/TaskWorkSpace/${item.ProjectId}`}>Get to task workspace</Link>}
  </div>  
</div>

))}
</div>
</Fragment>


  )
}

export default ProjectWorkspace;