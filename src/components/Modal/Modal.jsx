import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.getElementById("modal-root");

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            username:"",
            password: "",
            show: false
        }

        this.el = document.createElement("div");
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    onClose = (ev) => {
        ev.stopPropagation ();
        this.props.onClose && this.props.onClose(ev);
    }

    onKeyUp = (ev) => {
        // Lookout for ESC key (27)
        if (ev.which === 27 && this.props.show) {
            this.onClose(ev);
        }
    }

    onRegister(id, name, pw) {
        return this.props.registerRequest(id, name, pw).then(
            () => {
                console.log("onRegister---this.props-----------")
                console.log(this.props)
                console.log("end--onRegister---this.props------")
                if(this.props.register.status === "SUCCESS") {
                    alert('Success! Please log in', 2000);
                    this.props.history.push('/main');
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];

                    alert('<span style="color: #FFB4BA">' + errorMessage[this.props.register.errorCode - 1] + '</span>');
                }
            }
        );
    }

    handleChange(ev) {
        let nextState = {};
        nextState[ev.target.name] = ev.target.value;
        this.setState(nextState);
    }


    handleRegister(ev) {
        let id = this.state.email;
        let name = this.state.username;
        let pw = this.state.password;

        this.onRegister(id, name, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        ).then(this.onClose(ev));
    }

    handleKeyPress(ev) {
        if(ev.charCode ===13 ){
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.props.handleRegister();
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
        modalRoot.removeChild(this.el);
    }

    render() {
        var signUpModal = (
            <div className="background__style">
                <button onClick={(ev) => { this.onClose(ev)}}>close</button>
                <div className="signup__container">
                    <div className="container__child signup__thumbnail">
                        <div className="thumbnail__logo">
                        <h1 className="logo__text">Thanks 365</h1>
                        </div>
                        <div className="thumbnail__content text-center">
                        <h1 className="heading--primary">가입하세요!</h1>
                        <h2 className="heading--secondary">일상의 감사</h2>
                        </div>
                        <div className="signup__overlay"></div>
                    </div>
                    <div className="container__child signup__form">
                        <form action="">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                id="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                placeholder="james.bond@spectre.com"
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="form-control validate"
                                name="username"
                                type="text"
                                value={this.state.username}
                                onChange={this.handleChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control validate"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                required />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="passwordRepeat">Repeat Password</label>
                            <input className="form-control" type="password" name="passwordRepeat" id="passwordRepeat" placeholder="********" required />
                        </div> */}
                        <div className="m-t-lg">
                            <ul className="list-inline">
                            <li>
                                <input
                                    onClick={(ev) => {this.handleRegister (ev)}}
                                    className="btn btn--form"
                                    type="button"
                                    value="Register" />
                            </li>
                            <li>
                                <a className="signup__link" href="">I am already a member</a>
                            </li>
                            </ul>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
        if (!this.props.show) {
            return null;
        }
        return ReactDOM.createPortal (
            signUpModal,
            this.el,
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
}
