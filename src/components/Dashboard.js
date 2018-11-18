import React from 'react';
import {Redirect} from 'react-router-dom';
export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    handleClick = (e) =>{
        window.sessionStorage.removeItem('accessToken');
    }
    render(){
        if(!window.sessionStorage.getItem("accessToken")){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <h1>Iniciaste sesion con el token: {window.sessionStorage.accessToken}</h1>
                <a href="/" onClick={this.handleClick}>Log Out</a>
            </div>

        );
    }
}