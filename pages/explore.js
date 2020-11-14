import React, { useState } from 'react';
import { Card, Button, Form, Tabs, Tab, ListGroup, Container } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function Explore(){
    const [islandGroup, setIslandGroup] = useState('');
    const [region, setRegion] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [description, setDescription] = useState('');

    function addProvinces(e){
        e.preventDefault();
        
        console.log(islandGroup);
        console.log(region);
        console.log(provinceName);
        console.log(description);

    	fetch(`http://localhost:4000/api/provinces/add-record`, {
    		method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                islandGroup: islandGroup,
                region: region,
                provinceName: provinceName,
                description: description
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true){
				Swal.fire({
				  position: 'center',
				  icon: 'success',
				  title: 'A new Category was successfully added!',
				  showConfirmButton: false,
				  timer: 1500
				})
            }else{
                Swal.fire({
				  icon: 'error',
				  title: 'Oops...',
				  text: 'Something went wrong!'
				})
            }
		})

        setIslandGroup('')
        setRegion('')
        setProvinceName('')
        setDescription('')
    }   

    return(
        <React.Fragment>
            <Container className="mt-2 pt-4 mb-5 background">
                <Card>
                    <Card.Body>
                        <Tabs defaultActiveKey="provinces" id="listProvince" className="mb-3">
                            <Tab eventKey="provinces" title="Provinces of the Philippines">
                                <ListGroup></ListGroup>
                            </Tab>
                            <Tab eventKey="addprovinces" title="Add Provinces">
                                <Form onSubmit={(e) => addProvinces(e)}>
                                    <Form.Group controlId="islandGroup">
                                        <Form.Label>Island Group</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Island Group" value={islandGroup} onChange={e => setIslandGroup(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group controlId="region">
                                        <Form.Label>Region</Form.Label>
                                        <Form.Control type="text" placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group controlId="provinceName">
                                        <Form.Label>Province Name</Form.Label>
                                        <Form.Control type="text" placeholder="Province Name" value={provinceName} onChange={e => setProvinceName(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Discription</Form.Label>
                                        <Form.Control type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Container>
        </React.Fragment>
    )
}