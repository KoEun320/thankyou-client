import React from 'react';
import Register from '../Register/Register';
//import Modal from '../Modal/Modal';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            submitted: false,
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // reset login status
        //this.props.userActions_logout();
        this.props.alertActions_clear();
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        console.log(this.state)
        if (email && password) {
            this.props.userActions_login(email, password);
            this.setState({
                email: '',
                password: '',
            });
        }
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    render() {
        const { alert } = this.props;
        const { email, password } = this.state;
        return (
            <main id="tg-main" className="tg-main tg-sectionspace tg-haslayout">
            <div className="container col-md-9 col-md-offset-3">
                <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                {
                    alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                </div>
                <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <div id="tg-content" className="tg-content">
                    <form className="tg-formtheme" onSubmit={this.handleSubmit}>
                        <fieldset>
                        <div className="tg-box">
                            <div className="tg-heading">
                            <h3>로 그 인</h3>
                            </div>
                            <div className="clearfix" />
                            <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                <label>email <sup>*</sup></label>
                                <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="form-group">
                                <label>password <sup>*</sup></label>
                                <input type="password" name="password" className="form-control" value={password} onChange={this.handleChange} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </fieldset>
                        <fieldset>
                        <button className="tg-btn" type="submit"><span>로그인 하기</span></button>
                        <button className="tg-btn" onClick={this.showModal} ><span>가입하기</span></button>
                        </fieldset>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            <Register onClose={this.showModal} show={this.state.show} {...this.props} />
            </main>
        );
    }
}

export default Login;
