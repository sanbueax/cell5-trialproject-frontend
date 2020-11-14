import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import Router from 'next/router'
// import Head from 'next/head'
import View from '../components/View'
import AppHelper from '../apphelper'

export default function register() {
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

    /* useEffect(() => {
        effect
        return () => {
            cleanup
        }
    }, [input]) */

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
                        email: email,
                        password: password1
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data === true){
                        Router.push('/login')
                    }else{
                        Router.push('/error')
                    }
                })
            }else{
                Router.push('/error')
            }
        })
    } 

    return (
        <React.Fragment>
            <View title={ 'Register' }>
                <Row className="justify-content-center">
                    <Col xs md="6">
                        <Form onSubmit={(e) => registerUser(e)}>

                        <Form.Group controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password1} onChange={e => setPassword1(e.target.value)} required/>
                        </Form.Group>

                        <Form.Group controlId="password2">
                            <Form.Label>Verify Password</Form.Label>
                            <Form.Control type="password" placeholder="Verify Password" value={password2} onChange={e => setPassword2(e.target.value)} required/>
                        </Form.Group>

                        {isActive
                            ? <Button variant="primary" type="submit" id="submitBtn">Submit</Button>
                            : <Button variant="primary" type="submit" id="submitBtn" disabled>Submit</Button>
                        }

                        </Form>
                    </Col>
                </Row>
            </View>
        </React.Fragment>
    )
}