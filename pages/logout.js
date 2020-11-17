import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import Router from 'next/router';

export default function logout(){
	const {unsetUser, setUser} = useContext(UserContext)

	useEffect(() => {
		unsetUser();
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Logout successful!',
			showConfirmButton: false,
			timer: 1500
		  })
		Router.push('/')
	}, [])

	return null
}