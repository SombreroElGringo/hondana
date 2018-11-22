import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component{
    render(){
        return(
        <header>
            <nav>
                <div className="brand">
                    <img
                        className="logo"
                        src="https://png2.kisspng.com/20180303/ede/kisspng-train-station-rail-transport-tgv-logo-high-speed-train-logo-5a9b35fd96c683.4309293215201213416176.png"
                        alt=""
                    />
                    <div>SNCF Live</div>
                </div>
                <div>
                    <Link to={'/'}>Home</Link>
                </div>
            </nav>
        </header>
        )
    }
}