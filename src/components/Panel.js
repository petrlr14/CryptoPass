import React from 'react';
import axios from 'axios';
import {endPoint} from '../utilities.js';
import {Card} from './Cards'
export class Panel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            accounts:[],
            privateKey:''
        }
    }
    componentDidMount(){
        axios.get(`${endPoint}/api/getMyAccounts/${window.sessionStorage.getItem('nickname')}`,{
            headers:{
                'Authorization':`Bearer ${window.sessionStorage.getItem('accessToken')}`
            }
        })
          .then(response => {
            const res = Object.values(response.data);
            this.setState({accounts:res[0]});
          })
          .catch(error => {
            console.log(error);
          });   
          axios.get(`${endPoint}/api/myUser/${window.sessionStorage.getItem('nickname')}`,{
              headers:{
                  'Authorization':`Bearer ${window.sessionStorage.getItem('accessToken')}`
              }
          })
          .then(res =>{
            const privateKey = res.data.user.password.substring(0,31);
            this.setState({
                privateKey: privateKey
            })
          })
          .catch(err =>{
              console.log(err)
          })
    }
    render(){
        const listIds = this.state.accounts.map(account =>{
            return <Card key={account.id_account} privateKey={this.state.privateKey} idAccount ={account.id_account}/>
        });
        
        
        return(
            <div className="row accounts-container">
                {listIds}
            </div>
        );
    }
}