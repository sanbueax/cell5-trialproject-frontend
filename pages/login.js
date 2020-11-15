import { useState, /*, useEffect,*/ useContext } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
// import { GoogleLogin } from 'react-google-login'
import Router from 'next/router'
import Swal from 'sweetalert2'
import UserContext from '../UserContext'
import AppHelper from '../apphelper'
import View from '../components/View'
import Link from 'next/link'

export default function index() {
    // const { user } = useContext(UserContext);
    // console.log(user)

    // useEffect(() => {
    //     if(user.email){
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Oops...',
    //           text: 'You are already logged in!',
    //           footer: '<a href="/welcome">Please proceed to your Home Page.</a>',
    //           showConfirmButton: false,
    //           allowOutsideClick: false
    //         })
    //     }else{
    //         Router.push('/')
    //     }
    // }, [user])   
    
    return (
        <View title={ 'Login' }>      
            <Row className="justify-content-center">
                <Login/>
            </Row>
        </View>
    ) 
}

const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tokenId, setTokenId] = useState(null)
    // const [isActive, setIsActive] = useState(false)
    
    // console.log(user === null)
    // console.log(user)

    const authenticate = (e) => {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'  },
            body: JSON.stringify({ email: email, password: password })
        }
        
        fetch(`${ AppHelper.API_URL }/users/login`, options).then(AppHelper.toJSON).then(data => {
            if (typeof data.accessToken !== 'undefined') {
                localStorage.setItem('token', data.accessToken)
                retrieveUserDetails(data.accessToken)
            } else {
                if (data.error === 'does-not-exist') {
                    Swal.fire('Authentication Failed', 'User does not exist.', 'error')
                } else if (data.error === 'incorrect-password') {
                    Swal.fire('Authentication Failed', 'Password is incorrect.', 'error')
                }
            }
        })
    }
    
    const retrieveUserDetails = (accessToken) => {
        const options = {
            headers: { Authorization: `Bearer ${ accessToken }` } 
        }

        fetch(`${ AppHelper.API_URL }/users/details`, options).then(AppHelper.toJSON).then(data => {
            console.log(data)
            setUser({ email: data.email })
            // fetch(`${ AppHelper.API_URL }/users/get-records`, options)
            // .then(AppHelper.toJSON)
            // .then(data => {
            //     // console.log(data)
            //     if(data.length === 0){
            //         Swal.fire('Oops...', 'Please Create Transactions!', 'warning')
            //         Router.push('/categories')
            //     }else{
            //         Router.push('/welcome')
            //         Swal.fire({
            //           icon: 'success',
            //           title: 'Congratulations!',
            //           text: 'You are now logged in!',
            //           // footer: '<a href="/welcome">Please proceed to your Home Page.</a>',
            //           showConfirmButton: true,
            //           allowOutsideClick: false
            //         })
            //     }
            // })

            Router.push('/')
        })
    }

    // const authenticateGoogleToken = (response) => {
    // console.log(response)

    //     setTokenId(response.tokenId)

    //     const payload = {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ tokenId: response.tokenId })
    //     }

    //     fetch(`${ AppHelper.API_URL }/users/verify-google-id-token`, payload).then(AppHelper.toJSON).then(data => {
    //         if (typeof data.accessToken !== 'undefined') {
    //             localStorage.setItem('token', data.accessToken)
    //             retrieveUserDetails(data.accessToken)
    //         } else {
    //             if (data.error === 'google-auth-error') {
    //                 Swal.fire('Google Auth Error', 'Google authentication procedure failed, try again or contact web admin.', 'error')
    //             } else if (data.error === 'incorrect-password') {
    //                 Swal.fire('Authentication Failed', 'Password is incorrect.', 'error')
    //             }
    //         }
    //     })
    // }

    return (
        <Card>
            <Card.Header className="text-center">Login</Card.Header>
            <Card.Body>
                <Form onSubmit={ authenticate }>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } autoComplete="off" required/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } required/>
                    </Form.Group>
                    <Button className="mb-2" variant="primary" type="submit" block>Login</Button>
                    <Card.Footer className="text-muted">Don't have an account? <Link href="/register">Sign Up</Link></Card.Footer>
                    <hr/>
                    {/*<GoogleLogin
                        clientId="628236732996-f23vfnvoplq78jo4bjbmcjf22n3lde30.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={ authenticateGoogleToken }
                        onFailure={ authenticateGoogleToken }
                        cookiePolicy={ 'single_host_origin' }
                        className="w-100 text-center d-flex justify-content-center mt-2"
                    />*/}
                </Form>
            </Card.Body>
        </Card>
    )
}