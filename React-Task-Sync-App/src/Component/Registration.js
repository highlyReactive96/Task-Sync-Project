import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  '../Staticfiles/Edit.css';
export default function Registration(){
const navigation=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    password: '',
    confirmPassword:'',
    companyId: '',
    userID:'',
    allowAddProject:false,
    allowAddTask:false,
    allowDeleteProject:false,
    allowMarkAscomplete:false,
    allowDeleteTask:false,
    allowChangePermission:false
  });
  
  const [formError, setFormError] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError('Invalid email format');
      return;
    }
    else
    {
      setFormError('');
    }

    // Validate password
    const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setFormError('Password must contain at least 6 characters with one special character');
      return;
    }
    else
    {
      setFormError('');
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    else
    {
      setFormError('');
    }

    // Check if companyId is in database
    const response = await fetch(`http://localhost:3001/checkcompanyid`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (!data) {
      setFormError('Invalid company ID');
      return;
    }
    else
    {
      setFormError('');
    }
  //  check if user exits
    const resemail = await fetch(`http://localhost:3001/checkemailexists`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const dataemail = await resemail.json();
    if (dataemail) {
      setFormError('email id is already used');
      return;
    }
    else
    {
      setFormError('');
    }


    const userIDvalue = Math.random().toString().slice(2, 12); // generate unique id
    setFormData({ ...formData, userID:userIDvalue }); // add id to form data

    const registerResponse = await fetch('http://localhost:3001/registeruser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const registerData = await registerResponse.json();
    console.log(registerData);

    navigation("/NavigatetoLogin");
  }

  return (

    <div className='page1' >
    <div>
     
      <Container>
      
        <Row className="vh-110 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-7 " style={{ width: "40rem" }}>
              <Card.Body>
              {formError && <p2 style={{ color: 'red' }}>{formError}</p2>}
                <div className="mb-4 mt-md-4">
                  {/* <img src={require('../Staticfiles/logo.jpg')} width="220" height="70"></img> */}
                  <h2 className="fw-bold mb-2 text-center text-uppercase " style={{color: 'pink'}}>Task-Sync</h2>
                   <br>
                   </br>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required="true" name="name"
                        value={formData.name}
                        onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="position">
                        <Form.Label className="text-center">
                          Position
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter your position in company" required="true" name="position"
                        value={formData.position}
                        onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="UniqueID">
                        <Form.Label className="text-center">
                          UniqueID
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter your company unique ID" required="true"name="companyId"
                        value={formData.companyId}
                        onChange={handleChange}/>
                        <p1 >(Unique ID is 10 digit unique number given to your Employer)</p1>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required="true" name="email"
                        value={formData.email}
                        onChange={handleChange}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  name="password"
                        value={formData.password}
                        onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="confirmPassword" 
                         value={formData.confirmPassword}
                         onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={handleSubmit} >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Sign In
                        </a>
                        <br></br>
                        {formError && <p2 style={{ color: 'red' }}>{formError}</p2>}

                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  )
}