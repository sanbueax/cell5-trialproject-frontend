// import toNum from '../../../toNum'
// import DoughnutChart from '../../../components/DoughnutChart'
// import Banner from '../../../components/Banner'
import React from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';
import View from '../components/View'
import NavBar from '../components/Nav'
import AppHelper from '../apphelper'
import Map from '../components/Map'
import Landing from '../styles/Landing.module.css'

export default function province({ province }){
  console.log(province)
	return(
		<React.Fragment>
      <body className={Landing.bgimages}>
      <NavBar/>
        <View title={ 'Explore' }>
        <Row className="justify-content-center">
        <Container className="pt-4 mb-5 background">
            <Card>
                <Card.Body>
                    {/* <Banner country={country.country_name} cases={country.cases} deaths={country.deaths} criticals={country.serious_critical} recoveries={country.total_recovered}/> */}
                    <Row>
                      <Col xs={12} md={6}>
                        <h1 className="name">{province.provinceName}</h1>
                        <p className="desc">{province.description}</p>
                      </Col>
                      <Col xs={12} md={6}>
                        <Map province={province.provinceName}/>
                      </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
        </Row>
        </View>
        <footer className="footer py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-white text-center">
                                Copyright © <span>San Buenaventura</span> 2020 | Contact Us <span>09391016007</span> 
                            </p>
                        </div>
                        <div className="col-12">
                            <div className="footer-links">
                                <a href="#">
                                    <i className="fab fa-facebook-square" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i className="fab fa-twitter-square" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i className="fab fa-instagram" aria-hidden="true"></i>
                                </a>
                                <a href="#">
                                    <i className="fab fa-gitlab" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            </body>
		</React.Fragment>
	)
}

export async function getStaticPaths(){
  const res = await fetch(`${ AppHelper.API_URL }/provinces/get-provinces`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
  })

  const data = await res.json()

  console.log(data)

  const paths = data.map(province => ({
  	params: { id: province.provinceName.replace(/\s/g,"_") }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({params}){
  const res = await fetch(`${ AppHelper.API_URL }/provinces/get-provinces`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
  })

  const data = await res.json()

  console.log(data)

  const province = data.find(province => province.provinceName.replace(/\s/g,"_") === params.id)

  return {
    props: {
      province
    }
  }
}