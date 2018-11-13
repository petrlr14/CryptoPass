import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {RegisterForm} from './RegisterForm';
import videoBanner from '../assets/images/bacground-video.mp4';
export class SignUp extends React.Component{
    render(){
        let videoContainer = {
            width:'100%',
            position:'absolute',
            overflow:'hidden'
        }
        return(
            <div className="welcome-container">
                <div style={videoContainer}>
                    <video id="videoBanner" loop autoPlay>
                        <source src={videoBanner} type="video/mp4"/>
                    </video>
                </div>
                <Row className="center-content">
                    <Col md={4}>
                        <div className="filter-container">
                            <RegisterForm/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}