import React from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from "../../store/UserProvider";
import LoginForm from './forms/loginForm';

let axios = require('axios');


export default class Login extends React.Component 
{
    static contextType  = UserContext;

    constructor(props) {
        super(props);
        this.state = { 
                username: '',
                password: '',
                errors: null,
                redirect: false
            }
    }

    handleInputChange = (e) => {

        let {name, value} = e.target
        this.setState({[name]: value})
    }

    getErrors = () => {

        return this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>
        
    }

    handleSubmit = (e) => {

        e.preventDefault();
        axios.post(
            '/users/authenticate',
            { username: this.state.username, password: this.state.password}
        ).then((user) => {
            
           
           this.context.updateUser(user.data);
           localStorage.setItem("user", JSON.stringify(user.data));
           this.setState({redirect: true})
           
        }).catch((err) => {
            this.setState({errors: 'Nom d\'utilisateur ou mot de passe incorect'});
        })
    }

    render() {

        let redirect = this.state.redirect && <Redirect to={`/`} />

        let error = this.getErrors();

        return (
            
            
            <div className="login-form">
                {redirect}
                {error}
                <LoginForm onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>
            </div>
           
        )
    }
}