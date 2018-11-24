import React from 'react';
import {FormGroup,FormControl,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import {endPoint} from '../utilities';
import $ from 'jquery';
import {PasswordGeneratorForm} from './PasswordGeneratorForm';
export class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idUser:'',
            name:'',
            url:'',
            login:'',
            password:'',
            description:'',
            is_alert:false
        }
        this.demmissModal = this.demmissModal.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }
    handleChange =(e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value,
        });
        
    }
    demmissModal(){
        $(window).ready(()=>{
            $('#myModal').modal('hide');
        })
    }
    componentDidMount(){
        axios.get(`${endPoint}/api/myUser/${window.sessionStorage.getItem('nickname')}`,{
            headers:{
                'Authorization':`Bearer ${window.sessionStorage.getItem('accessToken')}`
            }
        })
        .then(res =>{
            this.setState({
                idUser:res.data.user._id
            });
        })
        .catch(err =>{
            console.log(err);
        })
    }
    setPassword(passwordGenerated){
        this.setState({
            password:passwordGenerated
        })
    }
    handleSubmit =(e)=>{
        e.preventDefault();
        console.log(this.state.password)
        if(this.state.url !=='' && this.state.login !=='' && this.state.password){
            const body ={
                _id:this.state.idUser,
                name:this.state.name,
                wallpaper:`https://picsum.photos/318/175?blur`,
                description:this.state.description,
                url:this.state.url,
                login:this.state.login,
                password:this.state.password
            }
            axios.post(`${endPoint}/api/newAccount`,body,{
                headers:{
                    'Authorization':`Bearer ${window.sessionStorage.getItem('accessToken')}`
                }
            })
            .then(response=>{
                if(response.status === 200){
                    this.props.onChange(true);
                    this.setState({
                        name:'',
                        url:'',
                        login:'',
                        password:'',
                        description:'',
                    })
                    this.demmissModal();
                }
            })
            .catch(err =>{
            })
        }else{
            this.setState({
                is_alert:true
            })
        }
        
    }
    render(){
        const {url,name,login,description} = this.state;
        const alert=(
            <Alert bsStyle="warning">
                Ups, some fields are empty
            </Alert>
        );

        return(
            <div style={{marginBottom:'10px'}}>
                <Button type="button" bsStyle='success' data-toggle="modal" data-target="#myModal">
                Add Acount
                </Button>

                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <Button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></Button>
                        <h4 className="modal-title" id="myModalLabel">Add new account</h4>
                    </div>
                    <div className="modal-body">
                        {(this.state.is_alert)?alert:""}
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <FormControl  onChange={this.handleChange} name="url" type="url" placeholder="URL" value={url} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl onChange={this.handleChange} name="name" type="text" placeholder="Account name" value={name} />
                            </FormGroup>
                            <FormGroup controlId="credentials">
                                <label className="muted-text">Credentials</label>
                                <FormGroup>
                                    <FormControl onChange={this.handleChange} name="login" type="text" placeholder="Login" value={login}/>
                                </FormGroup>
                                <FormGroup>
                                    <PasswordGeneratorForm onChange={this.setPassword}/>
                                </FormGroup>     
                            </FormGroup>
                            <hr/>
                            <FormGroup>
                                <FormControl onChange={this.handleChange} name="description" componentClass="textarea" placeholder="Description" value={description}/>
                            </FormGroup>                       
                            <div className="modal-footer">
                                <Button type="button" bsStyle="danger" data-dismiss="modal">Close</Button>
                                <Button type="submit" onClick={this.setGenerateValue} bsStyle="success">Save account</Button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}