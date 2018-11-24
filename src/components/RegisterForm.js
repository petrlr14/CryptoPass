import React from 'react';
import axios from 'axios';
import {FormGroup, FormControl, Button,Alert,Col,Row} from 'react-bootstrap';
import utilities from '../utilities';
import {Logo} from './Logo.js'
import '../assets/js/spinner.js';
export class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            lastName:'',
            nickname:'',
            email:'',
            password:'',
            repassword:'',
            phone:'',
            password_status:false,
            is_five_char:false,
            is_capital_letter:false,
            is_special_char:false,
            is_validate:false,
            is_alert:false
        }
        this.handleClick = this.handleClick.bind(this);
    } 
    handleClick(e){
        this.props.onChange('signIn');
    }
    handleChange = (e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value,
        });
        
        
    }
    verifyPassword = (e) =>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value,
        });

        if(this.state.password === this.state.repassword){
            this.setState({
                password_status : true
            });
        }else{
            this.setState({
                password_status : false
            });
        }
        if(this.state.password.length > 5){
            this.setState({
                is_five_char : true
            });
        }else{
            this.setState({
                is_five_char : false
            });
        }
        if(this.state.password.match(/[A-Z]+/)){
            this.setState({
                is_capital_letter : true
            });            
        }else{
            this.setState({
                is_capital_letter : false
            });
        }
        if(this.state.password.match(/[!@#$%^&*()-=+]+/)){
            this.setState({
                is_special_char : true
            });            
        }else{
            this.setState({
                is_special_char : false
            });
        }
    
    }
    handleSubmit = (e)=>{
        const body={
            name : this.state.name,
            lastName : this.state.lastName,
            nickname : this.state.nickname.trim(),
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone
        }
        e.preventDefault();
        if(this.state.is_capital_letter && this.state.is_five_char && this.state.is_special_char && this.state.password_status){
            axios.post(`${utilities.endPoint}/api/signUp`,body)
                .then(res =>{
                    this.setState({
                        name:'',
                        lastName:'',
                        nickname:'',
                        email:'',
                        password:'',
                        repassword:'',
                        phone:'',
                        password_status:false,
                        is_five_char:false,
                        is_capital_letter:false,
                        is_special_char:false,
                        is_validate:false,
                        is_alert:false
                    })
                    this.props.onChange('signIn');
                })
                .catch(err => {
                    console.log(err.data)
                    console.log(err);

                    this.setState({
                        is_alert:true
                    })
                });
                
            
        }else{
            this.setState({
                is_alert:true
            })
        }
        
    }
    render(){
        const {name,lastName,nickname,email,repassword,password,phone} = this.state;
        let center={
            textAlign:'center',
            color:'#fff'
        }
        
        let success={
            color:"var(--success)",
            borderColor:"var(--success)"
        }
        let danger={
            color:"var(--danger)",
            borderColor:"var(--danger)"
        }
        return(
            <div className="form-content">
                <Logo />
                <h3 style={center }>Sign Up</h3>
                {
                    (this.state.is_alert)?<Alert bsStyle="warning">
                                    <b>Warning</b> check the information...
                                </Alert>
                                :
                                <div></div>
                }
                <form method="POST" onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <FormControl name="name" type="text" onChange={this.handleChange} placeholder="First name" value={name}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="lastName" type="text" onChange={this.handleChange} placeholder="Last name" value={lastName}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="nickname" type="text" onChange={this.handleChange} placeholder="Nickname" value={nickname}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl name="email" type="email" onChange={this.handleChange} placeholder="Email" value={email}/>
                    </FormGroup>
                    <div id="check-passwords">
                        <FormGroup>
                            <FormControl name="password" type="password" onKeyUp={this.verifyPassword} onChange={this.handleChange} placeholder="Password" value={password}/>
                        </FormGroup>
                        <div className="validate-section">
                            <p name="password-lenght" style={(this.state.is_five_char)? success : danger } ><i className="fas fa-times"></i> Minimun five characters</p>
                            <p name="capital-letter" style={(this.state.is_capital_letter)? success : danger } ><i className="fas fa-times"></i> Minimun one capital letter</p>
                            <p name="special-character" style={(this.state.is_special_char)? success : danger } ><i className="fas fa-times"></i> Minimun one special character (!@#$%^&*()-=+)</p>
                        </div>
                        <FormGroup>
                            <FormControl name="repassword" type="password" onKeyUp={this.verifyPassword} onChange={this.handleChange}  placeholder="Retype Password" value={repassword}/>
                        </FormGroup>
                        <p style={(this.state.password_status)? success:danger} name="validation-label">{(this.state.password_status)? "Password match" : "Password not match"}</p>
                    </div>
                    <FormGroup>
                        <FormControl name="phone" type="phone" onChange={this.handleChange} placeholder="Phone number" value={phone}/>
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <Button onClick={this.handleClick} className="btn btn-success">Sign In</Button>
                        </Col>
                        <Col md={6} style={{textAlign:"right"}}>
                            <Button type="submit">Sign Up</Button>
                        </Col>
                    </Row>
                </form>
            </div>
                
        );
    }
}

