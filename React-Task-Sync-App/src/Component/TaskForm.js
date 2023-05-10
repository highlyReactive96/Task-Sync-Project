import React, { useState } from 'react';
import { Form, Button, Card,Modal,Row } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import { Idprovider } from './TaskWorkSpace';
const TaskForm = () => {
  const idv=useContext(Idprovider);
 console.log(idv);
  const [taskName, setTaskName] = useState('');
  const [checkboxes, setCheckboxes] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
 const[showform ,setshow]=useState(true)
 const [date, setDate] = useState("");
 const [time, setTime] = useState("");

  // Helper function to add a new checkbox to the form
  const addCheckbox = () => {
    setCheckboxes(prevState => [...prevState, { description: taskName, checked: false }]);
    setTaskName('');
  };

  // Helper function to handle checkbox changes
  const handleCheckboxChange = (index) => {
    setCheckboxes(prevState => {
      const newCheckboxes = [...prevState];
      newCheckboxes[index] = { ...newCheckboxes[index], checked: !newCheckboxes[index].checked };
      return newCheckboxes;
    });
  };

  // Helper function to delete a checkbox from the form
  const deleteCheckbox = (index) => {
    setCheckboxes(prevState => {
      const newCheckboxes = [...prevState];
      newCheckboxes.splice(index, 1);
      return newCheckboxes;
    });
  };

  // Helper function to edit a checkbox in the form
  const editCheckbox = (index, newDescription) => {
    setCheckboxes(prevState => {
      const newCheckboxes = [...prevState];
      newCheckboxes[index] = { ...newCheckboxes[index], description: newDescription };
      return newCheckboxes;
    });
  };

  const saveTask=async(event) =>{
    event.preventDefault();
    const deadline = new Date(`${date}T${time}`);
      console.log('idv')
    try {
      await fetch('http://localhost:3001/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({checkboxes,taskName,taskTitle,deadline,ProjectID:`${idv}`})
      }
      
      );
      setshow(false)

    } catch (error) {
    }
  }
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  return (
    

    <Modal show={showform}  style={{maxWidth:"450px",marginLeft:"400px"}}>
      <Modal.Header>Create a new task card</Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="formTaskTitle">
            <Form.Label>Task Title</Form.Label>
            <Form.Control type="text" placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
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
          <Form.Group controlId="formTaskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" placeholder="Enter task name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </Form.Group>
    
          {checkboxes.map((checkbox, index) => (
            <div key={index} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label={checkbox.description}
                checked={checkbox.checked}
                onChange={() => handleCheckboxChange(index)}
              />
              <FaEdit
                className="ml-2"
                onClick={() => {
                  const newDescription = prompt('Enter new description:', checkbox.description);
                  if (newDescription !== null) {
                    editCheckbox(index, newDescription);
                  }
                }}
              />
              <FaTrashAlt
                className="ml-2"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this checkbox?')) {
                    deleteCheckbox(index);
                  }
                }}
              />
            </div>
          ))}
          <br></br>
          <Button variant="primary" onClick={addCheckbox}>Add Checkbox</Button>
          {"  "}
          <Button variant="primary" type="submit" onClick={saveTask}>Save Task Card</Button>
        </Form>
      </Modal.Body>
    </Modal>
     );
};

export default TaskForm;
