import React, { Fragment } from 'react';
//import { history } from '../../_helpers';
import EditUsername from '../EditUsername/EditUsername';
import PostEntry from '../PostEntry/PostEntry';
import LikeEntry from '../LikeEntry/LikeEntry';
import _ from'lodash';

let scrollPosition = (window.innerHeight * 0.8);

class MyPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: false,
            show: false,
            page: 1
        };

        this.onDelete = this.onDelete.bind(this);
        this.handleScroll = _.debounce(this.handleScroll.bind(this), 300);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        this.props.postActions_getbyId(this.props.user.id, 1);
        console.log('this.props------------------------------');
        console.log(this.props);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show
        });
    }

    onDelete(e){
        e.preventDefault();

        const id = this.props.user.id;
        this.props.userActions_delete(id);
    }

    handleScroll() {

        var page = Number(this.state.page);
        if (window.scrollY >= scrollPosition) {
            if(this.props.post.totalPage < this.props.post.page) {
                this.setState({
                    hasMoreItems: false,
                    page: 1
                });
            } else if(this.state.hasMoreItems){
                page++;
                this.props.postActions_getAddbyId(this.props.user.id,this.state.page);
                this.setState({
                    page: page
                });
            }

            scrollPosition = window.innerHeight + (window.innerHeight * 0.9);
        }
    };
    render() {
        return (
            <Fragment>
                <EditUsername onClose={this.showModal} show={this.state.show} user={this.props.user} onUpdate={this.props.userActions_update} />
                <section className="tg-innerbanner tg-innerbannervtwo" ref={this.handleScroll}>
                <div className="tg-sectionspace tg-haslayout">
                    <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <ul className="tg-postmaradata">
                                <LikeEntry postitem={this.props.post}/>
                                {/* <li>
                                    <i className="fa fa-book" />
                                    <span>{this.props.post.totalCount}</span>
                                </li>
                                <li>
                                    <i className="fa fa-heart" />
                                    <span>{this.props.post.likeCount}</span>
                                </li> */}
                                <li><a onClick={this.showModal}><i className="fa fa-user" /><span>수정</span></a></li>
                                <li><a onClick={this.onDelete}><i className="fa fa-sign-out" /><span>탈퇴</span></a></li>
                            </ul>
                            <h1>Hi {this.props.user.username} !</h1>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
                {this.props.post.list && this.props.post.list.length !== 0 &&
                    this.props.post.list.map((data, index) => {
                        return (
                            <PostEntry
                                key={index}
                                postitem={data}
                                // onItemClick={this.ClickItem.bind(this)}
                                match={this.props.match}
                                {...this.props}
                            />
                        );
                    })
                }
        </Fragment>
        );
    }
}

export default MyPage;
