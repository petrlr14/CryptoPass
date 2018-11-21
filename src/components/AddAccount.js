import React from 'react';
import {FormGroup,FormControl,Button} from 'react-bootstrap'
export class AddAccount extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:'',
            banner:'',
            login:'',
            password:'',
            description:'',
            is_url:false,
            is_login:false,
            is_password:false
        }
    }
    handleChange =(e)=>{
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value,
        });
        
        (this.state.url.length >= 1) ? this.setState({is_url:true}) : this.setState({is_url:false})
        //(this.state.login.length > 0)?this.setState({is_login:true}):this.setState({is_login:false})
        //(this.state.password.length > 0)?this.setState({is_password:true}):this.setState({is_password:false})
    }
    handleSubmit =(e)=>{
        
    }
    render(){
        const {url,banner,login,password,description,is_login,is_password,is_url} = this.state;
        let success ={
            border: '1px solid var(--success)'
        }
        let error ={
            border: '1px solid var(--danger)'
        }
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
                        <form onSubmit={this.handleChange}>
                            <FormGroup>
                                <FormControl style={(is_url)?success:error} onChange={this.handleChange} name="url" type="text" placeholder="URL" value={url} />
                            </FormGroup>
                            <FormGroup>
                                <FormControl onChange={this.handleChange} name="banner" type="file" value={banner}/>
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
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Button type="button" bsStyle="danger" data-dismiss="modal">Close</Button>
                        <Button type="submit" bsStyle="success">Save account</Button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}