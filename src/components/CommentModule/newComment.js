import React from 'react';
import NewCommentForm from './newCommentForm';

export default class NewComment extends React.Component 
{  
    render() {
        return (
            <div className="comment-form">
                <NewCommentForm 
                    onCreate={this.props.onCreate}
                    onChange={this.props.onChange}
                    content={this.props.content}
                />
            </div>
           
        )
    }
}