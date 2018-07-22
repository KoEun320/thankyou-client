import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("modal-root");

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                content: "",
                imgUrl: "",
                isPublic: true
            },
            show: false
        };

        this.el = document.createElement("div");
        this.ByteCounter = this.ByteCounter.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getWritedDay() {
        var getToday = new Date();
        var yyyy = getToday.getFullYear();
        var mm = getToday.getMonth() + 1; //January is 0!
        var dd = getToday.getDate();
        var hh = getToday.getHours();
        var min = getToday.getMinutes();

        function addZero(num) {
            return (num < 10) ? '0'+ num : num ;
        }

        var todayDate = addZero(mm)+'.'+addZero(dd)+'.'+yyyy + " "+ addZero(hh) + ":" + addZero(min);

        return todayDate;
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onKeyUp);
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onKeyUp);
        modalRoot.removeChild(this.el);
    }


    handleChange(event) {
        const { name, value } = event.target;
        const { post } = this.state;
        this.setState({
            post: {
                ...post,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        var checkPublic = document.getElementById('checkPublic');
        var findRadioEl = document.getElementsByName('seletedImage');
        var checked_value = '';

        for( var i = 0; i < findRadioEl.length; i++ ) {
            if(findRadioEl[i].checked) {
                checked_value = findRadioEl[i].value;
            }
        }

        this.setState({ submitted: true });
        const { post } = this.state;
        const info = {
            user: { id: this.props.user.id, username: this.props.user.username },
            post: {
                ...post,
                imgUrl: checked_value,
                isPublic: !checkPublic.selected,
                created: this.getWritedDay()
            }
        }

        if (info.user.id && info.post.content) {
            this.props.postActions_register(info);
            this.props.postActions_getAll(1);
            this.onClose(event);
            this.setState({
                post: {
                    content: "",
                    imgUrl: "",
                    isPublic: true,
                    created: ""
                }
            });
        } else {
            alert('내용을 입력해 주세요');
        }
    }

    onClose = (ev) => {
        ev.stopPropagation();
        this.props.onClose && this.props.onClose(ev);
    }

    onKeyUp = (ev) => {
        // Lookout for ESC key (27)
        if (ev.which === 27 && this.props.show) {
            this.onClose(ev);
        }
    }

    ByteCounter(ev) {
        var target = ev.target;
        var maxByte = 100;
        var textValue = target.value;
        var textValueLength = textValue.length;
        var textByte = 0;
        var textValueCounter = 0;
        var singleCharacter = "";
        var textValue2 = "";

        for (var i = 0; i < textValueLength; i++) {
            singleCharacter = textValue.charAt(i);

            if (escape(singleCharacter).length > 4) {
                textByte += 2;
            } else {
                textByte++;
            }

            if (textByte <= maxByte) {
                textValueCounter = i + 1;
            }
        }
        if (textByte > maxByte) {
            alert("한글 " + (maxByte / 2) + "자 / 영문 " + maxByte + "자를 초과 입력 할 수 없습니다.\n\n초과된 내용은 자동으로 삭제 됩니다. ");
            textValue2 = textValue.substr(0, textValueCounter);
            target = textValue2;
            this.ByteCounter(target, maxByte);
        } else {
            document.getElementById('byteInfo').innerText = textByte + "/" + maxByte + "자";
        }
    }



    render() {
        var writePost = (
            <main id="tg-main" className="tg-main tg-haslayout modal_background">
                <div className="container">
                    <div className="row">
                        <div id="tg-twocolumns" className="tg-twocolumns">
                            <button type="button" className="close" onClick={(ev) => { this.onClose(ev) }}>x</button>
                            <form className="tg-formtheme tg-formdashboard" onSubmit={this.handleSubmit}>
                                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                                    <aside id="tg-sidebar" className="tg-sidebar">
                                        <div className="tg-widget tg-widgetdashboard">
                                            <div className="tg-heading">
                                                <h3>사진 선택</h3>
                                            </div>
                                            <div className="tg-widgetcontent">
                                            <fieldset className="tg-paymentarea">
                                                    <div id="tg-accordion" className="tg-accordion" role="tablist" aria-multiselectable="true">
                                                        <div className="tg-panel">
                                                            <h4 className="tg-radio">
                                                            <input type="radio" id="defaultImage1" name="seletedImage" value="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fa21066bea145bff86d1cf16b652d97c&auto=format&fit=crop&w=1055&q=80" defaultChecked />
                                                                <label htmlFor="defaultImage1"></label>
                                                            </h4>
                                                            <div className="tg-panelcontent">
                                                                <div className="tg-description">
                                                                    <img src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fa21066bea145bff86d1cf16b652d97c&auto=format&fit=crop&w=1055&q=80" alt="default" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tg-panel">
                                                            <h4 className="tg-radio">
                                                            <input type="radio" id="defaultImage2" name="seletedImage" value="https://images.unsplash.com/photo-1525908106172-c366bafe972e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dda3412434dcfe1655863b7b300ef612&auto=format&fit=crop&w=1050&q=80" />
                                                                <label htmlFor="defaultImage2"></label>
                                                            </h4>
                                                            <div className="tg-panelcontent">
                                                                <div className="tg-description">
                                                                <img src="https://images.unsplash.com/photo-1525908106172-c366bafe972e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dda3412434dcfe1655863b7b300ef612&auto=format&fit=crop&w=1050&q=80" alt="default" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tg-panel">
                                                            <h4 className="tg-radio">
                                                            <input type="radio" id="defaultImage3" name="seletedImage" value="https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=91d35d2b5386e7dd13bd3b2538eab428&auto=format&fit=crop&w=1050&q=80" />
                                                                <label htmlFor="defaultImage3"></label>
                                                            </h4>
                                                            <div className="tg-panelcontent">
                                                                <div className="tg-description">
                                                                <img src="https://images.unsplash.com/photo-1495214783159-3503fd1b572d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=91d35d2b5386e7dd13bd3b2538eab428&auto=format&fit=crop&w=1050&q=80" alt="default" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tg-panel">
                                                            <h4 className="tg-radio">
                                                            <input type="radio" id="defaultImage4" name="seletedImage" value="https://images.unsplash.com/photo-1526857240824-92be52581d9b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4289d1a4871707fc0cae7720e651a5d8&auto=format&fit=crop&w=1650&q=80" />
                                                                <label htmlFor="defaultImage4"></label>
                                                            </h4>
                                                            <div className="tg-panelcontent">
                                                                <div className="tg-description">
                                                                <img src="https://images.unsplash.com/photo-1526857240824-92be52581d9b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4289d1a4871707fc0cae7720e651a5d8&auto=format&fit=crop&w=1650&q=80" alt="default" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                    <div id="tg-content" className="tg-content">
                                        <div className="tg-dashboard">
                                            <div className="tg-box tg-ediprofile">
                                                <div className="tg-heading">
                                                    <h3>감사 하기</h3>
                                                </div>
                                                <div className="tg-dashboardcontent">
                                                    <div className="tg-content">
                                                        <fieldset>
                                                            <div className="form-group">
                                                                <span className="tg-select">
                                                                    <select>
                                                                        <option name="isPublic" value="true" > 공 개 </option>
                                                                        <option id="checkPublic" name="isPublic" value="false" > 비 공 개 </option>
                                                                    </select>
                                                                </span>
                                                            </div>
                                                            <div className="form-group">
                                                                <textarea
                                                                    name="content"
                                                                    onKeyUp={this.ByteCounter}
                                                                    value={this.state.post.content}
                                                                    onChange={this.handleChange}
                                                                    placeholder="감사한일이 있어요!" />
                                                                <span id="byteInfo">0/100자</span>
                                                            </div>
                                                            <button className="tg-btn"><span>글 쓰 기</span></button>
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
                </div>
            </main>
        );

        if (!this.props.show) {
            return null;
        }

        return ReactDOM.createPortal(
            writePost,
            this.el,
        );
    }
}

export default PostForm;
