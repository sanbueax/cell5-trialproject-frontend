// import toNum from '../../../toNum'
// import DoughnutChart from '../../../components/DoughnutChart'
// import Banner from '../../../components/Banner'
import React from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';
import View from '../components/View'
import AppHelper from '../apphelper'
import Map from '../components/Map'

export default function province({ province }){
  console.log(province)
	return(
		<React.Fragment>
        <View title={ 'Explore' }>
        <Row className="justify-content-center">
        <Container className="pt-4 mb-5 background">
            <Card>
                <Card.Body>
                    {/* <Banner country={country.country_name} cases={country.cases} deaths={country.deaths} criticals={country.serious_critical} recoveries={country.total_recovered}/> */}
                    <Row>
                      <Col xs={12} md={6}>
                        <h1>{province.provinceName}</h1>
                        <p>{province.description}</p>
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