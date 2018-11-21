import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {RegisterForm} from './RegisterForm';
import {SignInForm} from './SignInForm';
import videoBanner from '../assets/images/bacground-video.mp4';
import {Redirect} from 'react-router-dom';

export class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: 'signIn',
            redirect:false
        }
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(status){
        console.log(status);
        this.setState({
            status: status
        })
    }
    componentDidMount(){
        if(window.sessionStorage.getItem('accessToken')){
            this.setState({
                redirect:true
            })
        }
    }
    render(){
        let videoContainer = {
            width:'100%',
            position:'absolute',
            overflow:'hidden'
        }
        if(this.state.redirect){
            return <Redirect to='/Dashboard' />
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
                            {(this.state.status === 'signUp')?<RegisterForm onChange={this.changeStatus}/>:<SignInForm onChange={this.changeStatus} />}
                            
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}