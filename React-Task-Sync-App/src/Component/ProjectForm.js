import React, { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Select from 'react-select';
import { useEffect } from 'react';
function ProjectForm() {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [projectName, setProjectName] = useState('');
//   const [deadline, setDeadline] = useState(new Date());
const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
   
  //   const deadline = new Date(`${date}T${time}`);
  //   await fetch('http://localhost:3001/RegisterProject', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({projectName,deadline,selectedEmployees})
  //   });
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const deadline = new Date(`${date}T${time}`);
    const ProjectId = Math.random().toString().slice(2, 12); // generate unique id

    try {
      await fetch('http://localhost:3001/RegisterProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({projectName, deadline, selectedEmployees,descriptiondata,ProjectId,completestatus:false})
      });
      console.log("hello");
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [descriptiondata, setDescription] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('http://localhost:3001/employeesoption');
      const data = await response.json();
      const options = data.map((employee) => ({
        value: employee.userID,
        label: employee.name
      }));
      setEmployeeOptions(options);
    };
    fetchEmployees();
  }, []);


  // useEffect(() => {
  //   const val=value.companyId;
  //   const fetchEmployees = async () => {
  //     const response = await fetch('http://localhost:3001/employeesoption',{
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({val})
      
  //     });
  //     const data = await response.json();
  //     const options = data.map((employee) => ({
  //       value: employee.userID,
  //       label: employee.name
  //     }));
  //     setEmployeeOptions(options);
  //   };
  //   fetchEmployees();
  // }, []);



  const handleEmployeeChange = (employeeOptions) => {
    const selectedEmployeeIds = employeeOptions.map((option) => option.value);
    setSelectedEmployees(selectedEmployeeIds);
  };

  return (
    <div style={{zIndex:"-1"}}>
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Project Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control type="text" placeholder="Enter project name" value={projectName} onChange={(event) => setProjectName(event.target.value)} required />
              </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Project Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control as="textarea" placeholder="Enter project description" value={descriptiondata} onChange={(event) => setDescription(event.target.value)} required={"true"} maxLength={100} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Deadline:
              </Form.Label >
                {/* <DatePicker selected={deadline} onChange={setDeadline} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="MMMM d, yyyy h:mm aa" /> */}
    <label htmlFor="date">Date:</label>
      <input type="date" id="date" value={date} onChange={handleDateChange} />
      <label htmlFor="time">Time:</label>
      <input type="time" id="time" value={time} onChange={handleTimeChange} />
            </Form.Group>
            <br></br>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Employees:
              </Form.Label>
              <Col sm={9}>
                <Select value={employeeOptions.filter((option) => selectedEmployees.includes(option.value))} onChange={handleEmployeeChange} options={employeeOptions} isMulti isSearchable />
              </Col>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Close</Button>
          {/* <Button variant="primary" type="submit"  >Create Project</Button> */}
          <Button variant="primary" type="submit" onClick={handleSubmit} >Create Project</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectForm;