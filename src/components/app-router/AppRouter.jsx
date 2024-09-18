import { Routes, Route  } from 'react-router-dom';
import { useContext } from 'react';
//All routes 
import { privateRroutes, publicRoutes } from '../../router';
import { dataContext } from '../../context';


const AppRouter = () => {
    const {isAuth} = useContext(dataContext);
    return (
        isAuth 
            ?
            <Routes> 
            {privateRroutes.map(({path, component}) => 
                <Route path={path}  Component={component} key={path}/>
            )}
            {/* <Route path="/posts" element={<Posts />} /> */}
            </Routes>


            :
            <Routes>
            {publicRoutes.map(({path, component}) => 
            <Route path={path}  Component={component} key={path} />
            )}
            </Routes>
            
    );
}

export default AppRouter;