import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../pics/logo.png'
import Nav from '../components/Nav'
import '../styles/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = ({ basket }) => {
    const [navVisible, setNavVisible] = useState(false);
    const handleNavVisible = (bool) => setNavVisible(bool)
    return (
        <header>
            <div id='header-in-center'>
                <div className='upper-header'>
                    <Link to='/' ><img src={logo} alt='logo' id='logo' /></Link>
                    <div id='upper-header-blank'></div>

                    <div id='shopping-cart-icon-wrap'>
                        <div id='cart-counter'>{basket.length}</div>
                        <Link to='/basket'>
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className='shopping-cart-icon' />
                        </Link>
                    </div>

                    <div id="menu-bars-icon-wrap">
                        <FontAwesomeIcon
                            icon={faBars}
                            className='menu-bars-icon'
                            onClick={() => { setNavVisible(true) }}
                        />
                    </div>
                </div>
                <div className='lower-header'>
                    <input type="search" placeholder='Enter product name...' />
                    <FontAwesomeIcon icon={faSearch} className='magnifier-icon' />
                </div>
            </div>
            <Nav
                open={navVisible}
                handleNavVisible={handleNavVisible}
            />
        </header >
    )
}

export default Header;