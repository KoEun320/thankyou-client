import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import './RandomBox.css';

class RandomBox extends React.Component {

    render() {
        const { random } = this.props;
        console.log("random")
        console.log(random)
        const randomBox = (
            <div className="tg-addnavcartsearch">
                <nav className="tg-cartsearch">
                    <ul>
                    <li>
                    <Link to=''> For {this.props.user.username}</Link>
                        <div className="tg-cartitems">
                        <div className="tg-cartlistitems">
                            <h3>Someone's thankyou</h3>
                            <div className="tg-cartitem">
                            <figure className="tg-itemimg"><img src={this.props.random.imgUrl} alt="random box background" /></figure>
                            <div className="tg-contentbox tg-hoverbox">
                                <div className="tg-adventuretitle">
                                <h2>{this.props.random.content}</h2>
                                </div>
                                <span>{this.props.random.like}</span>
                            </div>
                            </div>
                        </div>
                        {/* <div className="tg-btnarea">
                            <a className="tg-btn" href="#"><span>좋 아 요</span></a>
                        </div> */}
                        </div>
                    </li>
                    </ul>
                </nav>
            </div>);
        return (
            <Fragment>
                {randomBox}
            </Fragment>
        );
    }
}

export default RandomBox;
