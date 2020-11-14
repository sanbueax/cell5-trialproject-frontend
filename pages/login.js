import React, { useState, useContext } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import UserContext from '../UserContext'
import Router from 'next/router'
// import Head from 'next/head'
import View from '../components/View'
import AppHelper from '../apphelper'

export default function login() {
    const { setUser } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function authenticate(e) {
        e.preventDefault()

        fetch(`${AppHelper.API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.accessToken){
                localStorage.setItem('token', data.accessToken);
                
                fetch(`${AppHelper.API_URL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`
                    } 
                })
                .then(res => res.json())
                .then(data => {
                    setUser({
                        id: data._id
                    })
                    Router.push('/travel')
                })
            }else{
                Router.push('/error')
            }
        })
    }

    return (
        <React.Fragment>
            <View title={ 'Login' }>
                <Row className="justify-content-center">
                    <Col xs md="6">
                        <Form onSubmit={(e) => authenticate(e)}>
                            <Form.Group controlId="userEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </View>
        </React.Fragment>
    )
}