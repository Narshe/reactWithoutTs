import React from 'react';
import { Link } from "react-router-dom";
import PostItem from './postItem';
import { UserContext } from "../../store/UserProvider";
const axios = require('axios');


export default class PostList extends React.Component 
{
    
    static contextType  = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loaded: false
        }
    }

    componentDidMount() {

        axios.get('/posts')
        .then((posts) => {
            console.log(posts)
            this.setState({posts: posts.data, loaded:true})
        })
        .catch((err) => {
            console.log(err)
        })  
    }

    handleDelete = (id) => {

        axios.delete(
            `/posts/${id}`,
        ).then(() => {

            let newPosts = this.state.posts.filter((post) => post.id !== id);
            this.setState({posts: newPosts});
        })
    }

    render() {

        return (

            <div className="article-list"> 
                { 
                    this.state.posts.map((post, index) => {
                        return <PostItem onDelete={this.handleDelete} post={post} key={`post_${index}`} />
                    })
                }
                {
                   this.context.user && <Link className="btn btn-primary" to='/posts/new'>Ajouter article</Link>
                }

            </div>
        
        )
   }
}

 

