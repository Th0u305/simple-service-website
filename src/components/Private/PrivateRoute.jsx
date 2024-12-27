import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Context/ContextProvider';

const PrivateRoute = ({children}) => {

    const {pathname} = useLocation()

    const {user, loading} = useContext(AuthContext)

    if (loading) {
        return <div className='mt-12 flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
    }
    if (user && user?.email) {
        return children;
    }    
    return (
        <Navigate state={pathname} to='/login'></Navigate>
    );
};

export default PrivateRoute;