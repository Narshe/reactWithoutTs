import React from 'react';


const LoginForm = (props) => {

    return (
        <form method="POST" onSubmit={props.onSubmit}>
            <div className="form-group">
                <input 
                    placeholder="username" 
                    onChange={props.onChange} 
                    type="text" 
                    name="username" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <input 
                    placeholder="password" 
                    onChange={props.onChange} 
                    type="password" 
                    name="password" 
                    className="form-control"
                />
            </div>
            
            <div className="form-group">
                <button className="btn btn-primary">Se connecter</button>
            </div>
        </form>
    )
}   


export default LoginForm;