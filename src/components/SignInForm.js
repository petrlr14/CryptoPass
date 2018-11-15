import React from 'react';
import {Logo} from './Logo.js'
export class SignInForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="form-content">
                <Logo />
            </div>
        );
    }
}