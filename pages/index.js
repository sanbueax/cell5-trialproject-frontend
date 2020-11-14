import React from 'react';
import { Row, Col } from 'react-bootstrap'

export default function Home(){
    return(
      <React.Fragment>
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
                <a href="#" className="btn-get-started">Travel Guides</a>
            </div>
        </header>
        <section className="section-1 my-5">
          <div className="container">
              <div className="row p-5">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 line-highlight">
                      <h1 className="sec1-h1 text-right-sm wow zoomIn quotes">
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
                <div className="hovereffect">
                    <img className="img-responsive img-fluid" src="./background.jpg"/>
                    <div className="overlay">
                        <h2>Cebu City</h2>
                        <a className="info" href="#">View Here</a>
                    </div>
                </div>
            </div>
          </Row>
        </section>
      </React.Fragment>
    )
}

