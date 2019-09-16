import React from 'react';
import { Redirect } from "react-router-dom";
import PostItem from './postItem';
import CommentList from '../CommentModule/commentList';
//import NewComment from '../CommentModule/newComment';

const axios = require('axios');

export default class Post extends React.Component 
{

    constructor(props) {
        super(props);
        this.state = {
            post: {},
            redirect: false,
            loaded: false
        }
    }

    
    componentDidMount() {

        if (this.props.post) {

            this.setState({post: this.props.post, loaded: true})

        } else {
            let id = this.props.match.params.id;

            axios.get(`/posts/${id}`)
            .then((post) => {
                
                this.setState({post: post.data, loaded: true})
            })
            .catch((err) => {
                console.log(err)
            })  
        }
      
    }
    

    handleDelete = (id) => {

        axios.delete(
            `/posts/${id}`
        ).then(() => {

            this.setState({redirect: true});
        })
    }

    render() {

        let redirect = this.state.redirect  && <Redirect to={`/posts`} />;
        let limit = this.props.limit ? this.props.limit : 'all';
        let {post, loaded} = this.state;
        
        return (

            <div>
                { loaded &&
                    <div className="article">
                        {redirect}
                        <PostItem onDelete={this.handleDelete} post={post} />
                        <CommentList limit={limit} post={post}/>
                    </div>
                }
            </div>

        )
   }
}

 

