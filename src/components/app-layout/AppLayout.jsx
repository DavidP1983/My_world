import { useState, useEffect } from "react";
import { dataContext } from "../../context";
//Pages with Routes
import AppRouter from "../app-router/AppRouter";
import NavBar from "../UI/navBar/NavBar";
//Service offline
import useOffline from "../../hooks/useOffline";
import ErrorMessage from "../UI/error/ErrorMessage";



const AppLayout = () => {
    const [isAuth, setIsAuth] = useState(null);
    const {isOffline} = useOffline();
    //Проверяем на авторизацию
    useEffect(() => {
        if(localStorage.getItem('isAuth')) {
            setIsAuth(localStorage.getItem('isAuth'));
        }
    },[]);

    const value = {
        isAuth,
        setIsAuth
    }
    return (
        <dataContext.Provider value={value}>
            <NavBar />
            {isOffline ? <ErrorMessage isError={isOffline} subTitle='No internet connection'/> : <AppRouter/>}
        </dataContext.Provider>
    );
}

export default AppLayout;