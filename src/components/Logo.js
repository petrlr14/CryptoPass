import React from 'react'
import logo from '../assets/images/CryptoPass.png'
export class Logo extends React.Component{

    render(){
        let logoContent={
            width: '100%',
            textAlign:'center',
            margin:'10px 0px 20px 0px'
        }
        return(
            <figcaption style={logoContent}>
                <img src={logo} className="img-fluid" alt="CryptoPass"/>
            </figcaption>
        );
    }
}