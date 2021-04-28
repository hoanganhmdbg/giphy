import React from 'react';
import logo from '../../images/giphy-logo.svg'
import './header.style.css';
//fragment => <></>
class Header extends React.Component {
    render() {
        return (
            <>
                <div className='header'>
                    <img src={logo} alt="logo"></img>
                    <h1>{this.props.label}</h1>
                </div>
            </>
        );
    }
}

export default Header;