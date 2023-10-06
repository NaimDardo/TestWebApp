/* eslint-disable no-restricted-globals */
import { lazy, Suspense, useEffect } from 'react';
/// Components

import Index from './jsx/index';
import { connect, useDispatch } from 'react-redux';
import {  Route, Routes, useNavigate,useLocation, useParams } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

// function navigate(prop) {
//     return useNavigate(prop)
// }
// eslint-disable-next-line react-hooks/rules-of-hooks
// const navigate = (props) =>{
//     return useNavigate(props)
// }
const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
		setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
	});
});
function withRouter(Component) {
    function ComponentWithRouterProp(props) {

      return (
        <Component
          {...props}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }
function App (props) {
    // let navigate = props.router.navigate
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        checkAutoLogin(props.dispatch, navigate, location);
    }, [props.dispatch, navigate]);
    
    let routes = (  
        <Routes>
            <Route path='/login' element={<Login navigate={navigate}/>} />
            <Route path='/page-register' element={<SignUp/>} />
            <Route path='/page-forgot-password' element={<ForgotPassword/>} />
        </Routes>
    );
    if (props.isAuthenticated) {
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index />
                </Suspense>
            </>
        );
	
	}else{
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
                    {routes}
                </Suspense>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};
    

export default withRouter(connect(mapStateToProps)(App)); 
