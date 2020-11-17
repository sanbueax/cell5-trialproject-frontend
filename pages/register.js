import React, {useState, useEffect} from 'react'
import { Form, Button, Container, Card, Row } from 'react-bootstrap'
// import UserContext from '../UserContext'
import NavBar from '../components/LoginNav'
import AppHelper from '../apphelper'
import Swal from 'sweetalert2'
import Router from 'next/router'
// import Head from 'next/head'
import Link from 'next/link'
import View from '../components/View'
import Logedin from '../styles/Login.module.css'

export default function register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if((password1 !== '' && password2 !== '') && (password2 === password1)){
            setIsActive(true)
        }else{
            setIsActive(false)
        }
    }, [password1, password2])

    function registerUser(e) {
        e.preventDefault();

        fetch(`${AppHelper.API_URL}/users/email-exists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data === false){
                fetch(`${AppHelper.API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        lastName: lastName,
                        firstName: firstName,
                        email: email,
                        password: password1
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data === true){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Registration successful!',
                            showConfirmButton: false,
                            timer: 1500
                        })                        
                        Router.push('/')
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!'
                        })
                    }
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email Address already in use!'
                })
            }
        })
    } 

    return (
        <React.Fragment>
            <body className={Logedin.bgimages}> 
            <NavBar/>
            <View title={ 'Register' }>
                <Row className="justify-content-center">
                    <Card>
		            	<Card.Header className="text-center">Register</Card.Header>
		            	<Card.Body>
                            <Form onSubmit={(e) => registerUser(e)}>
								<Form.Group controlId="firstName">
					                <Form.Label>First Name</Form.Label>
					                <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
					            </Form.Group>

								<Form.Group controlId="lastName">
					                <Form.Label>Last Name</Form.Label>
					                <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
					            </Form.Group>	            

					            <Form.Group controlId="userEmail">
					                <Form.Label>Email address</Form.Label>
					                <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/>
					            </Form.Group>

					            <Form.Group controlId="password1">
					                <Form.Label>Password</Form.Label>
					                <Form.Control type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)} required/>
					            </Form.Group>

					            <Form.Group controlId="password2">
					                <Form.Label>Verify Password</Form.Label>
					                <Form.Control type="password" placeholder="Verify Password" value={password2} onChange={e => setPassword2(e.target.value)} required/>
					            </Form.Group>
					            {isActive ?
					                <Button className="w-100 text-center d-flex justify-content-center mt-3" variant="primary" type="submit" id="submitBtn">Submit</Button>
					                :
					                <Button className="w-100 text-center d-flex justify-content-center mt-3" variant="primary" type="submit" id="submitBtn" disabled>Submit</Button>
					            }
					        </Form>
                        </Card.Body>
					</Card>
                </Row>
            </View>
            </body>
        </React.Fragment>
    )
}