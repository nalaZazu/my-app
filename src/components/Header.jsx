import React from 'react'
import '../assets/Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom"
import { useStateValue } from '../StateProvider';
import { auth } from 'firebase';
export default function Header() {
    const [{basket ,user} ,dispatch] = useStateValue();
    const handleAuthentication =()=>{
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className='header'>
            <Link to="/">
            <img className="header_logo" src="https://jitsvinger.co.za/wp-content/uploads/2018/04/Amazon-Logo-1024x373.png" alt="Logo" />

            </Link>
        
            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon" />
            </div>
            <div className="header_nav">
                <Link to={!user && "/login"}>
                <div  onClick={handleAuthentication} className="header_option">
                    <span className="header_optionLineOne">Hello
                     {!user ? 'Guest' : user.email}</span>
                    <span className="header_optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                </Link>
                <div className="header_option">
                    <span className="header_optionLineOne">Return</span>
                    <span className="header_optionLineTwo">&  Order</span>
                </div>
                <div className="header_option">
                    <span className="header_optionLineOne">You </span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to="/checkout">
                <div className="header_optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                </div>
                </Link>
                
            </div>
        </div>
    )
}
