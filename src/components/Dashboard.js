import React from 'react';
import {Redirect} from 'react-router-dom';
import {Panel} from './Panel';
import {NavegationBar} from './NavegationBar'
import {AddAccount} from './AddAccount';
export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        if(!window.sessionStorage.getItem("accessToken")){
            return <Redirect to="/"/>
        }
        return (
            <div>
                <NavegationBar/>
                <div className="container-fluid">
                    <AddAccount/>
                    <Panel />
                </div>
            </div>

        );
    }
}