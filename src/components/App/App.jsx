import React,{ Fragment } from 'react';
import { HashRouter, Route, Redirect, Router } from 'react-router-dom';
import { history } from '../../_helpers';
import { PrivateRoute } from '../PrivateRoute.jsx';
import Main from '../Main/Main.jsx';
import Login from '../Login/Login.jsx';
import Nav from '../Nav/Nav.jsx';
import MyPage from '../MyPage/MyPage';
//import { NoMatch } from '../NoMatch';


class App extends React.Component {
    componentDidMount(){
        this.props.userActions_getAll();
    }

    render() {
        return (
            <div id="tg-wrapper" className="tg-wrapper tg-haslayout">
                <Router history={history}>
                    <Fragment>
                        <Nav {...this.props}/>
                        <Route exact path="/" render={(props)=>{
                            if(!this.props.user.id){
                                return(<Login {...this.props} {...props} />);
                            }else{
                                return(<Redirect to='/main' />)
                            }}} />

                        <Route path="/main" render={(props)=>{
                            if(!this.props.user.id){
                                return(<Redirect to='/' />)
                            }else{
                                return(<Main {...this.props} {...props} />)
                            }}} />

                        <Route path={`/mypage/:id`} render={(props)=>{
                            if(!this.props.user.id){
                                return(<Redirect to='/' />)
                            }else{
                                return(<MyPage {...this.props} {...props} />)
                            }}} />
                    </Fragment>
                </Router>
            </div>
        );
    }
}

export default App;
