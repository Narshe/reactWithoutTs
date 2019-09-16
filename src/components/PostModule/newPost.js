import React from 'react';
import { Redirect } from 'react-router-dom';
import NewPostForm from './newPostForm';

let axios = require('axios');


export default class NewPost extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = { 
            id: null, 
            title: '',
            content: '',
            errors: null
        }
    }

    handleInputChange = (e) => {

        let {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleClick = (e) => {
        
        e.preventDefault();
        
        axios.post(
            '/posts',
            { title: this.state.title, content: this.state.content}
        ).then((newPost) => {

            this.setState({id: newPost.data.id})
        }).catch((err) => {
           
            this.setState({errors: "Titre ou contenu vide"})
        })
    }

    getErrors = () => {

        return this.state.errors && <div className="alert alert-danger">{this.state.errors}</div>
        
    }

    render() {

        let redirect = this.state.id && <Redirect to={`/posts/${this.state.id}`} />

        let error = this.getErrors();

        return (
            
            <div className="create-form">
                {redirect}
                {error}
                <NewPostForm onCreate={this.handleClick} onChange={this.handleInputChange}/>
            </div>
           
        )
    }
}