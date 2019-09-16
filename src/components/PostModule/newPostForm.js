import React from 'react';


const NewPostForm = (props) => {

    return (
        <form method="POST">
            <div className="form-group">
                <input 
                    placeholder="titre" 
                    onChange={(e) => props.onChange(e)} 
                    type="text" 
                    name="title" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <textarea 
                    placeholder="Votre message" 
                    onChange={(e) => props.onChange(e)} 
                    name="content" 
                    className="form-control"></textarea>
            </div>
            <div className="form-group">
                <button onClick={props.onCreate} className="btn btn-primary">Ajouter</button>
            </div>
        </form>
    )
}

export default NewPostForm;