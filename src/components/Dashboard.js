import React from 'react';
import {Redirect} from 'react-router-dom';
import {Panel} from './Panel';
import {NavegationBar} from './NavegationBar'
import {AddAccount} from './AddAccount';
export class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            is_update:false
        }
        this.requestUpdate = this.requestUpdate.bind(this);
    }
    requestUpdate(state){
        this.setState({
            is_update:state
        })
    }
    render(){
        if(!window.sessionStorage.getItem("accessToken")){
            return <Redirect to="/"/>
        }
        console.log('Soy el papa, se lo pasare a mi hijo '+ this.state.is_update);
        return (
            <div>
                <NavegationBar/>
                <div className="container-fluid">
                    <AddAccount onChange={this.requestUpdate}/>
                    <Panel updateComponent={this.state.is_update} onChange={this.requestUpdate}/>
                </div>
            </div>

        );
    }
}