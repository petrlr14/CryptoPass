import React from 'react'
import {SignUp} from './components/SignUp';
import {Dashboard} from './components/Dashboard';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
export class App extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={SignUp} exact />
                    <Route path="/Dashboard" component={Dashboard} />
                </Switch>
            </BrowserRouter>
        );
    }
}