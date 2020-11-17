import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import NavBar from '../components/NavBar'
// import View from '../components/View'

import { UserProvider } from '../UserContext';
import AppHelper from '../apphelper';
// import '../styles/style.css'
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

	const [user, setUser] = useState({
		email: null,
		isAdmin: null
	})

	useEffect(() => {
		const accessToken  = localStorage.getItem('token')

		const options = {
            headers: { Authorization: `Bearer ${ accessToken }` } 
        }

        fetch(`${AppHelper.API_URL}/users/details`, options).then(AppHelper.toJSON).then(data => {
            setUser({ email: data.email, isAdmin: data.isAdmin })
        })
        
	}, [user.email])

	const unsetUser = () => {
		localStorage.clear();

		setUser({
			email: null,
			isAdmin: null
		})
	}

  return(
  	<UserProvider value={{user, setUser, unsetUser}}>
  		{/* <NavBar/> */}
	  	<Component {...pageProps} />
  	</UserProvider>
  )
}

export default MyApp
