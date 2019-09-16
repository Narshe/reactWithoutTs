import React from 'react';

const NewCommentForm = (props) => {

    return (
        <form method="POST">
            <div className="form-group">
                <textarea 
                    placeholder="Votre message" 
                    onChange={(e) => props.onChange(e.target.value)} 
                    name="content"
                    value={props.content}
                    className="form-control"></textarea>
            </div>
            <div className="form-group">
                <button onClick={props.onCreate} className="btn btn-primary">Commenter</button>
            </div>
        </form>
    )
}

export default NewCommentForm;