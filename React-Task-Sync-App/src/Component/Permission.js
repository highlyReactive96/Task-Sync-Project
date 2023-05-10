import React from 'react'
import { Button, Col, Form, Modal, Row ,FormCheck} from 'react-bootstrap';
import { useState,useEffect } from 'react';
import Select from 'react-select';
function Permission() {
    const [showForm, setShowForm] = useState(true);
    const[employeedata,setdata]=useState([]);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState("");
    const[permission,setPermission]=useState({
      allowAddProject:false,
      allowAddTask:false,
      allowDeleteProject:false,
      allowMarkAscomplete:false,
      allowDeleteTask:false,
      allowChangePermission:false
  })
    
    const handleEmployeeChange = (option) => {
    
        setSelectedEmployees(option.value);
       const selectedEmployee=employeedata.filter((emp)=>emp.email==selectedEmployees)
        if (selectedEmployee) {
          setPermission({
            allowAddProject: selectedEmployee.allowAddProject,
            allowAddTask: selectedEmployee.allowAddTask,
            allowDeleteProject: selectedEmployee.allowDeleteProject,
            allowMarkAscomplete: selectedEmployee.allowMarkAscomplete,
            allowDeleteTask: selectedEmployee.allowDeleteTask,
            allowChangePermission: selectedEmployee.allowChangePermission,
          });
        }
      };
    

    useEffect(() => {
        const fetchEmployees = async () => {
          const response = await fetch('http://localhost:3001/employeesoption');
          const data = await response.json();
          const options = data.map((employee) => ({
            value: employee.email,
            label: employee.name
          }));
          setEmployeeOptions(options);
          setdata(data);
        };
        fetchEmployees();
      }, []);
   const SavePermission=async()=>{
    
    await fetch('http://localhost:3001/changepermissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...permission,email:selectedEmployees})
      }
      
      );
   }
  return ( 
    <Modal show={showForm} onHide={() => setShowForm(false)} >
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Permission And Acess</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
              <Form.Label row sm={3}>
                Select the employee you want to change permission:
              </Form.Label>
              <Col sm={9}>
                <Select  value={employeeOptions.find(option => option.value === selectedEmployees)} onChange={handleEmployeeChange} options={employeeOptions} isSearchable isMulti={false} />
              </Col>
                 {/* allowAddProject:false,
        allowAddTask:false,
        allowDeleteProject:false,
        allowMarkAscomplete:false,
        allowDeleteTask:false */}

            <FormCheck
            inline
            checked={permission.allowAddProject}
            id="allowAddProject"
             type="checkbox"
             label="Allow user to add Project "
             onChange={() => {setPermission({...permission,allowAddProject:!permission.allowAddProject})}}
/>
                 <FormCheck
                type="checkbox"
                checked={permission.allowAddTask}
            id="allowAddTask"
            label="Allow user to add task"

                onChange={() => {setPermission({...permission,allowAddTask:!permission.allowAddTask})}}
              />

<FormCheck
                type="checkbox"
                checked={permission.allowDeleteProject}
                id="allowDeleteProject"
                label="Allow user to delete project"

                onChange={() => {setPermission({...permission,allowDeleteProject:!permission.allowDeleteProject})}}
              />

           <FormCheck
                  type="checkbox"
                  checked={permission.allowMarkAscomplete}
                  id="allowMarkAscomplete"
                  label="Allow user to mark project as Completed"
                onChange={() => {setPermission({...permission,allowMarkAscomplete:!permission.allowMarkAscomplete})}}
              /> 

<FormCheck
                type="checkbox"
                checked={permission.allowDeleteTask}
                id="allowDeleteTask"
                label="Allow user to delete task"
                onChange={() => {setPermission({...permission,allowDeleteTask:!permission.allowDeleteTask})}}
              />
           <FormCheck
                type="checkbox"
                checked={permission.allowChangePermission}
                id="allowDeleteTask"
                label="Allow user to change permission"
                onChange={() => {setPermission({...permission,allowChangePermission:!permission.allowChangePermission})}}
              />   

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={SavePermission}>Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </Modal>
  )
}

export default Permission