import React from 'react';
import ReactDOM from 'react-dom';
import './Register.css';

const modalRoot = document.getElementById("modal-root");

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                username: '',
                password: ''
            },
            submitted: false,
            show: false
        };

        this.el = document.createElement("div");
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;

        if (user.email && user.username && user.password) {
            this.props.userActions_register(user);
            this.onClose(event);
            this.setState({
                user: {
                    email: '',
                    username: '',
                    password: ''
                }
            });
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
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        var signUpModal = (
            <div className="modal_background">
                <div className="col-md-6 col-md-offset-3">
                <button type="button" className="close" onClick={(ev) => { this.onClose(ev)}}>x</button>
                    <div className="tg-heading">
                        <h3>가 입 하 기</h3>
                    </div>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                            <label htmlFor="email">E-mail</label>
                            <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                            {submitted && !user.email &&
                                <div className="help-block">email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                            {submitted && !user.username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="tg-btn"><span>가 입 하 기</span></button>
                            {registering}
                            <button onClick={(ev) => { this.onClose(ev)}} className="btn btn-link"> <span>Cancel</span></button>
                        </div>
                    </form>
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

export default Register;
