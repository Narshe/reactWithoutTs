import React from 'react';
//import { Redirect } from 'react-router-dom';
import CommentItem from './commentItem';
import NewComment from './newComment';
import { UserContext } from "../../store/UserProvider";

let axios = require('axios');


export default class CommentList extends React.Component 
{   
    
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { 
                comments: [],
                loaded: false,
                newComment: '',
                errors: null
            }
    }
    

   componentDidMount() {

        let {post, limit} = this.props;

        axios.get(`/comments/${post.id}/${limit}`,)
        .then((comments) => {
            
            this.setState({comments: comments.data, loaded: true})
        })
        .catch((err) => {
            console.log(err)
        })  
    }

    handleInputChange = (content) => {

        this.setState({newComment: content});
    }

    handleCreate = (e) => {


        e.preventDefault();
        let {comments, newComment} = this.state;

        axios.post(
            '/comments',
            { content: newComment, post_id: this.props.post.id}
        ).then((newComment) => {

            let newComments = [...comments, newComment.data]

            this.setState({comments: newComments, newComment: ''})

        }).catch((err) => {
           
            this.setState({errors: "Titre ou contenu vide"})
        })
    }
    
    handleDelete = (comment) => {

        axios.delete(
            `/comments/${comment.id}`,
        ).then((deletedComment) => {

            let {comments} = this.state;

            comments = comments.filter((c) => comment.id !== c.id)

            this.setState({comments: comments})

        }).catch((err) => {
           
            this.setState({errors: "Titre ou contenu vide"})
        })

    }


    render() {

        let {comments, loaded} = this.state;
        
        return (
               
            <div className="comment-list card">
                <div className="card-body">       
                
                    { (loaded) &&
                        <div>
                            <h5 className="card-title">{ comments.length > 0 ? 'Commentaires' : 'Pas de commentaires pour le moment'}</h5>
                            {
                            comments.map((comment, index) => {
                                return <CommentItem key={`comment_${index}`} onDelete={this.handleDelete} comment={comment} />
                            })
                            }
                            {   
                                (this.context.user) &&
                                <NewComment 
                                    content={this.state.newComment} 
                                    onChange={this.handleInputChange} 
                                    onCreate={this.handleCreate}
                                />
                            
                            }
                        </div>
     
                    }
                </div>
            </div>
              
        )
    }
}