import ProjectNavbar from './ProjectNavbar'
import SideBarNav from './SideBarNav'
import {Card,Form,Button} from 'react-bootstrap'
import React, { useState,Fragment,useEffect } from 'react'
import { FaWindows } from 'react-icons/fa';
import NavTask from './NavTask';
import {useParams} from 'react-router-dom'
import { createContext } from 'react';
export const Idprovider=createContext();
function TaskWorkspace() {
    const [checkboxes, setCheckboxes] = useState([]);
  const  [Taskdata,setTaskdata]=useState([]);
  const[render,setrender]=useState(false);
  const[user,setuser]=useState();


  const {val}=useParams();

  useEffect(()=>{
  
    const fetchuser = async () => {
      const response = await fetch("http://localhost:3001/getuser",{
        credentials: 'include',
        method:"get"
      });
      const data = await response.json();
      console.log("data is task:",data);
      setuser(data); 
      };
      fetchuser()
  },[]);

    useEffect(()=>{
        const fetchProject = async () => {
          const response = await fetch(`http://localhost:3001/fetchTask/${val}`);
          const data = await response.json();
          setTaskdata(data);
          };
          fetchProject()
      },[]);


      useEffect(()=>{
        const fetchProject = async () => {
          const response = await fetch(`http://localhost:3001/fetchTask/${val}`);
          const data = await response.json();
          setTaskdata(data);
          };
          fetchProject()
      },[render]);
      const deletetask =(id)=>async ()=>{
        console.log("hello")
        await fetch('http://localhost:3001/deletetask', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({_id:id})
        } )
        setrender(!render);
        }
      

        //
        const handleCheckboxChange = (index,id,checkedval) =>async (event)=> {
            console.log("hello")
            console.log(index,id,checkedval)
            event.preventDefault();
    try {
      await fetch('http://localhost:3001/updatecheckbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id:id,checkedval,index})
      });
      setrender(!render);
    } 
    catch (error) {
    }
          };



  return (
 <Fragment>

    <ProjectNavbar></ProjectNavbar>
    <br></br>
    <Idprovider.Provider value={`${val}`}>
  {user && <NavTask user={user}></NavTask> }
    </Idprovider.Provider>
 <div className='my-container'style={{ gap:"20px",alignItems:'center',alignContent:'center'}} >
 {Taskdata.map( (item,index)=>(
 
     <div className='card' style={{minWidth:"300px",maxWidth:"500px"}} key={index} >
      <Card.Header>Task Title :{item.taskTitle}</Card.Header>
      <Card.Header>Task Deadline :{new Date(item.deadline).toLocaleTimeString()}</Card.Header>

 <Card.Body>
        <Form>
          <Form.Group controlId="formTaskName">
          </Form.Group>
          {item.checkboxes.map((data, index) => (
            <div key={index} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label={data.description}
                checked={data.checked}
                onChange={ handleCheckboxChange(index,item._id,!data.checked)}

              />
              </div>))}
         </Form>
  {user.allowDeleteTask &&  <Button onClick={deletetask(item._id)}>deleteTask</Button>}

    </Card.Body>
                        
  </div>
    ) )}
   </div>        

    </Fragment> 
    
  )
          }   

export default TaskWorkspace