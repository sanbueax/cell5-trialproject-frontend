import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Card, Container } from 'react-bootstrap';
import View from '../components/View'
import AppHelper from '../apphelper'
import { useRouter } from 'next/router'
import Router from 'next/router';
// import Link from 'next/link'
import UserContext from '../UserContext'
import Swal from 'sweetalert2';

export default function edit(){
    const { user } = useContext(UserContext);

    const router = useRouter();
    const recordId = router.query.recordId;

    const [islandGroup, setIslandGroup] = useState('');
    const [region, setRegion] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [description, setDescription] = useState('');

    // const [newIslandGroup, setNewIslandGroup] = useState('');
    // const [newRegion, setNewRegion] = useState('');
    // const [newProvinceName, setNewProvinceName] = useState('');
    // const [newDescription, setNewDescription] = useState('');
    
    const [regionData, setRegionData] = useState([]);
    const [editData, setEditData] = useState([]);

    console.log(recordId)

    useEffect(() => {
        fetch(`${ AppHelper.API_URL }/provinces/get-provinces`, {
    		method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(recordId)

            if(data.length > 0){
                setEditData(data.find(record => {
                    return record._id === recordId;
                }))
                // console.log(edit)
                console.log(recordId)
                // console.log(edit.islandGroup)
                // console.log(edit)
            }
        })
    }, [])

    useEffect(() => {
        setIslandGroup(editData.islandGroup);
        setRegion(editData.region);
        setProvinceName(editData.provinceName);
        setDescription(editData.description);
    }, [editData])

    useEffect(() => {
    	fetch(`${ AppHelper.API_URL }/region/get-region`, {
    		method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			let regionArr = [];

			if(data.length > 0){
				if(islandGroup === "Luzon"){
					regionArr = data.filter(region => {
						console.log(region)
						return region.islandGroup === "Luzon"
					})
					setRegionData(regionArr.map(region => {
						return <option key={region._id} value={region.regionName}>{region.regionName}</option>
					}))
                }else if(islandGroup === "Visayas"){
					regionArr = data.filter(region => {
						console.log(region)
						return region.islandGroup === "Visayas"
					})
					setRegionData(regionArr.map(region => {
						return <option key={region._id} value={region.regionName}>{region.regionName}</option>
					}))
				}else{
                    regionArr = data.filter(region => {
						console.log(region)
						return region.islandGroup === "Mindanao"
					})
					setRegionData(regionArr.map(region => {
						return <option key={region._id} value={region.regionName}>{region.regionName}</option>
					}))
                }
				console.log(regionArr.length === 0)

				if(regionArr.length === 0){
					Swal.fire('Oops...', 'Please Create Region Category!', 'warning')
					Router.push('/')
                }
                // else{
				// 	setRegion(regionArr[0].regionName)
				// }
            }else{
				Swal.fire('Oops...', 'Please Create Region!', 'warning')
			}
		})
    }, [islandGroup])

	function editRecord(e) {
		e.preventDefault()

        // console.log(islandGroup)
        // console.log(region)
        // console.log(provinceName)
        // console.log(description)

	  fetch(`${ AppHelper.API_URL }/provinces/edit-record`, {
	    method: 'PUT',
	    headers: { 
	    	'Content-Type': 'application/json',
	    	'Authorization': `Bearer ${localStorage.getItem('token')}` 
	  	},
	    body: JSON.stringify({ 
	    	recordId: recordId,
	    	newIslandGroup: islandGroup,
	    	newRegion: region,
	    	newProvinceName: provinceName,
            newDescription: description
	    })
	  })
	  .then(res => res.json())
	  .then(data => {
        if(data === true){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Transaction has been added!',
              showConfirmButton: false,
              timer: 1500
            })
            Router.push('/explore')
        }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
        }
	  })
	}    

    return(
        <React.Fragment>
            <View title={ 'Explore' }>
            <Row className="justify-content-center">
            <Container className="pt-4 mb-5 background">
                <Card>
                    <Card.Body>
                        <Form onSubmit={(e) => editRecord(e)}>
                            <Form.Group controlId="islandGroup">
                                <Form.Label>Island Group</Form.Label>
                                <Form.Control as="select" value={islandGroup} onChange={e => setIslandGroup(e.target.value)}>
                                    <option value="Luzon">Luzon</option>
                                    <option value="Visayas">Visayas</option>
                                    <option value="Mindanao">Mindanao</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="region">
                                <Form.Label>Region</Form.Label>
                                <Form.Control as="select" value={region} onChange={e => setRegion(e.target.value)} required>
                                    {regionData}
                                </Form.Control>
                                {/* <select value={region} onChange={e => setRegion(e.target.value)}>
                                    {regionData}
                                </select> */}
                            </Form.Group>
                            
                            <Form.Group controlId="provinceName">
                                <Form.Label>Province Name</Form.Label>
                                <Form.Control type="text" placeholder="Province Name" value={provinceName} onChange={e => setProvinceName(e.target.value)} required/>
                            </Form.Group>
                            
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} required/>
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            </Row>
            </View>
        </React.Fragment>
    )
}