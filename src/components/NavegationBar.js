import React from 'react';
import logoSrc from '../assets/images/CryptoPass.png';
export class NavegationBar extends React.Component{
    handleLogOut = (e)=>{
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('nickname');
    }
    render(){
        let logoBrand={
            width:'7%'       
        }
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{marginBottom:'15px'}}>
                <img style={logoBrand} src={logoSrc} alt="Cryptopass" />
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">    
                    </ul>
                    <ul className="navbar-nav my-2 my-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/Dashboard">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a onClick={this.handleLogOut} className="nav-link" href="/" >Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}