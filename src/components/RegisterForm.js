import React from 'react';
import {FormGroup, FormControl, Row, Col, Button} from 'react-bootstrap';
export class RegisterForm extends React.Component{
    render(){
        return(
            <Row className="show-grid">
                <Col md={4}>
                    <div className="form-content">
                        <h3>Sign In</h3>
                        <form>
                            <FormGroup>
                                <FormControl name="firstName" type="text" placeholder="First name"/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl name="lastName" type="text" placeholder="Last name"/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl name="nickname" type="text" placeholder="Nickname"/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl name="email" type="email" placeholder="Email"/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl name="secondaryEmail" type="email" placeholder="Recovery Email (optional)"/>
                            </FormGroup>
                            <div id="check-passwords">
                                <FormGroup>
                                    <FormControl name="password" type="password" placeholder="Password"/>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl name="repassword" type="password" placeholder="Retype Password"/>
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <FormControl name="phone" type="phone" placeholder="Phone number"/>
                            </FormGroup>    

                            <Button type="submit">Submit</Button>

                        </form>
                    </div>
                </Col>
            </Row>
        );
    }
}

