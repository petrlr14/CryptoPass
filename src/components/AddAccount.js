import React from 'react';
import {FormGroup,FormControl,Button,Alert} from 'react-bootstrap';
import axios from 'axios';
import {endPoint} from '../utilities';
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
    }
    handleChange =(e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value,
        });
        
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
    handleSubmit =(e)=>{
        e.preventDefault();
        if(this.state.url !=='' && this.state.login !=='' && this.state.password){
            const body ={
                _id:this.state.idUser,
                name:this.state.name,
                wallpaper:`https://source.unsplash.com/random/318x175`,
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
        const {url,name,login,password,description} = this.state;
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
                                    <FormControl onChange={this.handleChange} name="password" type="password" placeholder="Password" value={password}/>
                                </FormGroup>
                            </FormGroup>
                            <hr/>
                            <FormGroup>
                                <FormControl onChange={this.handleChange} name="description" componentClass="textarea" placeholder="Description" value={description}/>
                            </FormGroup>                       
                            <div className="modal-footer">
                                <Button type="button" bsStyle="danger" data-dismiss="modal">Close</Button>
                                <Button type="submit" bsStyle="success">Save account</Button>
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