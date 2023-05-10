import React from 'react'
import { Button,Card } from 'react-bootstrap';
import  '../Staticfiles/Edit.css';
function RegisterPage() {
  return (
    <div className='page' >
    <div className="col d-flex justify-content-center" style={{margin :'50px'}}>
    <Card style={{ width: '20rem' }} className='color-card'>
      <Card.Body>
        <Card.Title>Who Are You?</Card.Title>
        <Card.Text>
          Make Your selection
        </Card.Text>
       <Button href="#" variant="outline-dark" className='btn-lg btn-block'>Client</Button>
       <br></br>
      
      <Button href="CompanyRegistration" variant="outline-dark" className='btn-lg btn-block'>Company</Button>
      <br></br>
    
      <Button href="UserRegistration" variant="outline-dark" className='btn-lg btn-block'>Employee</Button>
      <br>
      </br>
      <p className="mb-0  text-center">
                      Already have an account??{" "}
                        <a href="/" className="text-primary fw-bold">
                          Sign In
                        </a>
                      </p>
      </Card.Body>
    </Card>
    </div>
    </div>
  );
  
}

export default RegisterPage;