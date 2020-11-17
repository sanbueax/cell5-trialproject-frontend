import React from 'react';
import { Row } from 'react-bootstrap'
import Head from 'next/head'
import NavBar from '../components/NavBar'

export default function index(){
    return(
      <React.Fragment>
        <Head>
        <title key="title-tag">iTravel</title>
        <script src="https://kit.fontawesome.com/a65a62c6bd.js" crossorigin="anonymous"></script>
        </Head>
        <NavBar/>
        <header>
            <div className="parallax-window" data-parallax="scroll">
                <img className="img-fluid homebg" src="./background.png"/>
            </div>
            <div className="content p-sm-5">
                <h1>
                    YOUR JOURNEY STARTS HERE.
                </h1>
                <h2>
                    A TRAVEL WEBSITE FOR WANDERLUST TRAVELERS.
                </h2>
                <a href="/explore" className="btn-get-started">Travel Guides</a>
            </div>
        </header>
        <section className="section-1 my-5">
          <div className="container">
              <div className="row p-5">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 line-highlight">
                      <h1 className="sec1-h1 text-right-sm quotes">
                          “The gladdest moment in human life is a departure into unknown lands.”
                      </h1>
                      <p>
                        – <span>Sir Richard Burton</span> 
                      </p>
                  </div>
              </div>
          </div>
        </section>
        <section className="section-2 clear p-5">
          <Row className="mt-5">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mb-5 tourist">
                <h1 className="sec2-h1 text-right-sm">
                    Top 9 Must-Visit Tourist Spots in the Philippines
                </h1>
                <p>
                    If tropical islands, mind-blowing landscapes, and unending adventure are in your bucket list for a holiday trip, then you have found a gem of a destination with the Philippines.

                    The Philippines has over 7,000 islands is just waiting to be discovered, visited, and explored some more. 

                    From paradise-like beaches and idyllic islands with turquoise waters, to the world’s most perfect cone volcano and the smallest primate, to a surfing mecca and century-old Spanish fortresses — there are unlimited surprises waiting for every traveler who will visit the Philippines.
                </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./elnido.png"/>
                    <h2></h2>
                    <a className="info">El Nido, Palawan</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./coron.png"/>
                    <h2></h2>
                    <a className="info">Coron, Palawan</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./bohol.png"/>
                    <h2></h2>
                    <a className="info">Chocolate Hills, Bohol</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./mayon.png"/>
                    <h2></h2>
                    <a className="info">Mayon Volcano, Albay</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./vigan.png"/>
                    <h2></h2>
                    <a className="info">Vigan, Ilocos Sur</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./siargao.png"/>
                    <h2></h2>
                    <a className="info">Siargao, Surigao del Norte</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./kawasan.png"/>
                    <h2></h2>
                    <a className="info">Kawasan Falls, Cebu</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./taal.png"/>
                    <h2></h2>
                    <a className="info">Taal Lake, Batangas</a>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-5 line-highlight">
                    <img className="img-responsive img-fluid" src="./banaue.png"/>
                    <h2></h2>
                    <a className="info">Banaue Rice Terraces, Ifugao</a>
            </div>
          </Row>
        </section>
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
      </React.Fragment>
    )
}

