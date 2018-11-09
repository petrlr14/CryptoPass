import React from 'react';
import {Row,Col} from 'react-bootstrap';
import {RegisterForm} from './RegisterForm';

export class SignUp extends React.Component{
    render(){
        return(
            <div className="signUp-content">
                <Row>
                    <Col md={12}>
                        <div className="filter-container">
                            <RegisterForm/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}