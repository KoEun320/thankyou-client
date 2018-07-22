import React, { Fragment } from 'react';
//import { history } from '../../_helpers';
import { NavLink, Link } from 'react-router-dom';
import PostForm from '../PostForm/PostForm';
import RandomBox from '../RandomBox/RandomBox';

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }
    componentDidMount(){
        //this.props.postActions_getRandom(this.props.user.id);
    }

    onLogout(e){
        e.preventDefault();
        this.props.userActions_logout();
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    render() {
        return (
            <Fragment>
                <PostForm onClose={this.showModal} show={this.state.show} {...this.props}/>
                {   this.props.user.username && !this.props.user.error &&
                    <nav id="menu">
                    <ul>
                        <li><NavLink to='/main'>Thankyou form all</NavLink></li>
                        <li><NavLink to={`/mypage/${this.props.user.id}`}>Thankyou from {this.props.user.username}</NavLink></li>
                    </ul>
                    </nav>
                }
                <header id="tg-header" className="tg-header tg-haslayout">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="tg-navigationarea tg-headerfixed">
                                <Link className="tg-logo align-middle align-text-bottom" to='/main'> T H A N K Y O U | 365 </Link>
                                <div className="tg-socialsignin">
                                    { this.props.user.username && !this.props.user.error &&
                                        <Fragment>
                                        <div className="tg-userbox">
                                            <NavLink id="tg-btnsignin" onClick={this.showModal} className="tg-btn" to={this.props.location.pathname}><span>write</span></NavLink>
                                        </div>
                                        <div className="tg-userbox">
                                            <NavLink id="tg-btnsignin" onClick={this.onLogout.bind(this)} className="tg-btn" to="/"><span>log out</span></NavLink>
                                        </div>
                                        </Fragment>
                                    }
                                </div>
                                <nav id="tg-nav" className="tg-nav">
                                    <div className="navbar-header">
                                        <a className="navbar-toggle collapsed">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </a>
                                    </div>
                                    <div id="tg-navigation" className="collapse navbar-collapse tg-navigation">
                                        {
                                            this.props.user.username && !this.props.user.error &&
                                            <Fragment>
                                            <ul>
                                                <li className="current-menu-item"><NavLink to="/main" activeStyle={{ fontWeight: 'bold'}} exact>Thankyou from all</NavLink></li>
                                                <li><NavLink to={`/mypage/${this.props.user.id}`} activeStyle={{ fontWeight: 'bold'}} exact> Thankyou from {this.props.user.username}</NavLink></li>
                                            </ul>
                                            {
                                                this.props.post.random &&  <RandomBox random={this.props.post.random} user={this.props.user} />
                                            }
                                            </Fragment>
                                        }
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
            </Fragment>
        );
    }
}

export default Nav;
