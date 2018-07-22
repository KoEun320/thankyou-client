import React from 'react';
import PostEntry from '../PostEntry/PostEntry';
import _ from'lodash';

let scrollPosition = (window.innerHeight * 0.8);

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasMoreItems: true,
            page: 1
        };

        this.handleScroll = _.debounce(this.handleScroll.bind(this), 300);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        this.props.postActions_getRandom(this.props.user.id);
        this.props.postActions_getAll(1);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
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
                this.setState({
                    page: page
                });
                this.props.postActions_getAddAll(this.state.page);
            }

            scrollPosition = window.innerHeight + (window.innerHeight * 0.9);
        }
    };

    render() {
        return (
            <main id="tg-main" className="tg-main tg-sectionspace tg-haslayout" ref={this.handleScroll}>
            <div className="container-fluid">
                <div className="row">
                    <div className="tg-posts tg-blogposts">
                    {   this.props.post.list &&
                        this.props.post.list.map((data, index) => {
                            return (
                                data.isPublic &&
                                <PostEntry
                                    key={data._id}
                                    postitem={data}
                                    // onItemClick={this.ClickItem.bind(this)}
                                    {...this.props}
                                />
                            );
                        })
                    }
                    </div>
                </div>
            </div>
            </main>
        );
    }
}

export default Main;
