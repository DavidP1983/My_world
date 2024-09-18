import { Menu } from 'antd';
import { useState, useContext } from 'react';
import {
    Link,
    useNavigate 
  } from "react-router-dom";
import { dataContext } from '../../../context';

import './navBar.scss';

  const items = [
    {
      key: 'posts',
      label: (
        <Link to="/posts"  rel="noopener noreferrer">
          Posts
        </Link>
      ),
    },
    {
        key: 'about',
        label: (
          <Link to="/about"  rel="noopener noreferrer">
            About
          </Link>
        ),
      },
      {
        key: 'login',
        label: (
          <Link to="/login"  rel="noopener noreferrer">
            Login
          </Link>
        ),
      },
      {
        key: 'logout',
        label: (
          <Link to="/logout"  rel="noopener noreferrer">
            Logout
          </Link>
        ),
      }
  ];

  const NavBar = () => {
    const [current, setCurrent] = useState('');
    const {isAuth, setIsAuth} = useContext(dataContext);
    const navigate = useNavigate();


    const onClick = (e) => {
      if(e.key === "logout") {
        setIsAuth(null);
        localStorage.removeItem("isAuth");
        navigate("/");
      }
        setCurrent(e.key);
      };


    const setNavBarMenu = (arr, isAuth) => {
      if(isAuth) {
        return arr.filter((link) => link.key !== 'login');
      }else {
        return arr.filter((link) => link.key === 'login');
      }
    }

    const menu = setNavBarMenu(items, isAuth);
    return (
        <div className="navbar" style={{position: "relative"}}>
        <div className="navbar__navLink">
          {isAuth ? <div className='user'>{isAuth[0].toUpperCase()}</div> : null}
        <Menu 
            onClick={onClick} 
            selectedKeys={[current]}  
            mode="horizontal" 
            items={menu} 
           />

        </div>
      </div>
    );
  }

  export default NavBar;