import React from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm from './forms/registerForm';
let axios = require('axios');


export default class Register extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = { 
                username: '',
                password: '',
                email: '',
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
            '/users/new',
            { username: this.state.username, password: this.state.password, email:this.state.email}
        ).then((user) => {

            // local storage blabla
           this.setState({redirect: true})
           
        }).catch((err) => {

            this.setState({errors: 'Une erreur est servenue lors de l\'inscription'});
        })
    }

    render() {

        const redirect = this.state.redirect && <Redirect to={`/login`} />

        let error = this.getErrors();

        return (

            <div className="register-form">
                {redirect}
                {error}
                <RegisterForm onChange={this.handleInputChange} onSubmit={this.handleSubmit}/>
            </div>
           
        )
    }
}