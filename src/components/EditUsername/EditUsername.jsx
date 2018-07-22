import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("modal-root");

class EditUsername extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: props.user.id,
                username: ""
            },
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

        this.setState({
            user: {
                ...this.state.user,
                id: this.props.user.id
            },
            submitted: true
        });

        const user = this.state.user;
        if(this.props.user.username === user.username || event.target.value === "") {
            alert('현재 사용하는 닉네임과 같거나 빈문자열 입니다.');
        }

        if (user.id && user.username) {
            console.log("닉네임변경 전송");
            this.props.onUpdate(user);
            this.onClose(event);
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
        var changeUsrname = (
            <main id="tg-main" className="tg-main tg-sectionspace tg-haslayout modal_background">
            <div className="container">
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="tg-formtheme tg-formdashboard">
                    <div className="col-xs-12 col-sm-8 col-md-6 col-lg-6">
                        <div id="tg-content" className="tg-content">
                        <div className="tg-dashboard">
                            <div className="tg-box tg-changepassword">
                            <button type="button" className="close" onClick={(ev) => { this.onClose(ev)}}>x</button>
                            <div className="tg-heading">
                                <h3>닉네임 변경</h3>
                            </div>
                            <div className="tg-dashboardcontent">
                                <div className="tg-content">
                                <fieldset>
                                    <div className="form-group">
                                    <label>새로운 닉네임<sup>*</sup></label>
                                    <input type="text" name="username" className="form-control" value={this.state.user.username} onChange={this.handleChange} placeholder="변경할 이름을 적어주세요" />
                                    </div>
                                    <button type="submit" className="tg-btn"><span>수정하기</span></button>
                                </fieldset>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            </main>

        );

        if (!this.props.show) {
            return null;
        }

        return ReactDOM.createPortal (
            changeUsrname,
            this.el,
        );
    }
}

export default EditUsername;
