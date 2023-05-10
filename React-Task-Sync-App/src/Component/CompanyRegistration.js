import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  '../Staticfiles/Edit.css';
export default function Registration() {
  const navigate=useNavigate();
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    companyId: '',
    organizationName: '',
    name: '',
    position: '',
    organizationEmail: '',
    email: '',
    password: '',
    confirmPassword:'',
    companyDescription: '',
    userId:''
   
  });
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    genereateID();


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
    

  
    const registerResponse = await fetch('http://localhost:3001/registercompany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(formData)
    });

    const registerData = await registerResponse.json();
    console.log(registerData);

    navigate("/NavigatetoLogin");
  }

const genereateID=()=>{
  const userIdvalue = Math.random().toString().slice(2, 12); 
    console.log(userIdvalue);
     const  companyIdvalue= Math.random().toString().slice(2, 12); 
    // generate unique id
    setFormData({
      ...formData,
      userId:userIdvalue,
      companyId:companyIdvalue ,
    });
    console.log(formData);
  
}
  
  
  return (
    <div className='page2' >
    <div>
     
      <Container>
      
        <Row className="vh-110 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
          <div className="border border-2 border-primary"></div>
            <Card className="shadow px-7 " style={{ width: "40rem" }}>
              <Card.Body>
     
                <div className="mb-4 mt-md-4">
                  {/* <img src={require('../Staticfiles/logo.jpg')} width="220" height="70"></img> */}
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">Task-Sync</h2>
                   
                  <div className="mb-3">
                  {formError && <p2 style={{ color: 'red' }}>{formError}</p2>}

                    <Form>
                    <Form.Group className="mb-3" controlId="organizationName">
                        <Form.Label className="text-center">
                          Organization Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Organization Name" required="true"
                         name="organizationName"
                         value={formData.organizationName}
                         onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter you Name" required="true"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="position">
                        <Form.Label className="text-center">
                          Position
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter your position in company" required="true"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        />
                      </Form.Group>
                     
                      <Form.Group className="mb-3" controlId="formOrganizationEmail">
                        <Form.Label className="text-center">
                         Organization Email address 
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email of your Organization" required 
                         name="organizationEmail"
                         value={formData.organizationEmail}
                         onChange={handleChange}/>
                      </Form.Group>
                        
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                         Your Email address 
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter you email address" required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                       <Form.Label> Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
              
                        />
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="confirm password" 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
              
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="companydescription">
                        <Form.Label className="text-center">
                         Organization Description
                        </Form.Label>
                        <Form.Control as="textarea" rows={"3"} placeholder="Describe your Organization" required maxLength={"70"}
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleChange}
                  
                        />
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
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
                      </p>
                      <br>
                      </br>
                      {formError && <p2 style={{ color: 'red' }}>{formError}</p2>}

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