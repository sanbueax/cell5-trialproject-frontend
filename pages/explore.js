import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Tabs, Tab, Row, Col, FormControl, Container } from 'react-bootstrap'
import AppHelper from '../apphelper'
import Swal from 'sweetalert2'
import View from '../components/View'

export default function Explore(){
    const [islandGroup, setIslandGroup] = useState('Luzon');
    const [islandGroups, setIslandGroups] = useState('Luzon');
    const [island, setIsland] = useState('All');
    const [region, setRegion] = useState('');
    const [regions, setRegions] = useState('');
    // const [philRegions, setPhilRegions] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [description, setDescription] = useState('');

    const [pronvinces, setProvinces] = useState([]);
    const [regionData, setRegionData] = useState([]);
    // const [regionsData, setRegionsData] = useState([]);
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState('')
    const [list, setList] = useState([])

    // useEffect(() => {
    // 	fetch(`${ AppHelper.API_URL }/region/get-region`, {
    // 		method: 'GET',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		}
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		let regionsArr = [];

	// 		if(data.length > 0){
    //             if(island === "All"){
    //                 regionsArr = data.filter(region => {
    //                     return region.islandGroup === region.islandGroup
    //                 })
    //                 setRegionsData(regionsArr.map(region => {
	// 					return <option key={region._id} value={region.regionName}>{region.regionName}</option>
	// 				}))
    //             }else if(island === "Luzon"){
	// 				regionsArr = data.filter(region => {
	// 					// console.log(region)
	// 					return region.islandGroup === "Luzon"
	// 				})
	// 				setRegionsData(regionsArr.map(region => {
	// 					return <option key={region._id} value={region.regionName}>{region.regionName}</option>
	// 				}))
    //             }else if(island === "Visayas"){
	// 				regionsArr = data.filter(region => {
	// 					// console.log(region)
	// 					return region.islandGroup === "Visayas"
	// 				})
	// 				setRegionsData(regionsArr.map(region => {
	// 					return <option key={region._id} value={region.regionName}>{region.regionName}</option>
	// 				}))
	// 			}else{
    //                 regionsArr = data.filter(region => {
	// 					console.log(region)
	// 					return region.islandGroup === "Mindanao"
	// 				})
	// 				setRegionsData(regionsArr.map(region => {
	// 					return <option key={region._id} value={region.regionName}>{region.regionName}</option>
	// 				}))
    //             }
	// 			console.log(regionsArr.length === 0)

	// 			if(regionsArr.length === 0){
	// 				Swal.fire('Oops...', 'Please Create Region Category!', 'warning')
	// 				Router.push('/')
    //             }
    //             // else{
	// 			// 	setPhilRegions(regionsArr[0].regionName)
	// 			// }
    //         }else{
	// 			Swal.fire('Oops...', 'Please Create Region!', 'warning')
	// 		}
	// 	})
    // }, [island])

    useEffect(() => {
    	fetch(`${ AppHelper.API_URL }/provinces/get-provinces`, {
    		method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.length > 0){
                data.reverse()
                console.log(data)
				setProvinces(data)
			}else{
				Swal.fire('Oops...', 'Please Create Transactions!', 'warning')
			}
		})
    }, [])

    useEffect(() => {
        console.log(search)
    	if(search !== ""){
            let term = new RegExp(search.toLowerCase())

            console.log(term)
    		setSearchData(pronvinces.filter(record => {
                console.log(record)
                console.log(term.test(record.provinceName.toLowerCase()))
    			return (term.test(record.islandGroup.toLowerCase())
    				|| term.test(record.description.toLowerCase())
    				|| term.test(record.provinceName.toLowerCase())
    				|| term.test(record.region.toLowerCase()))
    		}))
    	}else{
    		setSearchData(pronvinces)
    	}
    }, [search, pronvinces])

    useEffect(() => {
        console.log(searchData)
        let searchDataArray = [];
        if(searchData.length > 0){
            if(island === "All"){
                searchDataArray = searchData.filter(record => {
                    return record.islandGroup === record.islandGroup 
                })
                if(searchDataArray.length > 0){
                    setList(searchDataArray.map(record => {
                        return(
                            <React.Fragment key={record._id}>
                                <Card.Header>
                                    <div>{record.provinceName}</div> 
                                    <div>{record.region} ({record.islandGroup})</div>
                                    </Card.Header>
                                <Card.Body>
                                    <p>{record.description}</p>
                                </Card.Body>
                            </React.Fragment> 
                        )
                    }))
                }else{
                    setList(() => {
                        return(
                            <React.Fragment>
                                <Card.Header></Card.Header>
                                <Card.Body>
                                    <p>No Record</p>
                                </Card.Body>
                            </React.Fragment>
                        )
                    })
                }
            }else if(island === "Luzon"){
                searchDataArray = searchData.filter(record => {
                    return record.islandGroup === "Luzon"
                })
                if(searchDataArray.length > 0){
                    setList(searchDataArray.map(record => {
                        return(
                            <React.Fragment key={record._id}>
                                <Card.Header>
                                    <div>{record.provinceName}</div> 
                                    <div>{record.region} ({record.islandGroup})</div>
                                    </Card.Header>
                                <Card.Body>
                                    <p>{record.description}</p>
                                </Card.Body>
                            </React.Fragment> 
                        )
                    }))
                }else{
                    setList(() => {
                        return(
                            <React.Fragment>
                                <Card.Header></Card.Header>
                                <Card.Body>
                                    <p>No Record</p>
                                </Card.Body>
                            </React.Fragment>
                        )
                    })
                }
            }else if(island === "Visayas"){
                searchDataArray = searchData.filter(record => {
                    return record.islandGroup === "Visayas"
                })
                if(searchDataArray.length > 0){
                    setList(searchDataArray.map(record => {
                        return(
                            <React.Fragment key={record._id}>
                                <Card.Header>
                                    <div>{record.provinceName}</div> 
                                    <div>{record.region} ({record.islandGroup})</div>
                                    </Card.Header>
                                <Card.Body>
                                    <p>{record.description}</p>
                                </Card.Body>
                            </React.Fragment> 
                        )
                    }))
                }else{
                    setList(() => {
                        return(
                            <React.Fragment>
                                <Card.Header></Card.Header>
                                <Card.Body>
                                    <p>No Record</p>
                                </Card.Body>
                            </React.Fragment>
                        )
                    })
                }
            }else{
                searchDataArray = searchData.filter(record => {
                    return record.islandGroup === "Mindanao"
                })
                if(searchDataArray.length > 0){
                    setList(searchDataArray.map(record => {
                        return(
                            <React.Fragment key={record._id}>
                                <Card.Header>
                                    <div>{record.provinceName}</div> 
                                    <div>{record.region} ({record.islandGroup})</div>
                                    </Card.Header>
                                <Card.Body>
                                    <p>{record.description}</p>
                                </Card.Body>
                            </React.Fragment> 
                        )
                    }))
                }else{
                    setList(() => {
                        return(
                            <React.Fragment>
                                <Card.Header></Card.Header>
                                <Card.Body>
                                    <p>No Record</p>
                                </Card.Body>
                            </React.Fragment>
                        )
                    })
                }
            }
        }else{
    		setList(() => {
    			return(
					<React.Fragment>
						<Card.Header></Card.Header>
						<Card.Body>
						    <p>No Record</p>
						</Card.Body>
					</React.Fragment>
				)
    		})
    	}
    }, [island, searchData])

    function addRegion(e){
        e.preventDefault();
        
        console.log(islandGroups);
        console.log(regions);

    	fetch(`${ AppHelper.API_URL }/region/add-region`, {
    		method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                islandGroup: islandGroups,
                regionName: regions
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true){
				Swal.fire({
				  position: 'center',
				  icon: 'success',
				  title: 'A new Region was successfully added!',
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

        setRegions('')
    }

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
				}else{
					setRegion(regionArr[0].regionName)
				}
            }else{
				Swal.fire('Oops...', 'Please Create Region!', 'warning')
			}
		})
    }, [islandGroup])

    function addProvinces(e){
        e.preventDefault();
        
        console.log(islandGroup);
        console.log(region);
        console.log(provinceName);
        console.log(description);

    	fetch(`${ AppHelper.API_URL }/provinces/add-record`, {
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
				  title: 'A new Province was successfully added!',
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

        setProvinceName('')
        setDescription('')
    }   

    return(
        <React.Fragment>
            <View title={ 'Explore' }>
            <Row className="justify-content-center">
            <Container className="pt-4 mb-5 background">
                <Card>
                    <Card.Body>
                        <Tabs defaultActiveKey="provinces" id="listProvince" className="mb-3">
                            <Tab eventKey="provinces" title="Provinces of the Philippines">
                                <Form>
                                    <Row>
                                        <Col className="col-7">
                                        <Form.Group controlId="island">
                                            <Form.Control as="select" onChange={e => setIsland(e.target.value)}>
                                                <option value="All">All</option>
                                                <option value="Luzon">Luzon</option>
                                                <option value="Visayas">Visayas</option>
                                                <option value="Mindanao">Mindanao</option>
                                            </Form.Control>
                                        </Form.Group>
                                        </Col>

                                        {/*<Col className="col-4">
                                        <Form.Group controlId="philRegions">
                                            <Form.Control as="select" onChange={e => setPhilRegions(e.target.value)} required>
                                                {regionsData}
                                            </Form.Control>
                                        </Form.Group>
                                        </Col>*/}

                                        <Col className="col-5">
                                        <Form.Group>
                                            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={search} onChange={e => setSearch(e.target.value)}/>
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                                <Card>
                                    {list}
                                </Card>
                            </Tab>
                            <Tab eventKey="region" title="Add Regions">
                                <Form onSubmit={(e) => addRegion(e)}>
                                    <Form.Group controlId="islandGroup">
                                        <Form.Label>Island Group</Form.Label>
                                        <Form.Control as="select" onChange={e => setIslandGroups(e.target.value)}>
                                            <option value="Luzon">Luzon</option>
                                            <option value="Visayas">Visayas</option>
                                            <option value="Mindanao">Mindanao</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="region">
                                        <Form.Label>Region</Form.Label>
                                        <Form.Control type="text" placeholder="Region" value={regions} onChange={e => setRegions(e.target.value)} required/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="addprovinces" title="Add Provinces">
                                <Form onSubmit={(e) => addProvinces(e)}>
                                    <Form.Group controlId="islandGroup">
                                        <Form.Label>Island Group</Form.Label>
                                        <Form.Control as="select" onChange={e => setIslandGroup(e.target.value)}>
                                            <option value="Luzon">Luzon</option>
                                            <option value="Visayas">Visayas</option>
                                            <option value="Mindanao">Mindanao</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {/*<Form.Group controlId="islandGroup">
                                        <Form.Label>Island Group</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Island Group" value={islandGroup} onChange={e => setIslandGroup(e.target.value)} required/>
                                    </Form.Group>*/}

                                    <Form.Group controlId="region">
                                        <Form.Label>Region</Form.Label>
                                        <Form.Control as="select" onChange={e => setRegion(e.target.value)} required>
                                            {regionData}
                                        </Form.Control>
                                    </Form.Group>
                                    {/*<Form.Group controlId="region">
                                        <Form.Label>Region</Form.Label>
                                        <Form.Control type="text" placeholder="Region" value={region} onChange={e => setRegion(e.target.value)} required/>
                                    </Form.Group>*/}
                                    <Form.Group controlId="provinceName">
                                        <Form.Label>Province Name</Form.Label>
                                        <Form.Control type="text" placeholder="Province Name" value={provinceName} onChange={e => setProvinceName(e.target.value)} required/>
                                    </Form.Group>
                                    {/*<Form.Group controlId="description">
                                        <Form.Label>Discription</Form.Label>
                                        <Form.Control type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required/>
                                    </Form.Group>*/}
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} required/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Container>
            </Row>
            </View>
        </React.Fragment>
    )
}