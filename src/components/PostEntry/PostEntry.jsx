import React from 'react';
import './PostEntry.css';
import EditPost from '../EditPost/EditPost';
import { history } from '../../_helpers/history';

class PostEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLike: false,
            like: this.props.postitem.like
        };
}

    handleLike(){
        this.setState({isLike: true, like: this.props.postitem.like--});
        this.props.postActions_dislike(this.props.postitem._id, this.props.user.id);
        this.likeStatus();
    }
    handleDislike(){
        this.setState({isLike: false, like: this.props.postitem.like++});
        this.props.postActions_like(this.props.postitem._id, this.props.user.id);
        this.likeStatus();
    }

    showModal = () => {
        this.setState({
            ...this.state,
            show: !this.state.show,
        });
    }

    onDelete(e){
        e.preventDefault();

        const id = this.props.postitem._id;
        this.props.postActions_delete(id);
        if (this.props.location.pathname === '/main') {
            this.props.postActions_getAll(1);
        } else {
            this.props.postActions_getbyId(this.props.user.id, 1);
        }
    }

    likeStatus() {
        let check
        if(this.props.postitem.likeId === undefined) {
            check = false;
        } else {
            check = this.props.postitem.likeId.includes(this.props.user.id)
        }

        if(check) {
            this.setState({like: true});
        }
    }

    render() {
        return (
            <article className="tg-post tg-verticaltop">
                <div className="tg-tourdestination tg-tourdestinationbigbox">
                    <EditPost onClose={this.showModal} show={this.state.show} {...this.props} />
                    <figure>
                        <img className="imgfixed" src={this.props.postitem.imgUrl} alt="entry background" />
                        <div className="tg-hoverbox">
                            <div className="tg-adventuretitle">
                                <h2>{this.props.postitem.content}</h2>
                            </div>
                            <div className="tg-description">
                                {this.state.isLike &&
                                    (<p><span className="like" onClick={this.handlelike.bind(this)}></span>{this.props.postitem.like}</p>)
                                }
                                {!this.state.isLike &&
                                    (<p><span className="no-like" onClick={this.handleDislike.bind(this)}></span>{this.props.postitem.like}</p>)
                                }
                            </div>
                        </div>
                    </figure>
                </div>
                <div className="tg-postcontent">
                    <div className="tg-postcontenthead">
                        {
                            this.props.postitem.writerId === this.props.user.id &&
                            (<div className="relativeBox">
                                {!this.props.postitem.isPublic && <span className="nonPublic">비공개</span>}
                                <div className="text-right editbtn">
                                    <a onClick={this.showModal.bind(this)}><i className="fa fa-edit" />edit</a>
                                    <a onClick={this.onDelete.bind(this)}><i className="fa fa-times" />del</a>
                                </div>
                            </div>
                            )
                        }
                        <div className="tg-author">
                            <span>{this.props.postitem.writer}</span>
                        </div>
                        <time className="tg-date" dateTime={this.props.postitem.created}>{this.props.postitem.created}</time>
                    </div>
                </div>
            </article>
        );
    }
}

export default PostEntry;
