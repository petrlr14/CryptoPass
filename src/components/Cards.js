import React from 'react';
import axios from 'axios';
import {endPoint} from '../utilities';
import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
export class Card extends React.Component{
    constructor(props){
        super(props);
        this.state={
            idUser:'',
            _id:'',
            banner:'',
            title:'',
            url:'',
            login:'',
            password:'',
            description:'',
        }
    }
    deleteAccount=(e)=>{
        axios.delete(`${endPoint}/api/deleteAccount/${this.state._id}`,{
            headers:{
                'Authorization':`Bearer ${window.sessionStorage.getItem('accessToken')}`
            },
            data:{
                'idUser':this.state.idUser
            }
            
        })
        .then(res =>{
            if(res.status === 200){
                this.props.onChange();
            }
        })
        .catch(err =>{

        })
    }
    componentDidMount(){
        axios.get(`${endPoint}/api/getAccount/${this.props.idAccount}`,{
            headers:{
                'Authorization':`Bearer ${window.sessionStorage.getItem('accessToken')}`
            }
        })
        .then(res =>{
            this.setState({
                _id:res.data.acnt._id,
                banner: res.data.acnt.wallpaper,
                url:res.data.acnt.url,
                title: res.data.acnt.name,
                login:res.data.acnt.login,
                password:res.data.acnt.password,
                description:res.data.acnt.description
            })
        })
        .catch(err =>{
            console.log(`Error: ${err}`);
        })

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
    render(){
        return(
            <div className="card bg-secondary mb-4" style={{maxWidth:'20rem',margin:'7px'}}>
                <img className="banner-account" src={this.state.banner} alt={this.state.title} />
                <i style={{cursor:'pointer'}} onClick={this.deleteAccount} className="fas fa-eraser"></i>
                <div className="card-body">
                    <div className="account-info">
                        <h4 className="card-title">{this.state.title}</h4>
                        <h6 className="card-subtitle text-muted">{this.state.url}</h6>
                    </div>
                    <hr />
                    <div className="user-account-info">
                        <h5>Account:</h5>
                        <h5 className="text-muted" style={{fontWeight:'bold'}}>{AES.decrypt(this.state.login,this.props.privateKey).toString(CryptoJS.enc.Utf8)}</h5>
                        <hr/>
                        <h6>Password:</h6>
                        <h6 className="text-muted">{AES.decrypt(this.state.password,this.props.privateKey).toString(CryptoJS.enc.Utf8)}</h6>
                    </div>
                    <p className="card-text">{this.state.description}</p>
                </div>
            </div>
        );
    }
}