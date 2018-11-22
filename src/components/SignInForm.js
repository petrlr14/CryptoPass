import React from 'react';
import {Logo} from './Logo.js';
import {FormGroup,FormControl,Button,Row,Col,Alert} from 'react-bootstrap';
import axios from 'axios';
import {endPoint} from '../utilities';
import {Redirect} from 'react-router-dom';
export class SignInForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nickname:'',
            password:'',
            message:'',
            is_alert: false,
            redirect:false,
            show_spinner:false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        this.props.onChange('signUp');
    }
    //Sixtasis para ahorran el bind al metodo
    handleChange=(e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value,
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.setState({
            show_spinner:true
        })
        if(this.state.nickname !== "" && this.state.password !== "" ){
            const body ={
                nickname:this.state.nickname,
                password: this.state.password
            }
            axios.post(`${endPoint}/api/signIn`,body)
                .then(res =>{
                    window.sessionStorage.setItem('accessToken',res.data.token);
                    window.sessionStorage.setItem('nickname',body.nickname);
                    this.setState({
                        redirect:true
                    })

                })
                .catch(err =>{
                    if(err.response){
                        if(err.response.status === 404){
                            this.setState({
                                message:'Ups.. Check login fields'
                            })
                        }
                        if(err.response.status === 403){
                            this.setState({
                                message:"Sorry... Check login fields"
                            })
                        }
                        this.setState({
                            show_spinner:false,
                            is_alert:true
                        })
                    }
                })
        }else{
            this.setState({
                message: 'Ups.. credentials are incorrect',
                is_alert:true,
                show_spinner:false
            })
        } 
    
    }
    render(){
        if(this.state.redirect){
            return <Redirect to='/Dashboard' />
        }
        const {nickname,password} = this.state;
        let center={
            textAlign:'center',
            color:'#fff'
        }
        const warning_alert =(
            <Alert bsStyle="danger">
                {this.state.message}
            </Alert>
        );
        const spinner = (
            <i className="fas fa-spinner"></i>
        );
        return(
            <div className="form-content">
                <Logo />
                <h3 style={center}>Sign In</h3>
                <form method="POST" onSubmit={this.handleSubmit}>
                    {(this.state.is_alert)? warning_alert :<div></div>}
                    <FormGroup>
                        <FormControl autoFocus={true} onChange={this.handleChange} name="nickname" type="text" placeholder="Nickname" value={nickname}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl onChange={this.handleChange} name="password" type="password" placeholder="Password" value={password}/>
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <Button onClick={this.handleClick} className="btn btn-danger">Sign up </Button>
                        </Col>
                        <Col style={{textAlign:"right"}} md={6}>
                            <Button type="submit" className="spinner-animation">Sign in {(this.state.show_spinner)?spinner:""}</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}