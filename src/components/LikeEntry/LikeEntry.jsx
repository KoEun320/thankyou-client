import React, {Fragment} from 'react';

class LikeEntry extends React.Component {

    render() {
        return (
            <Fragment>
                <li>
                    <i className="fa fa-book" />
                    <span>{this.props.postitem.totalCount}</span>
                </li>
                <li>
                    <i className="fa fa-heart" />
                    <span>{this.props.postitem.likeCount}</span>
                </li>
            </Fragment>
        );
    }
}

export default LikeEntry;
