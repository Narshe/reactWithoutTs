import React from 'react';
import { Link } from "react-router-dom";
import Bootbox from 'bootbox';
import { UserContext } from "../../store/UserProvider";

export default class CommentItem extends React.Component 
{   
    
    static contextType = UserContext;

    handleClick = (e) => {
        e.preventDefault();

        Bootbox.confirm({
            size: "medium",
            message: "Etes vous sur de vouloir supprimer ce commentaire  ?",
            callback: (confirm) => {
                confirm && this.props.onDelete(this.props.comment);;
            }
        }) 
    }
    
    render() {

        let {comment} = this.props;
        
        return (
               
            <article className="comment card">
                <div className="card-header comment-header">
                    <div className="comment-info">
                        De <Link to={`/profile/${comment.user.id}`}><strong>{comment.user.name}</strong></Link> - <em>{comment.created_at}</em>
                    </div>
                    { this.context.user && (comment.user.id === this.context.user.id) &&
                        <div className="comment-options">
                            <button className="btn btn-danger" onClick={this.handleClick}>Supprimer</button>
                        </div>
                    }
               
                </div>
                <div className="card-body">
                    {comment.content}
                </div>
            </article>
        )
    }
}
